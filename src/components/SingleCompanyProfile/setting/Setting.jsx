const Setting = () => {
  return (
    <div className="space-y-2">
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block">
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Change Password</p>
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block">
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Preference</p>
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block">
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Billing Info</p>
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block">
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Terms and Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
