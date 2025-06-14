"use client";

const AboutTab = ({ userData }) => {
  return (
    <div className="p-2 sm:p-6">
      <div className="px-[30px]">
        <div className="space-y-2">
          <h3 className="text-grayBlueText text-[13px] font-normal">{userData?.description}</h3>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-[13px] font-medium">Website</p>
              <a
                href={userData?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-blue-500 hover:underline"
              >
                {userData?.website || "Not specified"}
              </a>
            </div>
            <div>
              <p className="text-[13px] font-medium">Phone</p>
              <span className="text-[13px] text-blue-500">
                {userData?.phoneNumber || "Not specified"}
              </span>
            </div>
            {userData?.socialLinks && (
              <div>
                <p className="text-[13px] font-medium">LinkedIn / Social Links</p>
                <a
                  href={userData?.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-blue-500 hover:underline"
                >
                  {userData?.socialLinks || "Not specified"}
                </a>
              </div>
            )}
            {userData?.instagram && (
              <div>
                <p className="text-[13px] font-medium">Instagram</p>
                <a
                  href={userData?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-blue-500 hover:underline"
                >
                  {userData?.instagram || "Not specified"}
                </a>
              </div>
            )}
            {userData?.facebook && (
              <div>
                <p className="text-[13px] font-medium">Facebook</p>
                <a
                  href={userData?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-blue-500 hover:underline"
                >
                  {userData?.facebook || "Not specified"}
                </a>
              </div>
            )}
            {userData?.x && (
              <div>
                <p className="text-[13px] font-medium">X</p>
                <a
                  href={userData?.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-blue-500 hover:underline"
                >
                  {userData?.x || "Not specified"}
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <p className="text-[13px] font-medium">Founded</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.industry || "Not specified"}
              </span>
            </div>
            <div>
              <p className="text-[13px] font-medium">Industry</p>
              <div className="flex flex-wrap gap-2">
                {userData?.industryType?.map((industry, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 border-primary text-primary rounded border px-2 text-[12px]"
                  >
                    {industry}
                  </span>
                )) || <span className="text-grayBlueText text-[13px]">Not specified</span>}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium">Employees</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.numberOfEmployees || "Not specified"}
              </span>
            </div>
            <div>
              <p className="text-[13px] font-medium">Headquarters</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.fullAddress || "Not specified"}
              </span>
            </div>
            <div>
              <p className="text-[13px] font-medium">Company Type</p>
              <span className="text-grayBlueText text-[13px]">
                {userData?.companyType || "Not specified"}
              </span>
            </div>
            <div>
              <p className="text-[13px] font-medium">Phone</p>
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
