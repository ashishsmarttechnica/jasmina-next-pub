import { useEffect, useState } from "react";
import BackGroundLayout from "../components/BackGroundOverlay/BackGroundLayout";

const TermsConditions = () => {
    const [termsData, setTermsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                setLoading(true);
                // Mock data - replace with your actual API call
                const mockData = {
                    information_name: "Terms & Conditions",
                    information_Description: `
            <h1>Terms & Conditions</h1>
            <p>Last updated: ${new Date().toLocaleDateString()}</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms 
            and provision of this agreement.</p>
            
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on this website 
            for personal, non-commercial transitory viewing only.</p>
            
            <h2>3. Disclaimer</h2>
            <p>The materials on this website are provided on an 'as is' basis. We make no warranties, 
            expressed or implied, and hereby disclaim and negate all other warranties including without 
            limitation, implied warranties or conditions of merchantability, fitness for a particular 
            purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2>4. Limitations</h2>
            <p>In no event shall we or our suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising 
            out of the use or inability to use the materials on this website.</p>
            
            <h2>5. Revisions and Errata</h2>
            <p>The materials appearing on this website could include technical, typographical, or 
            photographic errors. We do not warrant that any of the materials on this website are 
            accurate, complete or current.</p>
            
            <h2>6. Contact Information</h2>
            <p>If you have any questions about these Terms & Conditions, please contact us at 
            terms@example.com</p>
          `
                };

                // Simulate API delay
                setTimeout(() => {
                    setTermsData(mockData);
                    setLoading(false);
                }, 1000);

            } catch (err) {
                console.error("Error fetching terms & conditions:", err);
                setError("Failed to load terms & conditions");
                setLoading(false);
            }
        };

        fetchTermsData();
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
                                __html: termsData?.information_Description || "No content available",
                            }}
                        ></div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default TermsConditions;

