import axios from "axios";

// Get Vehicle by Slug
export const getVanBySlug = async (slug) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/van/${slug}`);
    return res.data.vans;
  } catch (error) {
    console.error("Error fetching vehicle by slug:", error);
    throw error;
  }
};
