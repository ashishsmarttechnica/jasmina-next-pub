import Uploadimg from "@/assets/form/Uploadimg.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-toastify";
const ImageUploader = ({
  selectedImage,
  setSelectedImage,
  setSelectedImageFile,
  isnotCEntered = false,
  isBanner = false,
  priority = false,
  error,
}) => {
  const t = useTranslations("UserProfile.profile");
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      //  check file size (1 MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        toast.error("You can upload only images up to 1MB in size.");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageFile?.(file);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex w-full flex-col ${isnotCEntered ? "" : "items-center justify-center"}`}>
      <div className="group relative">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          className={`border-primary relative flex border-1 ${isBanner ? "h-42 w-1/2 rounded-xl" : "h-32 w-32 rounded-full"} cursor-pointer items-center justify-center overflow-hidden bg-white shadow-lg`}
          onClick={handleImageClick}
        >
          <Image
            src={selectedImage || Uploadimg}
            alt="Upload Preview"
            fill
            sizes={isBanner ? "50vw" : "128px"}
            className="h-full w-full object-cover"
            priority={priority}
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;
