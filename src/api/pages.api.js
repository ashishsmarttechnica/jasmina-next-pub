import axios from "@/lib/axios";

// GET /getpages?path=<slug>&language=<code>
export const getPageByPath = async (path, language) => {
    const res = await axios.get("/getpages", {
        params: {
            path,
            ...(language ? { language } : {}),
        },
    });
    return res.data;
};

// GET /getpages?language=<code>
export const getPages = async (language) => {
    const res = await axios.get(`/getpages?language=${language}`);
    return res.data;
};


