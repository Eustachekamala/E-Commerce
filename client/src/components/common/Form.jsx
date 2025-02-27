import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import PropTypes from "prop-types";

/**
 * CommonForm component renders a dynamic form based on the provided form controls.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.formControls - An array of form control objects, each containing the properties:
 *   - {string} name - The name of the form control.
 *   - {string} label - The label for the form control.
 *   - {string} componentType - The type of the form control (e.g., "input", "select", "textarea").
 *   - {string} [placeholder] - The placeholder text for the form control.
 *   - {string} [type] - The type attribute for input elements.
 *   - {Array} [options] - An array of options for select elements, each containing:
 *     - {string} id - The unique identifier for the option.
 *     - {string} label - The display label for the option.
 * @param {Object} props.formData - The current form data state.
 * @param {Function} props.setFormData - The function to update the form data state.
 * @param {Function} props.onSubmit - The function to handle form submission.
 * @param {string} [props.buttonText] - The text to display on the submit button.
 *
 * @returns {JSX.Element} The rendered CommonForm component.
 */
function CommonForm({formControls, formData, setFormData, onSubmit, buttonText, isButtonDisabled}) {

    function renderInputByComponentType(getControlItem){
        let element = null;
        const value = formData[getControlItem.name] || ""


        switch (getControlItem.componentType) {
            case "input":
                    element = ( <Input 
                        name= {getControlItem.name}
                        placeholder = {getControlItem.placeholder}
                        id= {getControlItem.name}
                        type= {getControlItem.type}
                        value={value}
                        onChange = {(e) =>  setFormData({
                            ...formData, [getControlItem.name] : e.target.value
                        })}
                    />);
                break;

                case "select":
                element = (
                    <Select onValueChange={(value) => setFormData({
                        ...formData, [getControlItem.name]: value
                    })} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options && 
                                getControlItem.options.length > 0 ?
                                getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;

            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData, [getControlItem.name]: e.target.value
                        })}
                    />
                );
            break;
        
            default:
                 ( <Input 
                        name= {getControlItem.name}
                        placeholder = {getControlItem.placeholder}
                        id= {getControlItem.name}
                        type= {getControlItem.type}
                        value={value}
                        onChange = {(e) =>  setFormData({
                            ...formData, [getControlItem.name] : e.target.value
                        })}
                    />);
                break;
        }
        return element;
    }

    return ( 
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItem => <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {
                            renderInputByComponentType(controlItem)
                        }
                    </div>)
                }
            </div>
            <Button disabled={isButtonDisabled} type="submit" className="mt-4 w-full">
                {buttonText || "Submit"}
            </Button>
        </form>
     );
}

CommonForm.propTypes = {
    formControls: PropTypes.arrayOf(PropTypes.object).isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    isButtonDisabled : PropTypes.func
};

export default CommonForm;