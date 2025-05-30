"use client";
import leftImg from "@/assets/homePage/LeftBannerImage.png";
import rightImg from "@/assets/homePage/rightBannerImage.png";
import Location from "@/assets/svg/homePage/Location";
import Search from "@/assets/svg/homePage/Search";
import PostJobModal from "@/modal/PostJobModal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "rsuite";

const Hero = () => {
  const [CompanyPostModalOpen, setCompanyPostModalOpen] = useState(false);
  const handleCompanyPostJob = () => {
    setCompanyPostModalOpen(true);
  };
  const t = useTranslations("HomePage");
  return (
    <section>
      <div className="mx-0 max-w-[1209px] px-5 xl:mx-auto">
        <div className="mt-2.5 mb-10 flex flex-col items-center justify-between gap-2 lg:flex-row xl:mt-[50px] xl:gap-16">
          <div className="">
            <Image
              src={leftImg}
              alt="Banner 1"
              width={212}
              height={265}
              className="h-[265px] w-[212px] rounded-xl object-cover shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)]"
            />
          </div>

          <div className="flex w-full flex-col items-center justify-center space-y-3 lg:w-1/2 xl:space-y-4">
            <div className="text-center">
              <h1 className="text-primary mx-auto mt-4 mb-4 max-w-sm text-[22px] font-bold md:text-[28px] lg:mt-10 lg:text-xl 2xl:text-[28px]">
                {t("hero.title")}
              </h1>
              <p className="text-grayBlueText mx-auto max-w-md text-lg md:text-xl lg:text-lg 2xl:text-xl">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={handleCompanyPostJob}
                className="!bg-secondary !text-primary text-decoration-none mb-3 rounded-md p-2 text-xl font-medium sm:px-[14px] sm:py-3"
              >
                {t("hero.postaJob")}
              </Button>
            </div>

            <div className="mt-2 flex w-full items-center justify-center xl:max-w-[616px]">
              <div className="mb-5 flex flex-col items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md sm:flex-row xl:m-0 xl:mb-0 2xl:py-3">
                <div className="mx-2 flex items-center gap-3">
                  <Search />
                  <input
                    type="text"
                    placeholder={t("hero.jobtitle")}
                    className="w-full border-none text-sm outline-none placeholder:text-[16px]"
                  />
                </div>

                <div className="bg-grayBlueText mx-6 hidden h-9 w-[1px] sm:block"></div>

                <div className="flex items-center gap-3">
                  <Location />
                  <input
                    type="text"
                    placeholder={t("hero.location")}
                    className="w-full border-none text-sm outline-none placeholder:text-[16px]"
                  />
                </div>

                <button className="bg-primary rounded-md p-3 text-white">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-auto">
            <Image
              src={rightImg}
              alt="Banner 2"
              width={212}
              height={265}
              className="h-[265px] w-[212px] rounded-xl object-cover shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)]"
            />
          </div>
        </div>
      </div>
      <PostJobModal isOpen={CompanyPostModalOpen} onClose={() => setCompanyPostModalOpen(false)} />
    </section>
  );
};

export default Hero;
