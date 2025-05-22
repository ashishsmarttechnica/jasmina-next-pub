import React, { useRef } from "react";
import Image from "next/image";
import Uploadimg from "@/assets/form/Uploadimg.png";
import { useTranslations } from "next-intl";

const ImageUploader = ({
  selectedImage,
  setSelectedImage,
  setSelectedImageFile,
  isnotCEntered = false,
  isBanner = false,
}) => {
  const t = useTranslations("UserProfile.profile");
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageFile?.(file);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <p
        className={` ${
          !isnotCEntered ? "text-center" : ""
        }  text-grayBlueText my-2`}
      >
        {t("uploadImage")}
      </p>
      <div
        className={`flex ${
          !isnotCEntered ? "items-center justify-center" : ""
        }  my-2`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          className={`relative ${isBanner ? "w-[432px]" : "w-[128px]"} ${
            isBanner ? "h-[200px]" : "h-[128px]"
          }`}
        >
          <Image
            src={selectedImage || Uploadimg}
            alt="Upload Preview"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer mb-1 object-cover border border-secondary "
            onClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
