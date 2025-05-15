import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { Modal } from "rsuite";

const PostJobModal = ({ isOpen, onClose }) => {
  const t= useTranslations("HomePage");
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        size="545px"
        className="rounded-full sm:px-0 px-5"
      >
        <Modal.Body className="rs-modal_bg">
          <p className="text-lg font-bold text-center mb-10 mt-2 ">
            {t("hero.model.title")}
          </p>
          <div className="">
            <p className="text-center text-base text-grayBlueText max-w-[280px] leading-[18px] mx-auto m-0">
              {t("hero.model.description")}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mx-auto ">
            <Link href="/signup">
              <button
                type="button"
                className=" mt-3 sm:mt-6 p-1 hover:bg-primary hover:text-white sm:py-[7px] sm:px-4 text-primary bg-white border border-primary transition-all duration-200 ease-in hover:border hover:border-white  rounded-md text-sm sm:text-base"
              >
                {t("hero.model.SetupCompany")}
              </button>
            </Link>
            <Link href="/companyprofile">
              <button
                type="button"
                className=" mt-3 sm:mt-6 p-1 hover:bg-white hover:text-primary sm:py-[7px] sm:px-4 bg-primary transition-all duration-200 ease-in hover:border border border-primary hover:border-primary text-white rounded-md text-sm sm:text-base"
              >
                {t("hero.model.Loginascompany")}
              </button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostJobModal;
