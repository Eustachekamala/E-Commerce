import ShoppingProductTile from "@/components/shopping/Product-title";
import { Input } from "@/components/ui/input";
import { getSearchResult, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Search() {
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { searchResults } = useSelector(state => state.shoppingSearch);

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            const delayDebounceFn = setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResult(keyword));
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        } else {
            dispatch(resetSearchResults())
        }
    }, [keyword, dispatch, setSearchParams]);


    

    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
            {/* Search Input Section */}
            <div className="flex justify-center mb-8">
                <div className="w-full max-w-2xl flex items-center shadow-lg rounded-lg overflow-hidden">
                    <Input
                        value={keyword}
                        className="py-4 px-6 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search Products..."
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                </div>
            </div>

            {/* Search Results Section */}
            <div className="grid grid-cols-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {searchResults && searchResults.length > 0 ? (
                    searchResults.map((item) => (
                        <ShoppingProductTile key={item._id} product={item} />
                    ))
                ) : (
                    <div className="col-span-full flex justify-center items-center h-64">
                        <h1 className="text-3xl font-bold text-gray-500">No results found</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;