export function buildUrlQuery(obj: { [key: string]: any } | undefined) {
    if (!obj) return "";
    const query = Object.entries(obj)
        .filter(([, value]) => value !== "") // Remove entries with empty string values
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    return query ? "?" + query : "";
}
