import React from "react";
import EmployeStep1 from "@/assets/homePage/EmployeStep.png";
import MainTitle from "@/common/MainTitle";
import Image from "next/image";
import HandSake from "@/assets/svg/homePage/HandSake";
import Bag from "@/assets/svg/homePage/Bag";
import Letter from "@/assets/svg/homePage/Letter";
import Learn from "@/assets/svg/homePage/Learn";
import { useTranslations } from "next-intl";

const EmployeStep = () => {
  const t= useTranslations("HomePage");
  return (
    <section className="sm:mt-10 mt-5 xl:mt-32 mb-10">
      <div className="container mx-auto sm:px-0 px-2">
        <MainTitle
          title={t("employeStep.title")}
          subTitle={
            t("employeStep.subtitle")
          }
        />
        <div className="mt-10">
          <div className="flex items-center justify-center gap-10 md:flex-row flex-col ">
            <div>
              <Image src={EmployeStep1} alt="EmployeStep" />
            </div>
            <div className="space-y-7">
              <div className="flex items-start justify-start gap-3 ">
                <div className="icon">
                  <HandSake />
                </div>
                <div className="block">
                  <h4 className="font-medium   text-[17px] leading-[18px] mb-1">
                   {t("employeStep.step1.title")}
                  </h4>
                  <p className="text-grayBlueText text-[13px] ">
                    {t("employeStep.step1.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-start gap-3">
                <div className="icon">
                  <Bag />
                </div>
                <div className="block">
                  <h4 className="font-medium text-[17px] leading-[18px] mb-1">
                    {t("employeStep.step2.title")}
                  </h4>
                  <p className="text-grayBlueText text-[13px] ">
                   {t("employeStep.step2.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-start gap-3">
                <div className="icon">
                  <Letter />
                </div>
                <div className="block">
                  <h4 className="font-medium text-[17px] leading-[18px] mb-1">
                    {t("employeStep.step3.title")}
                  </h4>
                  <p className="text-grayBlueText text-[13px] ">
                    {t("employeStep.step3.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-start gap-3">
                <div className="icon">
                  <Learn />
                </div>
                <div className="block">
                  <h4 className="font-medium text-[17px] leading-[18px] mb-1">{t("employeStep.step4.title")}</h4>
                  <p className="text-grayBlueText text-[13px] ">
                    {t("employeStep.step4.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeStep;
