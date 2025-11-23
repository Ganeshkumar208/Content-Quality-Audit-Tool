// export const formatScore = (value) => Math.round(value || 0);

// export const capitalize = (text) =>
//     text.charAt(0).toUpperCase() + text.slice(1);





export const toPercent = (n?: number | null) => {
    if (n === null || n === undefined) return 0;
    const v = Number(n);
    if (Number.isNaN(v)) return 0;
    return Math.round(v);
};

export const safe = <T = any>(obj: any, path: string, fallback: T): T => {
    try {
        const v = path.split(".").reduce((a: any, k: string) => a?.[k], obj);
        return v === undefined ? fallback : v;
    } catch {
        return fallback;
    }
};
