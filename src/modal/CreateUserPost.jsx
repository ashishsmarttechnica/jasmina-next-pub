import React, { useRef, useState, useEffect } from "react";
import { Modal } from "rsuite";
import Image from "next/image";
import Uploadsmall from "@/assets/form/Uploadsmall.png";
import user1 from "@/assets/feed/user-1.png";
import useAuthStore from "@/store/auth.store";
import getImg from "@/lib/getImg";
import profileImg from "@/assets/feed/Profile.png";
import { useTranslations } from "next-intl";
import ImageFallback from "@/common/shared/ImageFallback";

const CreateUserPost = ({
  isOpen,
  formData,
  setFormData,
  isPending,
  onClose,
  postText,
  setPostText,
  handleSubmit,
  fileInputRef,
}) => {
  const handleImageClick = () => fileInputRef.current.click();
  const t=useTranslations('UserPostModel')
  const { user } = useAuthStore();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      postImg: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          previewImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisibilityChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      visibility: value,
    }));
  };

  return (
    <Modal open={isOpen} onClose={onClose} size="547px">
      <Modal.Body className="sm:p-2 p-2 bg-white rounded-lg">
        <div className="flex items-center mb-4">
          <ImageFallback
            src={getImg(user?.profile?.photo) || profileImg}
            alt="User"
            width={30}
            height={30}
            className="rounded-full mt-1"
          />
          <div className="ml-3 text-xl font-bold text-gray-800">
            {user?.profile?.fullName}
            <br />
           <p className="text-[13px] font-normal  mx-1 my-1">{user?.preferences?.jobRole}</p>  
          </div><br />
        </div>
        <p className="border border-b border-gray w-full"></p>

        <textarea
          placeholder={t("sharePlaceholder")}
          className="w-full h-20 p-3 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 placeholder:text-[13px]"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        <div
          className="w-full bg-gray h-[328px] flex flex-col items-center justify-center mt-4 rounded-md cursor-pointer"
          onClick={handleImageClick}
        >
          {formData.previewImage ? (
            <img
              src={formData.previewImage}
              alt="Preview"
              className="object-contain h-full w-full rounded-md"
            />
          ) : (
            <>
              <Image src={Uploadsmall} alt="Upload" width={40} height={40} />
              <button className="mt-4 px-4 py-2 bg-primary text-[13px] text-white rounded-md hover:bg-secondary hover:text-primary transition disabled:opacity-60">
                {t("uploadmedia")}
              </button>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-8 text-sm text-grayBlueText">
          {t("whopost")}
        </div>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value={1}
              checked={formData.visibility === 1}
              onChange={() => handleVisibilityChange(1)}
              className="mr-2"
            />
            <span className="text-[14px] font-medium">{t("Anyone")}</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value={0}
              checked={formData.visibility === 0}
              onChange={() => handleVisibilityChange(0)}
              className="mr-2"
            />
            <span className="text-[14px] font-medium">{t("connectionsonly")}</span>
          </label>
        </div>

        <p className="border border-b my-4 border-gray w-full"></p>

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-8 py-2 bg-primary text-[15px] text-white rounded-md hover:bg-secondary hover:text-primary transition disabled:opacity-60"
          >
            {isPending ? t("posting") : t("post")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserPost;
