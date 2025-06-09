"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Resume from "@/assets/svg/user/Resume";
import Preference from "@/assets/svg/user/Preference";
import User from "@/assets/svg/user/User";
import Education from "@/assets/svg/user/Education";
import CreateProfile from "./CreateProfile";
import Preferences from "./Preferences";
import EducationSkills from "./EducationSkills";
import WhoCanSeeYourProfile from "./WhoCanSeeYourProfile";
import ResumeUpload from "./ResumeUpload";
import { AnimatePresence, motion } from "framer-motion";
import useUser from "@/hooks/auth/useUser";
import useAuthStore from "@/store/auth.store";
import { useTranslations } from "next-intl";
import { BiMenuAltRight } from "react-icons/bi";

const VerificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("UserProfile.userprofilemenu");
  const { data: userData, isLoading } = useUser();
  const { user } = useAuthStore();

  // console.log(user?.steps, "const");
  const steps = [
    {
      label: t("profile"),
      icon: (isActive) => <User isActive={isActive} />,
      component: (
        <CreateProfile isLoading={isLoading} setActiveTab={setActiveTab} />
      ),
    },
    {
      label: t("preferences"),
      icon: (isActive) => <Preference isActive={isActive} />,
      component: <Preferences setActiveTab={setActiveTab} />,
    },
    {
      label: t("education"),
      icon: (isActive) => <Education isActive={isActive} />,
      component: <EducationSkills setActiveTab={setActiveTab} />,
    },
    {
      label: t("resume"),
      icon: (isActive) => <Resume isActive={isActive} />,
      component: <ResumeUpload setActiveTab={setActiveTab} />,
    },
  ];

  const handleTabClick = (index) => {
    if (index > user?.steps) return;
    setActiveTab(index);
    setIsOpen(false);
  };

  const isFinalStep = activeTab === steps.length;
  const currentStepIndex = activeTab;

  useEffect(() => {
    if (user?.steps) {
      setActiveTab(user.steps);
    }
  }, [user]);

  return (
    <div className="my-9">
      {!isFinalStep && (
        <div className="container mx-auto max-w-[1110px] px-4">
          <div className="bg-white shadow-md py-4 rounded-md px-4 md:px-10">
            <div className="flex justify-between items-center md:hidden">
              {steps.map((step, index) => {
                if (index === currentStepIndex) {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div className="text-[10px]">{step.icon(true)}</div>
                      <h2 className="font-semibold text-sm text-primary">
                        {step.label}
                      </h2>
                    </div>
                  );
                }
                return null;
              })}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl"
                aria-label="Toggle Menu"
              >
                {isOpen ? <IoClose /> : <BiMenuAltRight />}
              </button>
            </div>

            <div className="md:hidden">
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px]" : "max-h-0"
                  }`}
              >
                <ul className="flex flex-col gap-4 py-4">
                  {steps.map((item, index) => {
                    const isActive = index <= currentStepIndex;

                    return (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-background"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? "bg-primary" : "bg-grayBlueText"
                            }`}
                        >
                          <span className="text-white text-xs">
                            {index + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => handleTabClick(index)}
                          disabled={index > user?.steps}
                          className={`flex items-center gap-2 w-full ${isActive
                              ? "text-primary font-bold text-sm"
                              : "text-background"
                            } ${index > user?.steps
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:text-primary"
                            }`}
                        >
                          {item.icon(isActive)}

                          <span className="text-sm block break-words whitespace-normal">
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="hidden md:block">
              <ul className="flex flex-row items-center justify-between gap-6 md:gap-2 relative pl-6 md:pl-0">
                {steps.map((item, index) => {
                  const isActive = index <= currentStepIndex;

                  return (
                    <React.Fragment key={index}>
                      <li className="relative flex items-center gap-3 w-full md:w-auto">
                        <button
                          onClick={() => handleTabClick(index)}
                          disabled={index > user?.steps}
                          className={`flex items-center gap-2 no-underline w-full md:w-auto ${isActive
                              ? "text-primary font-bold"
                              : "text-background"
                            } ${index > user?.steps
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:text-primary"
                            }`}
                        >
                          {item.icon(isActive)}
                          <span className="block text-sm md:text-sm xl:text-[15px] break-words whitespace-normal md:whitespace-nowrap">
                            {item.label}
                          </span>
                        </button>
                      </li>

                      {index !== steps.length - 1 && (
                        <li className="hidden md:block h-[1px] bg-grayBlueText/[30%] w-full"></li>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Active Step Component */}
      <div className="mt-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {!isFinalStep ? (
              steps[activeTab].component
            ) : (
              <WhoCanSeeYourProfile />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VerificationBar;
