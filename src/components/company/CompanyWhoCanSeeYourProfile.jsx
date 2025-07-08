"use client";
import ReusableForm from "@/components/form/ReusableForm";
import { useRouter } from "@/i18n/navigation";
import Cookies from "js-cookie";
import { useState } from "react";


const CompanyWhoCanSeeYourProfile = () => {
  const router = useRouter();


  const [formData, setFormData] = useState({
    isPublic: true,
    isLGBTQFriendly: false,
    publicViewOption: 0,
  });
  const [agreedToLGBTQCommitment, setAgreedToLGBTQCommitment] = useState(false);

  const updateField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Cookies.set("profileCreated", true);
    router.push("/company/feed");
  };

  return (
    <div>
      <div className="my-6 sm:mt-10">
        <ReusableForm
          title="Who can see your profile"
          subtitle="Choose your profile visibility and safe typreferences"
        >
          {/* Toggle - Make profile public */}
     

          {/* Public View Options */}
   
          {/* Toggle - LGBTQ Friendly */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-start sm:items-center gap-2 w-full sm:w-auto">
              <div>
        
             <p className="flex items-start gap-2  pl-7 pr-4 sm:pl-8 sm:pr-0 mt-2">
                <input
                  type="checkbox"
                  checked={agreedToLGBTQCommitment}
                  onChange={() => setAgreedToLGBTQCommitment(!agreedToLGBTQCommitment)}
                  className="accent-green-600  mt-7"
                  id="lgbtq-commitment-checkbox"
                />
                <label htmlFor="lgbtq-commitment-checkbox" className="text-xs mt-5 text-gray-500">
                  By activating this, Our company commits to being LGBTQ+ inclusive and operating in a country that respects LGBTQ+ rights. We agree to provide documentation upon request and await admin approval
                </label>
              </p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer self-end sm:self-auto">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isLGBTQFriendly}
                onChange={() => updateField("isLGBTQFriendly", !formData.isLGBTQFriendly)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full relative"></div>
            </label>
          </div>

          <button onClick={handleSubmit} className="btn-fill cursor-pointer" disabled={!agreedToLGBTQCommitment}>
          next
          </button>
        </ReusableForm>
      </div>
    </div>
  );
};

export default CompanyWhoCanSeeYourProfile; 