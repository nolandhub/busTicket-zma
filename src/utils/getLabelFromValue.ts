export const suggestions = [
    { label: "Sân Bay Tân Sơn Nhất", value: "tansonnhat" },
    { label: "Sài Gòn", value: "saigon" },
    { label: "Hà Nội", value: "hanoi" },
    { label: "Đà Lạt", value: "dalat" },
    { label: "Vũng Tàu", value: "vungtau" },
    { label: "Nha Trang", value: "nhatrang" },
    { label: "Bình Dương", value: "binhduong" },
    { label: "Sapa", value: "sapa" },
    { label: "Lào Cai", value: "laocai" },
    { label: "Kon Tum", value: "kontum" },
    { label: "Ninh Hòa", value: "ninhhoa" },
    { label: "Bến Cát", value: "bencat" },
    { label: "Cam Ranh", value: "camranh" },
    { label: "Tuy Hòa", value: "tuyhoa" },
    { label: "Hội An", value: "hoian" },
    { label: "Đà Nẵng", value: "danang" },
    { label: "Huế", value: "hue" },
    { label: "Cà Mau", value: "camau" },
    { label: "Cần Thơ", value: "cantho" },
    { label: "Mũi Né", value: "muine" },
    { label: "Phan Thiết", value: "phanthiet" },
    { label: "Phan Rang", value: "phanrang" },
    { label: "Ninh Sơn", value: "ninhson" },
]


export const getLabelFromValue = (value: string): string | undefined => {
    const found = suggestions.find((item) => item.value === value);
    return found?.label;
};
