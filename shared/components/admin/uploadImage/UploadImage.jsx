import UploadSvg from "../svg/UploadSvg";
import style_form from "../Form/form.module.css";
import CustomButton from "../Button";
import ImageUploading from "react-images-uploading";
import {useEffect, useState} from "react";

export default function UploadImage({setImageList,IMG=undefined,uerPage=false}){
    const [images, setImages] = useState([]);
    const maxNumber = 1;
    useEffect(()=>{
        if(IMG){
            setImages([IMG])
           }
    },[])
    console.log(images);
   
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setImageList(imageList)
    };
    return(
        <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        {images.length ===0 &&
                        <>
                            <UploadSvg color={uerPage?"#6FCF97":"#EC5CF8"}/>
                            <span>upload</span>
                        </>}
                    </button>
                    {imageList.map((image, index) => (
                        <div key={index} className={`${style_form.image_item} image-item`}>
                            <img src={IMG?IMG:image?IMG:image['data_url']} alt="" width="100" />
                            <div className={`${style_form.image_item__btn_wrapper} image-item__btn-wrapper flex flex-row`}>
                                <CustomButton icon={false} onAction={() => onImageRemove(index)} title='Remove' color={'2'} type={'button'} size={'xs'} />
                                <CustomButton icon={false} onAction={() => onImageUpdate(index)} title='Update' color={'1'} type={'button'} size={'xs'} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    )
}