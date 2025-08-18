import { useEffect, useState } from "react";
import BackGroundLayout from "../components/BackGroundOverlay/BackGroundLayout";

const PrivacyPolicy = () => {
    const [privacyData, setPrivacyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrivacyData = async () => {
            try {
                setLoading(true);
                // Mock data - replace with your actual API call
                const mockData = {
                    information_name: "Privacy Policy",
                    information_Description: `
            <h1>Privacy Policy</h1>
            <p>Last updated: ${new Date().toLocaleDateString()}</p>
            
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, 
            update your profile, or communicate with us.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, 
            to communicate with you, and to develop new features.</p>
            
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this policy.</p>
            
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h2>5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at 
            privacy@example.com</p>
          `
                };

                // Simulate API delay
                setTimeout(() => {
                    setPrivacyData(mockData);
                    setLoading(false);
                }, 1000);

            } catch (err) {
                console.error("Error fetching privacy policy:", err);
                setError("Failed to load privacy policy");
                setLoading(false);
            }
        };

        fetchPrivacyData();
    }, []);

    if (loading) {
        return (
            <>
                <BackGroundLayout />
                <div className="max-w-4xl mx-auto p-6 text-gray-800 space-y-2">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <BackGroundLayout />
                <div className="max-w-4xl mx-auto p-6 text-gray-800 space-y-2">
                    <div className="text-center text-red-600">
                        <p>{error}</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <BackGroundLayout />
            <div className="max-w-4xl mx-auto p-6 text-gray-800 space-y-2">
                <main className="relative">
                    <div className="customList">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: privacyData?.information_Description || "No content available",
                            }}
                        ></div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default PrivacyPolicy;

