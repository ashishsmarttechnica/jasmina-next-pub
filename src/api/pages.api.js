import axios from "@/lib/axios";

// GET /getpages?path=<slug>
export const getPageByPath = async (path) => {
    const res = await axios.get("/getpages", { params: { path } });
    return res.data;
};

// GET /getpages (optionally pass filters via params)
export const getPages = async () => {
    const res = await axios.get("/getpages");
    return res.data;
};


