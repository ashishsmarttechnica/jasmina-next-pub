import React from "react";
import footerLogo from "@/assets/footer/footerLogo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer>
      <div className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="md:flex md:items-center md:justify-center sm:flex-row flex-col  mb-10">
            <div className="space-y-5 xl:me-[240px] space-x-3">
              <Image
                src={footerLogo}
                alt="footerLogo"
                width={225}
                height={94}
              />
              <p className="text-grayBlueText text-base max-w-xs">
                {t("title")}
              </p>
            </div>
            <div className="grid 2xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-40 gap-10 mt-10 md:mt-0">
              <div>
                <div>
                  <h3 className="text-xl font-medium mb-2.5">
                    {t("Explorer")}
                  </h3>
                  <ul className="text-grayBlueText text-base">
                    <li className="pb-1.5">{t("explorerMenu.connection")}</li>
                    <li className="pb-1.5">{t("explorerMenu.FindJobs")}</li>
                    <li className="pb-1.5">{t("explorerMenu.PostJobJob")}</li>
                    <li className="pb-1.5">{t("explorerMenu.Chat")}</li>
                    <li className="pb-1.5">{t("explorerMenu.Notification")}</li>
                    <li className="">{t("explorerMenu.ShareYourExpertise")}</li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="text-xl font-medium mb-2.5">
                    {t("SupportHelp")}
                  </h3>
                  <ul className="text-grayBlueText text-base">
                    <li className="pb-1.5">
                      {t("SupportHelpMenu.HelpCenter")}
                    </li>
                    <li className="pb-1.5">{t("SupportHelpMenu.ContactUs")}</li>
                    <li className="pb-1.5">
                      {t("SupportHelpMenu.PrivacyPolicy")}
                    </li>
                    <li className="">{t("SupportHelpMenu.TermsService")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <p className="border border-b my-8 w-full border-footerBorder"></p>
          <div className="flex  justify-between sm:flex-row flex-col">
            <div>
              <div>
                <ul className="text-grayBlueText sm:flex-row flex-col flex items-start justify-start sm:gap-6 text-base">
                  <li>{t("socialMenu.LinkedIn")}</li>
                  <li>{t("socialMenu.twitter")}</li>
                  <li>{t("socialMenu.Facebook")}</li>
                  <li>{t("socialMenu.Instagram")}</li>
                </ul>
              </div>
            </div>
            <div className="text-grayBlueText text-base">
              {t("copyRightights")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
