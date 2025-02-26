import ProductFilter from "@/components/shopping/Filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping/Product-title";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping/ProductDetails";

function createSearchParamsHelper(filterParams){
    const queryparams = [];


    for(const [key, value] of Object.entries(filterParams)){
        if(Array.isArray(value) && value.length > 0){
            const paramValue = value.join(',')

            queryparams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
    
    return queryparams.join('&')
}

function ShoppingListing() {
    const dispatch = useDispatch();
    const {productList, productDetails} = useSelector(state => state.shoppingProducts)
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    //fetch List of products
    useEffect(() => {
        if(filters !== null && sort !== null) {
            dispatch(fetchAllFilteredProducts({filterParams : filters, sortParams : sort}))
        }
    }, [dispatch, sort, filters])

    const handleSort = (value) => {
       setSort(value) 
    }

// This function, handleFilter, takes two arguments: getSectionId and getCurrentOption.
// It then creates a copy of the filters object.
// The function checks if getSectionId exists in the copyFilters object.
// If getSectionId does not exist in copyFilters, it adds a new key-value pair to copyFilters
// where the key is getSectionId and the value is an array containing getCurrentOption.
    const handleFilter = (getSectionId, getCurrentOption) => {
        console.log(getSectionId, getCurrentOption);
        
        let copyFilters = {...filters};
        const indexOfCurrentSetion = Object.keys(copyFilters).indexOf(getSectionId);

        if(indexOfCurrentSetion === -1){
            copyFilters = {
                ...copyFilters,
                [getSectionId] : [getCurrentOption] 
            }
        } else {
            const indexOfCurrentSetion = copyFilters[getSectionId].indexOf(getCurrentOption);
            if(indexOfCurrentSetion === - 1 )
                 // Add the option if it's not already in the array
                copyFilters[getSectionId].push(getCurrentOption)

            else { 
                // Remove the option if it's already in the array
                copyFilters[getSectionId] = copyFilters[getSectionId].filter(option => option !== getCurrentOption);
            }
        }
        setFilters(copyFilters)
        sessionStorage.setItem('filters', JSON.stringify(copyFilters))
    }

    useEffect(() => {
        setSort('price-lowtohigh');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    }, []);

    useEffect(() => {
        if(filters && Object.keys(filters).length > 0){
            const createQueryString = createSearchParamsHelper(filters)
            setSearchParams(new URLSearchParams(createQueryString))
        }
    }, [filters])


    useEffect(() =>{
        if(productDetails !== null){
            setOpenDetailsDialog(true)
        }
    },[productDetails])

    console.log(filters, searchParams, productDetails,"productList");

    const handleGetProductDetails = (getCurrentProductId) => {
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 px-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-3.5 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{productList?.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="w-6 h-6"/>
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {
                                        sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {
                        productList && productList.length > 0 ? 
                        productList.map((productItem, index) => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails}  key={index} product={productItem} />) : null
                    }
                </div>
            </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
        </div>
     );
}

export default ShoppingListing;