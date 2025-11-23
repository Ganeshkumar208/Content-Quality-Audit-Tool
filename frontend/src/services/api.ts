const BASE_URL = "http://localhost:5008/api/audit/analyze";

export const analyzeContent = async (payload) => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to fetch");
        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
