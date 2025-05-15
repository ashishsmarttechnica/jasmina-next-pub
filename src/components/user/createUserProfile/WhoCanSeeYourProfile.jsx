"use client";
import React, { useEffect, useState } from "react";
import ReusableForm from "@/components/form/ReusableForm";
import useAuthStore from "@/store/auth.store";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/navigation";

const WhoCanSeeYourProfile = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const {
    mutate: updateProfile,
    isPending,
    error: apiError,
  } = useUpdateProfile();
  const [formData, setFormData] = useState({
    isPublic: true,
    isLGBTQFriendly: false,
    publicViewOption: 0,
  });

  const updateField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const submitData = new FormData();
    submitData.append("visibility.isPublic", formData.isPublic);
    submitData.append(
      "visibility.onlyLGBTQFriendlyCompanies",
      formData.isLGBTQFriendly
    );
    if (formData.isPublic) {
      submitData.append("visibility.visibleTo", formData.publicViewOption);
    } else {
      submitData.append("visibility.visibleTo", "");
    }
    submitData.append("profileComplete", true);

    updateProfile(submitData, {
      onSuccess: (res) => {
        if (res.success) {
          Cookies.set("profileCreated", true);
          router.push("/feed");
        }
      },
    });
  };

  useEffect(() => {
    if (user?.visibility) {
      setFormData((prev) => ({
        ...prev,
        isPublic: user?.visibility?.isPublic || false,
        isLGBTQFriendly: user?.visibility?.onlyLGBTQFriendlyCompanies || false,
        publicViewOption: user?.visibility?.visibleTo || 0,
      }));
    }
  }, [user]);

  return (
    <div>
      <div className="mt-6 sm:mt-10">
        <ReusableForm
          title="Who can see your profile?"
          subtitle="Choose your profile visibility and safety preferences."
        >
          {/* Toggle - Make profile public */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-start sm:items-center gap-2 w-full sm:w-auto">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[20px]">🌍</span>
                  <p className="font-semibold text-sm">
                    Make my profile public
                  </p>
                </div>
                <p className="text-xs text-gray-500 pl-7 pr-4 sm:pl-8 sm:pr-0">
                  Anyone on the platform (users + companies) can see your
                  profile.
                </p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer self-end sm:self-auto">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isPublic}
                onChange={() => updateField("isPublic", !formData.isPublic)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full relative"></div>
            </label>
          </div>

          {/* Public View Options */}
          {formData.isPublic && (
            <div className="mb-4 px-4 sm:px-8">
              <p className="text-sm font-medium mb-2">
                Who can view your public profile?
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {[
                  { label: "Friends", value: 0 },
                  { label: "Companies", value: 1 },
                  { label: "Both", value: 2 },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-1 text-sm"
                  >
                    <input
                      type="radio"
                      name="publicView"
                      value={option.value}
                      checked={formData.publicViewOption === option.value}
                      onChange={() =>
                        updateField("publicViewOption", option.value)
                      }
                      className="accent-green-600"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Toggle - LGBTQ Friendly */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-start sm:items-center gap-2 w-full sm:w-auto">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[20px]">🌈</span>
                  <p className="font-semibold text-sm">
                    Show only to LGBTQ+ friendly companies
                  </p>
                </div>
                <p className="text-xs text-gray-500 pl-7 pr-4 sm:pl-8 sm:pr-0">
                  Your profile will remain hidden from public. Only companies
                  located in LGBTQ-friendly countries can access it.
                </p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer self-end sm:self-auto">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isLGBTQFriendly}
                onChange={() =>
                  updateField("isLGBTQFriendly", !formData.isLGBTQFriendly)
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full relative"></div>
            </label>
          </div>

          <button onClick={handleSubmit} className="btn-fill cursor-pointer">
            Next
          </button>
        </ReusableForm>
      </div>
    </div>
  );
};

export default WhoCanSeeYourProfile;
