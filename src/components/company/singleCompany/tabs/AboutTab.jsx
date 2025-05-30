"use client";

const AboutTab = ({ userData }) => {
  return (
    <div className="sm:p-6 p-2">
      <div className="px-[30px]">
        <div className="space-y-2">
          <h3 className="text-grayBlueText text-[13px] font-normal">{userData?.description}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-6">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-[13px]">Website</p>
              <a
                href={userData?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-[13px]"
              >
                {userData?.website || "Not specified"}
              </a>
            </div>
            <div>
              <p className="font-medium text-[13px]">Phone</p>
              <span className=" text-[13px] text-blue-500 ">
                {userData?.phoneNumber || "Not specified"}
              </span>
            </div>
            <div>
              <p className="font-medium text-[13px]">LinkedIn / Social Links</p>
              <span className=" text-[13px] text-blue-500 ">
                {userData?.socialLinks || "Not specified"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-medium text-[13px]">Founded</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.industry || "Not specified"}
              </span>
            </div>
            <div>
              <p className="font-medium text-[13px]">Industry</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.industryType || "Not specified"}
              </span>
            </div>
            <div>
              <p className="font-medium text-[13px]">Employees</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.numberOfEmployees || "Not specified"}
              </span>
            </div>
            <div>
              <p className="font-medium text-[13px]">Headquarters</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.fullAddress || "Not specified"}
              </span>
            </div>
            <div>
              <p className="font-medium text-[13px]">Company Type</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.companyType || "Not specified"}
              </span>
            </div>
            <div>
              <p className="font-medium text-[13px]">Phone</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.contact || "Not specified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
