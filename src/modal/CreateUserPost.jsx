import React, { useRef, useState, useEffect } from "react";
import { Modal } from "rsuite";
import Image from "next/image";
import Uploadsmall from "../assets/form/Uploadsmall.png";
import user1 from "@/assets/feed/user-1.png";

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
      <Modal.Body className="p-6 bg-white rounded-lg">
        <div className="flex items-center mb-4">
          <Image
            src={user1}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3 text-xl font-bold text-gray-800">
            Gurdeep Osahan
          </div>
        </div>
        <p className="border border-b border-gray w-full"></p>

        <textarea
          placeholder="Share your thoughts…"
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
                Upload from media
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
          Who can see your post?
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
            <span className="text-[14px] font-medium">Anyone</span>
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
            <span className="text-[14px] font-medium">Connections Only</span>
          </label>
        </div>

        <p className="border border-b my-4 border-gray w-full"></p>

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-8 py-2 bg-primary text-[15px] text-white rounded-md hover:bg-secondary hover:text-primary transition disabled:opacity-60"
          >
            {isPending ? "Posting..." : "Post a job"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserPost;
