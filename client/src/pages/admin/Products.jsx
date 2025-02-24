import ProductImageUpload from "@/components/admin/Image-upload"
import CommonForm from "@/components/common/Form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice/index.mjs"
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
            background: 'green',
            color: 'white'
          }
        })
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  },[dispatch])

  // console.log(formData, "productList");
  

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Products</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map(productItem => <AdminProductTile 
                        setCurrentEditedId={setCurrentEditedId}
                        setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                        setFormData={setFormData} 
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
                />
              </div>
            </SheetContent>
          </Sheet>
    </>
  )
}

export default AdminProducts