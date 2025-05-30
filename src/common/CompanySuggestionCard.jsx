"use client";
import Contact from "@/assets/svg/feed/Contact";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import { suggestions } from "./Data/Data";

function CompanySuggestionCard({ type, title, buttonType, postjob }) {
  const handleContactClick = (id) => {
    console.log("Contact clicked:", id);
  };

  const handleInviteAction = (id, action) => {
    console.log(`User ${id} ${action}`);
  };
  const t = useTranslations("CompanyMainFeed");
  return (
    <>
      {postjob === "postjob" && (
        <button
          onClick={() => handleInviteAction(user.id, "postjob")}
          className="bg-primary hover:border-primary w-full rounded-sm border border-transparent px-2 py-2 text-white transition-colors duration-300 hover:bg-transparent hover:text-black"
        >
          {t("postjob")}
        </button>
      )}

      <Card className="md:w-full md:max-w-full xl:max-w-[266px]">
        <CardHeading title={title} />

        <div
          className={`w-full py-4 ${type === "connection" ? "px-5" : "px-2"} flex flex-col gap-4`}
        >
          {suggestions.slice(0, 5).map((user, index) => (
            <div key={user.id || index} className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px] rounded-full object-cover"
                  />
                  {user.online && (
                    <span className="bg-primary absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-[1.5px] border-white" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-medium">{user.name}</p>
                  <p className="text-grayBlueText mt-0.5 text-xs font-normal">{user.title}</p>
                </div>
              </div>
              {/* ✅ Handle button rendering based on buttonType */}
              {buttonType === "contact" && (
                <button
                  onClick={() => handleContactClick(user.id)}
                  className="bg-secondary hover:border-primary rounded-sm border border-transparent px-2 py-2 transition-colors duration-300 hover:bg-transparent"
                >
                  <Contact />
                </button>
              )}

              {buttonType === "invite" && (
                <div className="flex gap-2 p-2">
                  <button
                    onClick={() => handleInviteAction(user.id, "reject")}
                    className="border-grayBlueText text-grayBlueText cursor-pointer items-center rounded-sm border-[0.5px] px-1.5 py-1.5 transition-all duration-300 hover:scale-105 hover:border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <IoClose className="h-[15px] w-[15px] font-medium" />
                  </button>
                  <button
                    onClick={() => handleInviteAction(user.id, "accept")}
                    className="border-primary bg-primary hover:border-grayBlueText cursor-pointer items-center rounded-sm border-[0.5px] px-1.5 py-1.5 text-white hover:bg-transparent hover:text-black"
                  >
                    <FaCheck className="h-[15px] w-[15px] font-medium" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

export default CompanySuggestionCard;
