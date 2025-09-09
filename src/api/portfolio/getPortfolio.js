import axios from "axios";

export const getPortfolio = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/portfolio/portfolio");
        return res.data.Portfolio || [];
    } catch (error) {
        console.error("Error saving user:", error);
        throw error;
    }
};
