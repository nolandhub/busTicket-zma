/**
 * Tạo URL có query string từ đường dẫn và object params
 * @param path Đường dẫn (VD: "/availableTrip")
 * @param params Các tham số (VD: { from: "Hà Nội", to: "Huế" })
 * @returns URL đầy đủ (VD: "/availableTrip?from=H%C3%A0+N%E1%BB%99i&to=Hu%E1%BA%BF")
 */


////////////////////////////////////*
//       ** README ** IF FORGET     *
//Record define param as (key:value)*
//  (key:string,value:type)         *
////////////////////////////////////*



export function buildURL(
    path: string,
    params: Record<string, string | number | boolean | null | undefined | Date>

): string {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value)); // ✅ ép kiểu về string
        }
    });

    const queryString = queryParams.toString();
    return queryString ? `${path}?${queryString}` : path;
}