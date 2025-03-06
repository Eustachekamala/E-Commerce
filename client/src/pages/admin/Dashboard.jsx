import ProductImageUpload from "@/components/admin/Image-upload";
import { Button } from "@/components/ui/button";
import { addImageFeature, getImageFeatures } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function AdminDashboard(){
    const [imageFile, setImageFile] = useState(null);
      const [uploadedImageUrl, setUploadedImageUrl] = useState("");
      const [imageLoadingState, setImageLoadingState] = useState(false);
      const { featureImageList } = useSelector(state => state.commonFeature);
      const dispatch = useDispatch()

    function handleUploadFeatureImage() {
        dispatch(addImageFeature(uploadedImageUrl))
            .then(data => {
                if (data?.payload?.success) {
                    dispatch(getImageFeatures());
                    toast("Image uploaded successfully", {
                        style: {
                            backgroundColor: "white",
                            color: "green",
                        },
                    });
                } else {
                    toast("Failed to upload image", {
                        style: {
                            backgroundColor: "white",
                            color: "red",
                        },
                    });
                }
            })
            .catch(error => {
                toast("An error occurred while uploading the image", {
                    style: {
                        backgroundColor: "white",
                        color: "red",
                    },
                });
                console.error("Upload error:", error);
            });
    }

    useEffect(() => {
        dispatch(getImageFeatures());
        setImageFile(null),
        setUploadedImageUrl('')

    },[dispatch])
    
    
    return (
        <div>
            <h1> Upload Feature Images </h1>
            <ProductImageUpload 
            imageFile={imageFile} 
            setImageFile={setImageFile} 
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
            // isEditMode = {currentEditedId !== null}
        />
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
            <div className="flex flex-col gap-4 mt-5">
                    {featureImageList?.length > 0 ? (
                        featureImageList.map(featureImgItem => (
                            <div className="relative" key={featureImgItem?._id}>
                                <img
                                    className="w-full h-[400px] object-cover rounded-lg"
                                    src={featureImgItem?.image}
                                    alt={featureImgItem?.name}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No feature images available.</p>
                    )}
            </div>
        </div>
    )
}

export default AdminDashboard