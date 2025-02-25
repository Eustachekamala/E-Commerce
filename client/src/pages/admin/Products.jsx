import ProductImageUpload from "@/components/admin/Image-upload"
import CommonForm from "@/components/common/Form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice/index.mjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";
import AdminProductTile from "./Product-tile"

const initialFormData = {
  image: null,
  title : "",
  description : "",
  category : "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock : ""
}

/**
 * AdminProducts component is used to manage the products in the admin panel.
 * It allows the admin to add new products, edit existing products, and view the list of products.
 *
 * @component
 * @example
 * return (
 *   <AdminProducts />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * - Uses `useState` to manage the state of the create product dialog, form data, image file, current edited product ID, uploaded image URL, and image loading state.
 * - Uses `useSelector` to access the product list from the Redux store.
 * - Uses `useDispatch` to dispatch actions to the Redux store.
 * - Fetches all products on component mount using `useEffect`.
 * - Handles form submission for adding and editing products.
 * - Displays a button to open the create product dialog.
 * - Displays a grid of product tiles.
 * - Uses the `Sheet` component to display the create/edit product form in a side panel.
 * - Uses the `ProductImageUpload` component for uploading product images.
 * - Uses the `CommonForm` component for the product form.
 */
const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] =  useState(initialFormData) ;
  const [imageFile, setImageFile] = useState(null);
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList} = useSelector(state => state.adminProducts)

  const dispatch = useDispatch();

  const onSubmit = (e) =>{
    e.preventDefault();
    currentEditedId !== null ? dispatch(editProduct({
      id : currentEditedId ,formData
    })).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        toast.success(data.payload.message,
          {
          style: {
            background: 'white',
            color: 'black',
          }
        })
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null)
      }
  
    }) :
    dispatch(addNewProduct({
      ...formData, 
      image: uploadedImageUrl
    })).then((data) => {
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false)
        setImageFile(null)
        setFormData(initialFormData)
        toast.success(data.payload.message,
          {
          style: {
            background: 'white',
            color: 'black',
          }
        })
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  },[dispatch])

  function handleDeleteProduct(getCurrentProductId){
    console.log(getCurrentProductId);
    
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        toast.success(data.payload.message,
          {
          style: {
            background: 'white',
            color: 'black',
          }
        })
      }
    })
  }
  

  /**
   * Checks if all fields in the formData object are non-empty.
   *
   * @returns {boolean} - Returns true if all fields are non-empty, otherwise false.
   */
  function isFormValidData(){
    return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
  }

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Products</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map(productItem => 
            <AdminProductTile 
                        setCurrentEditedId={setCurrentEditedId}
                        setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                        setFormData={setFormData} 
                        handleDeleteProduct={handleDeleteProduct}
                        key={productItem._id} 
                        product={productItem}/>) : null
        }
      </div>
          <Sheet 
                open={openCreateProductsDialog} 
                onOpenChange={() => {
                    setOpenCreateProductsDialog(false)
                    setCurrentEditedId(null)
                    setFormData(initialFormData)
                    }}>
            <SheetContent side="right" className="overflow-auto">
              <SheetHeader>
                <SheetTitle>
                    {
                      currentEditedId !== null ? "Edit Product" : "Add New Products"
                    }
                </SheetTitle>
              </SheetHeader>
              <ProductImageUpload 
                  imageFile={imageFile} 
                  setImageFile={setImageFile} 
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  isEditMode = {currentEditedId !== null}
              />
              <div className="py-6">
                <CommonForm 
                      onSubmit={onSubmit} 
                      formData={formData} 
                      buttonText= {
                        currentEditedId !== null ? "Edit" : "Add" 
                      }
                      setFormData={setFormData} 
                      formControls={addProductFormElements}
                      isButtonDisabled={!isFormValidData()}
                />
              </div>
            </SheetContent>
          </Sheet>
    </>
  )
}

export default AdminProducts