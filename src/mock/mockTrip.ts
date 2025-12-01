import { TripWithSale } from "@/types/tripType";

const TripMockData: TripWithSale[] = [
    {
        "tripId": 1,
        "routeId": 2,
        "routeCode": "nhatrang-saigon",
        "routeName": "Nha Trang - Sài Gòn",
        "compCode": "ananh",
        "compName": "AN ANH LIMOUSINE",
        "busName": "Limousine 24 Phòng Đôi",
        "priceType": "byBed",
        "transferType": 1,
        "pickUp": [
            {
                "title": "VP Nha Trang",
                "subtitle": "Lô 5G CT3 VCN Phước Hải "
            },
            {
                "title": "Bến Xe Phía Bắc",
                "subtitle": null
            },
            {
                "title": "Bến Xe Phía Nam",
                "subtitle": null
            },
            {
                "title": "Cam Ranh - Dọc QL1A",
                "subtitle": null
            }
        ],
        "dropOff": [
            {
                "title": "Vòng Xoay Cao Tốc Long Thành ",
                "subtitle": null
            },
            {
                "title": "Bãi Xe An Phú",
                "subtitle": "93/8 Nguyễn Hoàng, An Phú, Thủ Đức "
            },
            {
                "title": "VP Bình Thạnh",
                "subtitle": "116 Quốc Lộ 13, P.26"
            },
            {
                "title": "VP Quận 5",
                "subtitle": "95 Nguyễn Duy Khương, P.9"
            },
            {
                "title": "VP Tân Phú",
                "subtitle": "110 Thạnh Tây, P. Thạnh Tây "
            }
        ],
        "price": [
            {
                "time": "14:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 349000,
                        "saleValue": 348965,
                        "finalPrice": 348965
                    },
                    {
                        "label": "Giường Đôi",
                        "value": 449000,
                        "saleValue": 448965,
                        "finalPrice": 448965
                    }
                ]
            },
            {
                "time": "15:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 349000,
                        "saleValue": 348965,
                        "finalPrice": 348965
                    },
                    {
                        "label": "Giường Đôi",
                        "value": 449000,
                        "saleValue": 448965,
                        "finalPrice": 448965
                    }
                ]
            },
            {
                "time": "22:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 349000,
                        "saleValue": 348965,
                        "finalPrice": 348965
                    },
                    {
                        "label": "Giường Đôi",
                        "value": 449000,
                        "saleValue": 448965,
                        "finalPrice": 448965
                    }
                ]
            },
            {
                "time": "23:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 349000,
                        "saleValue": 348965,
                        "finalPrice": 348965
                    },
                    {
                        "label": "Giường Đôi",
                        "value": 449000,
                        "saleValue": 448965,
                        "finalPrice": 448965
                    }
                ]
            }
        ],
        "saleSnapShot": {
            "saleId": 3,
            "label": "sale cho route",
            "type": "amount",
            "scope": "route",
            "value": 35,
            "startDate": "2025-10-31T17:00:00.000Z",
            "endDate": "2025-12-29T17:00:00.000Z",
            "updateAt": "2025-11-30T05:30:43.524Z",
            "isActive": true
        }
    },
    {
        "tripId": 6,
        "routeId": 2,
        "routeCode": "nhatrang-saigon",
        "routeName": "Nha Trang - Sài Gòn",
        "compCode": "cuctung",
        "compName": "CÚC TÙNG LIMOUSINE",
        "busName": "Limousine 21 Phòng Đơn",
        "priceType": "byBed",
        "transferType": 1,
        "pickUp": [
            {
                "title": "VP Nha Trang",
                "subtitle": null
            },
            {
                "title": "Bến Xe Phía Bắc",
                "subtitle": null
            },
            {
                "title": "Bến Xe Phía Nam",
                "subtitle": null
            },
            {
                "title": "Cam Ranh - Dọc QL1A",
                "subtitle": null
            }
        ],
        "dropOff": [
            {
                "title": "Dọc Đường Quốc Lộ 1A ",
                "subtitle": null
            },
            {
                "title": "Bến Xe Miền Đông Mới, Thủ Đức ",
                "subtitle": null
            },
            {
                "title": "VP Bình Thạnh",
                "subtitle": "339 Đinh Bộ Lĩnh, P.26"
            }
        ],
        "price": [
            {
                "time": "07:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 369965,
                        "finalPrice": 369965
                    }
                ]
            },
            {
                "time": "09:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 369965,
                        "finalPrice": 369965
                    }
                ]
            },
            {
                "time": "10:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 369965,
                        "finalPrice": 369965
                    }
                ]
            },
            {
                "time": "11:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 369965,
                        "finalPrice": 369965
                    }
                ]
            },
            {
                "time": "12:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 369965,
                        "finalPrice": 369965
                    }
                ]
            },
            {
                "time": "20:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 296000,
                        "finalPrice": 296000
                    }
                ]
            },
            {
                "time": "21:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 296000,
                        "finalPrice": 296000
                    }
                ]
            },
            {
                "time": "21:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 369965,
                        "finalPrice": 369965
                    }
                ]
            },
            {
                "time": "22:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 370000,
                        "saleValue": 369965,
                        "finalPrice": 369965
                    }
                ]
            }
        ],
        "saleSnapShot": {
            "saleId": 2,
            "label": "Thích là sale ",
            "type": "percent",
            "scope": "trip",
            "value": 20,
            "startDate": "2025-10-31T17:00:00.000Z",
            "endDate": "2025-12-29T17:00:00.000Z",
            "updateAt": "2025-11-30T05:30:43.524Z",
            "isActive": false
        }
    },
    {
        "tripId": 7,
        "routeId": 2,
        "routeCode": "nhatrang-saigon",
        "routeName": "Nha Trang - Sài Gòn",
        "compCode": "ananh",
        "compName": "AN ANH LIMOUSINE",
        "busName": "Limousine 34 Giường ",
        "priceType": "byBed",
        "transferType": 1,
        "pickUp": [
            {
                "title": "VP Nha Trang",
                "subtitle": "Lô 5G CT3 VCN Phước Hải"
            },
            {
                "title": "Bến Xe Phía Bắc",
                "subtitle": null
            },
            {
                "title": "Bến Xe Phía Nam",
                "subtitle": null
            },
            {
                "title": "Cam Ranh - Dọc QL1A",
                "subtitle": null
            }
        ],
        "dropOff": [
            {
                "title": "Vòng Xoay Cao Tốc Long Thành ",
                "subtitle": null
            },
            {
                "title": "Cầu Vượt Linh Xuân",
                "subtitle": null
            },
            {
                "title": "Bãi Xe An Phú",
                "subtitle": "93/8 Nguyễn Hoàng, An Phú, Thủ Đức"
            },
            {
                "title": "VP Bình Thạnh",
                "subtitle": "116 Quốc Lộ 13, P.26"
            },
            {
                "title": "VP Quận 5",
                "subtitle": "95 Nguyễn Duy Dương, P.9"
            },
            {
                "title": "VP Tân Phú",
                "subtitle": "110 Tây Thạnh, P.Tây Thạnh "
            }
        ],
        "price": [
            {
                "time": "12:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 250000,
                        "saleValue": 249965,
                        "finalPrice": 249965
                    }
                ]
            },
            {
                "time": "13:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 250000,
                        "saleValue": 249965,
                        "finalPrice": 249965
                    }
                ]
            },
            {
                "time": "17:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 250000,
                        "saleValue": 249965,
                        "finalPrice": 249965
                    }
                ]
            },
            {
                "time": "21:00",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 250000,
                        "saleValue": 249965,
                        "finalPrice": 249965
                    }
                ]
            },
            {
                "time": "22:30",
                "detail": [
                    {
                        "label": "Giường Đơn",
                        "value": 250000,
                        "saleValue": 249965,
                        "finalPrice": 249965
                    }
                ]
            }
        ],
        "saleSnapShot": {
            "saleId": 3,
            "label": "sale cho route",
            "type": "amount",
            "scope": "route",
            "value": 35,
            "startDate": "2025-10-31T17:00:00.000Z",
            "endDate": "2025-12-29T17:00:00.000Z",
            "updateAt": "2025-11-30T05:30:43.524Z",
            "isActive": true
        }
    }
];

export default TripMockData;