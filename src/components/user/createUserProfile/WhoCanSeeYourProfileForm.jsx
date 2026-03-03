const WhoCanSeeYourProfileForm = ({ formData, setFormData }) => {
  // Handlers
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, publicViewOption: Number(e.target.value) }));
  };

  return (
    <div className="max-w-xl rounded-xl">
      <p className="mb-2 py-1 text-lg font-semibold text-gray-800">Who can see your profile?</p>
      {/* Make profile public */}
      <div className="mx-auto mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="mt-1 text-[24px]">🌍</span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-black mb-1 block text-[14px]">Make my profile public</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Your profile will be visible to others based on your selection below.
            </p>
          </div>
        </div>
        <label className="inline-flex cursor-pointer items-center self-end sm:self-auto">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={formData.isPublic}
            onChange={() =>
              handleCheckboxChange({ target: { name: "isPublic", checked: !formData.isPublic } })
            }
            name="isPublic"
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 peer-focus:outline-none after:absolute after:h-6 after:w-6 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
        </label>
      </div>
      {/* Public View Options */}
      {formData.isPublic && (
        <div className="mb-6 px-2 sm:px-9">
          <p className="mb-2 text-sm font-medium text-gray-700">Visible to:</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-grayBlueText">
              <input
                type="radio"
                name="publicViewOption"
                value={0}
                checked={formData.publicViewOption === 0}
                onChange={handleRadioChange}
                className="accent-green-600"
              />
              Other Users
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-grayBlueText">
              <input
                type="radio"
                name="publicViewOption"
                value={1}
                checked={formData.publicViewOption === 1}
                onChange={handleRadioChange}
                className="accent-green-600"
              />
              Companies
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-grayBlueText">
              <input
                type="radio"
                name="publicViewOption"
                value={2}
                checked={formData.publicViewOption === 2}
                onChange={handleRadioChange}
                className="accent-green-600 "
              />
              Both
            </label>
          </div>
        </div>
      )}
      {/* Only LGBTQ Friendly Companies */}
      <div className="mb-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="mt-1 text-[24px]">🌈</span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-black mb-1 block text-[14px]">Only LGBTQ Friendly Companies</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Only companies that are LGBTQ friendly will be able to view your profile.
            </p>
          </div>
        </div>
        <label className="inline-flex cursor-pointer items-center self-end sm:self-auto">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={formData.isLGBTQFriendly}
            onChange={() =>
              handleCheckboxChange({
                target: { name: "isLGBTQFriendly", checked: !formData.isLGBTQFriendly },
              })
            }
            name="isLGBTQFriendly"
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 peer-focus:outline-none after:absolute after:h-6 after:w-6 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
        </label>
      </div>
    </div>
  );
};

export default WhoCanSeeYourProfileForm;
