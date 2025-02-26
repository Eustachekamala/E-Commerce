import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import PropTypes from "prop-types";

function ProductFilter({ filters, handleFilter }) {
    return ( 
        <div className="bg-background rounded-lg shadow-sm w-[300px]"> 
            <div className="p-4 border-b">
                <h1 className="text-lg font-extrabold">Filters</h1>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map((keyItem, index) => (
                        <div key={index}>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="grid gap-2 mt-2 mb-4">
                                {
                                    filterOptions[keyItem].map(option => (
                                        <Label key={option.id} className="flex items-center gap-2 font-medium">
                                            <Checkbox checked={
                                                filters && Object.keys(filters).length > 0 &&
                                                filters[keyItem] && filters[keyItem].indexOf(option.id) > - 1
                                                } onCheckedChange={() => handleFilter(keyItem, option.id)}/>
                                            {option.label}
                                        </Label>
                                    ))
                                }
                            </div>
                            <Separator/>
                        </div>
                    ))
                }
            </div>
        </div>
     );
}

ProductFilter.propTypes = {
    filters : PropTypes.object,
    handleFilter : PropTypes.func
}

export default ProductFilter;