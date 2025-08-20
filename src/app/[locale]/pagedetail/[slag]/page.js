"use client";

import { getPageByPath } from "@/api/pages.api";
import BackGroundLayout from "@/components/BackGroundOverlay/BackGroundLayout";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicPage = () => {
    const params = useParams();
    const locale = useLocale();
    const slug = params?.slag;
    console.log(slug, "slugslugslugslug");
    const [pageData, setPageData] = useState(null);
    console.log(pageData, "pageDatapageDatapageData");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const res = await getPageByPath(slug, locale);
                setPageData(res?.data[0] || res);
                console.log(res?.data, "resresresres");
            } catch (err) {
                console.error("Error fetching page:", err);
                setError("Failed to load page content");
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [slug]);

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
                    <div className="customList min-h-[50vh]">
                        <div
                            dangerouslySetInnerHTML={{
                                __html:
                                    pageData?.description ||
                                    "No content available",
                            }}
                        />
                    </div>
                </main>
            </div>
        </>
    );
};

export default DynamicPage;


