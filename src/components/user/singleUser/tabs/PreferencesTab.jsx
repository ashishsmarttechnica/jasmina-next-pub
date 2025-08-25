"use client";
import { useTranslations } from "next-intl";

const PreferencesTab = ({ preferences }) => {
    const t = useTranslations("UserProfile.profile.singleprofileTab");
    // Helper to determine if a single value is meaningfully present
    const isValuePresent = (value) => {
        if (typeof value === "object") return Object.keys(value).length > 0;
        return true; // numbers, booleans
    };

    // Handle missing or empty preferences object
    const hasAnyPreferenceData =
        preferences && typeof preferences === "object"
            ? Object.values(preferences).some(isValuePresent)
            : false;

    if (!hasAnyPreferenceData) {
        return (
            <div className="p-4">
                <div className="px-[30px]">
                    <p className="text-gray-500">{t("Nodatafound")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="px-[30px] space-y-3 text-sm text-gray-700">
                <div className="grid grid-cols-2 ">

                    <div>
                        <h3 className="font-medium">Job Role</h3>
                        <p>{preferences.jobRole || "N/A"}</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Preferred Industry</h3>
                        <p>{preferences.preferredIndustry || "N/A"}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 ">
                    <div>
                        <h3 className="font-medium">Preferred Location</h3>
                        <p>{preferences.preferredLocation || "N/A"}</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Job Type</h3>
                        <p>{Array.isArray(preferences.jobType) ? preferences.jobType.join(", ") : "N/A"}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 ">
                    <div>
                        <h3 className="font-medium">Expected Salary</h3>
                        <p>
                            {preferences.expectedSalaryRange
                                ? `${preferences.expectedSalaryRange} ${preferences.currency || ""}`
                                : "N/A"}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Years of Experience</h3>
                        <p>{preferences.yearsOfExperience ?? "N/A"}</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-medium">Available From</h3>
                    <p>{preferences.availableFrom ? preferences.availableFrom : "Not specified"}</p>
                </div>
            </div>
        </div>
    );
};

export default PreferencesTab;
