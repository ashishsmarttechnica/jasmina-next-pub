"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import leftImg from "@/assets/homePage/LeftBannerImage.png";
import rightImg from "@/assets/homePage/rightBannerImage.png";
import Image from "next/image";
import { Button } from "rsuite";
import Search from "@/assets/svg/homePage/Search";
import Location from "@/assets/svg/homePage/Location";
import PostJobModal from "@/modal/PostJobModal";
import { useTranslations } from "next-intl";

const Hero = () => {
  const [CompanyPostModalOpen, setCompanyPostModalOpen] = useState(false);
  const handleCompanyPostJob = () => {
    setCompanyPostModalOpen(true);
  };
  const t = useTranslations("HomePage");
  return (
    <section>
      <div className="max-w-[1209px] xl:mx-auto mx-0 px-5">
        <div className="flex flex-col lg:flex-row items-center justify-between xl:mt-[50px] mt-2.5 mb-10 xl:gap-16 gap-2">
          <div className="">
            <Image
              src={leftImg}
              alt="Banner 1"
              className="rounded-xl shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] w-[212px] h-[265px] object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center xl:space-y-4 space-y-3 w-full lg:w-1/2">
            <div className="text-center">
              <h1 className="max-w-sm mx-auto text-primary text-[22px] lg:text-xl 2xl:text-[28px] md:text-[28px] mb-4 lg:mt-10 mt-4 font-bold">
                {t("hero.title")}
              </h1>
              <p className="max-w-md mx-auto text-grayBlueText text-lg md:text-xl lg:text-lg 2xl:text-xl">
               {t("hero.description")}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={handleCompanyPostJob}
                className="p-2 sm:px-[14px] sm:py-3 mb-3 !bg-secondary !text-primary rounded-md text-xl font-medium  text-decoration-none"
              >
              {t("hero.postaJob")}
              </Button>
            </div>

            <div className="flex items-center justify-center xl:max-w-[616px] w-full mt-2">
              <div className="bg-white  xl:m-0 shadow-md py-2 px-3 2xl:py-3 flex flex-col sm:flex-row items-center gap-2 mb-5 xl:mb-0 rounded-md ">
                <div className="flex items-center gap-3 mx-2">
                  <Search />
                  <input
                    type="text"
                    placeholder={t("hero.jobtitle")}
                    className="border-none outline-none text-sm w-full placeholder:text-[16px]"
                  />
                </div>

                <div className="w-[1px] h-9 bg-grayBlueText hidden sm:block mx-6"></div>

                <div className="flex items-center gap-3 ">
                  <Location />
                  <input
                    type="text"
                    placeholder={t("hero.location")}
                    className="border-none outline-none w-full text-sm placeholder:text-[16px]"
                  />
                </div>

                <button className="text-white bg-primary p-3 rounded-md">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className=" lg:w-auto">
            <Image
              src={rightImg}
              alt="Banner 2"
              className="rounded-xl shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] w-[212px] h-[265px] object-cover"
            />
          </div>
        </div>
      </div>
      <PostJobModal
        isOpen={CompanyPostModalOpen}
        onClose={() => setCompanyPostModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
