import axios from "axios";

export const getVan = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/van/vans`);
    return res.data?.vans || [];
  } catch (error) {
    console.warn("Request failed, returning empty array:", error.message);
    return []; // ✅ error throw nahi hoga, sirf [] return karega
  }
};
