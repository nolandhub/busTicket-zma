import { Trip } from "@/types/tripType";

const busTrips: Trip[] = [
    {
        id: "trip-saigon-dalat-phuongtrang-01",
        routeId: "saigon-dalat",
        routeName: "Sài Gòn - Đà Lạt",
        compId: "phuongtrang",
        compName: "Phương Trang Express",
        busName: "Limousine 24 giường",
        priceType: "fixed",
        price: [
            {
                time: "07:00",
                detail: [
                    { label: "Ghế thường", value: 180000 },
                ],
            },
        ],
        saleId: "sale-tet-2025",
        snapShotSale: {
            saleId: "sale-tet-2025",
            label: "Giảm giá Tết 2025",
            type: "percent",
            value: 10,
            startDate: "2025-01-20T00:00:00.000Z",
            endDate: "2025-02-10T23:59:59.000Z",
            updateAt: "2025-01-10T08:00:00.000Z",
            isActive: true,
        },
        salePrice: [
            {
                time: "07:00",
                detail: [
                    { label: "Ghế thường", value: 162000 },
                    { label: "Giường VIP", value: 225000 },
                ],
            },
            {
                time: "13:00",
                detail: [
                    { label: "Ghế thường", value: 162000 },
                    { label: "Giường VIP", value: 225000 },
                ],
            },
            {
                time: "22:30",
                detail: [
                    { label: "Ghế thường", value: 180000 },
                    { label: "Giường VIP", value: 243000 },
                ],
            },
        ],
        tripConfig: {
            hasTransfer: "3", //endPoint
            forward: {
                key: "saigon",
                startLocation: "Bến xe Miền Đông",
                endLocation: "Bến xe Đà Lạt",
                pickUp: [
                    { title: "Miền Đông", subTitle: "Cổng số 1" },
                    { title: "Bình Thạnh", subTitle: "Ngã tư Hàng Xanh" },
                    { title: "Thủ Đức", subTitle: "Vincom Thủ Đức" },
                ],
                dropOff: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Chợ Đà Lạt" },
                    { title: "Hồ Xuân Hương", subTitle: "Gần khách sạn Palace" },
                ],
            },
            backward: {
                key: "dalat",
                startLocation: "Bến xe Đà Lạt",
                endLocation: "Bến xe Miền Đông",
                pickUp: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Chợ Đà Lạt" },
                    { title: "Hồ Xuân Hương", subTitle: "Gần khách sạn Palace" },
                ],
                dropOff: [
                    { title: "Miền Đông", subTitle: "Cổng số 1" },
                    { title: "Bình Thạnh", subTitle: "Ngã tư Hàng Xanh" },
                    { title: "Thủ Đức", subTitle: "Vincom Thủ Đức" },
                ],
            },
        },
        createAt: new Date("2025-09-10T08:00:00.000Z"),
        updateAt: new Date("2025-10-18T10:30:00.000Z"),
        isDelete: false,
    },
    {
        id: "trip-saigon-dalat-kumho-01",
        routeId: "saigon-dalat",
        routeName: "Sài Gòn - Đà Lạt",
        compId: "kumho",
        compName: "Kumho Samco",
        busName: "Giường nằm cao cấp 40 giường",
        priceType: "fixed",
        price: [
            {
                time: "06:30",
                detail: [
                    { label: "Ghế thường", value: 170000 },
                    { label: "Giường VIP", value: 230000 },
                ],
            },
            {
                time: "12:00",
                detail: [
                    { label: "Ghế thường", value: 170000 },
                    { label: "Giường VIP", value: 230000 },
                ],
            },
            {
                time: "23:00",
                detail: [
                    { label: "Ghế thường", value: 190000 },
                    { label: "Giường VIP", value: 250000 },
                ],
            },
        ],
        saleId: null,
        snapShotSale: null,
        salePrice: [],
        tripConfig: {
            hasTransfer: "2", //endPoint
            forward: {
                key: "saigon",
                startLocation: "Bến xe Miền Tây",
                endLocation: "Bến xe Đà Lạt",
                pickUp: [
                    { title: "Miền Tây", subTitle: "Cổng chính An Sương" },
                    { title: "Tân Bình", subTitle: "Sân bay Tân Sơn Nhất" },
                    { title: "Tân Phú", subTitle: "Chợ Tân Phú" },
                ],
                dropOff: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Big C Đà Lạt" },
                ],
            },
            backward: {
                key: "dalat",
                startLocation: "Bến xe Đà Lạt",
                endLocation: "Bến xe Miền Tây",
                pickUp: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Big C Đà Lạt" },
                ],
                dropOff: [
                    { title: "Miền Tây", subTitle: "Cổng chính An Sương" },
                    { title: "Tân Bình", subTitle: "Sân bay Tân Sơn Nhất" },
                    { title: "Tân Phú", subTitle: "Chợ Tân Phú" },
                ],
            },
        },
        createAt: new Date("2025-08-15T07:30:00.000Z"),
        updateAt: new Date("2025-10-15T14:20:00.000Z"),
        isDelete: false,
    },
    {
        id: "trip-saigon-dalat-thanhbuoi-01",
        routeId: "saigon-dalat",
        routeName: "Sài Gòn - Đà Lạt",
        compId: "thanhbuoi",
        compName: "Thanh Buổi",
        busName: "Limousine 28 chỗ",
        priceType: "fixed",
        price: [
            {
                time: "08:00",
                detail: [
                    { label: "Ghế thường", value: 200000 },
                    { label: "Giường VIP", value: 280000 },
                ],
            },
            {
                time: "14:30",
                detail: [
                    { label: "Ghế thường", value: 200000 },
                    { label: "Giường VIP", value: 280000 },
                ],
            },
        ],
        saleId: "sale-weekend-2025",
        snapShotSale: {
            saleId: "sale-weekend-2025",
            label: "Khuyến mãi cuối tuần",
            type: "percent",
            value: 15,
            startDate: "2025-10-01T00:00:00.000Z",
            endDate: "2025-12-31T23:59:59.000Z",
            updateAt: "2025-09-25T09:00:00.000Z",
            isActive: true,
        },
        salePrice: [
            {
                time: "08:00",
                detail: [
                    { label: "Ghế thường", value: 170000 },
                    { label: "Giường VIP", value: 238000 },
                ],
            },
            {
                time: "14:30",
                detail: [
                    { label: "Ghế thường", value: 170000 },
                    { label: "Giường VIP", value: 238000 },
                ],
            },
        ],
        tripConfig: {
            forward: {
                key: "saigon",
                startLocation: "Bến xe Miền Đông",
                endLocation: "Bến xe Đà Lạt",
                pickUp: [
                    { title: "Miền Đông", subTitle: "Cổng số 2" },
                    { title: "Quận 1", subTitle: "Công viên 23/9" },
                    { title: "Quận 3", subTitle: "CV Tao Đàn" },
                ],
                dropOff: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Hồ Xuân Hương" },
                ],
            },
            backward: {
                key: "dalat",
                startLocation: "Bến xe Đà Lạt",
                endLocation: "Bến xe Miền Đông",
                pickUp: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Hồ Xuân Hương" },
                ],
                dropOff: [
                    { title: "Miền Đông", subTitle: "Cổng số 2" },
                    { title: "Quận 1", subTitle: "Công viên 23/9" },
                    { title: "Quận 3", subTitle: "CV Tao Đàn" },
                ],
            },
        },
        createAt: new Date("2025-09-20T06:45:00.000Z"),
        updateAt: new Date("2025-10-17T11:15:00.000Z"),
        isDelete: false,
    },
    {
        id: "trip-saigon-dalat-hoanglong-01",
        routeId: "saigon-dalat",
        routeName: "Sài Gòn - Đà Lạt",
        compId: "hoanglong",
        compName: "Hoàng Long",
        busName: "Ghế ngồi 45 chỗ",
        priceType: "fixed",
        price: [
            {
                time: "05:30",
                detail: [
                    { label: "Ghế thường", value: 150000 },
                    { label: "Ghế VIP", value: 200000 },
                ],
            },
            {
                time: "11:00",
                detail: [
                    { label: "Ghế thường", value: 150000 },
                    { label: "Ghế VIP", value: 200000 },
                ],
            },
            {
                time: "17:00",
                detail: [
                    { label: "Ghế thường", value: 150000 },
                    { label: "Ghế VIP", value: 200000 },
                ],
            },
        ],
        saleId: null,
        snapShotSale: null,
        salePrice: [],
        tripConfig: {
            forward: {
                key: "saigon",
                startLocation: "Bến xe Miền Đông",
                endLocation: "Bến xe Đà Lạt",
                pickUp: [
                    { title: "Miền Đông", subTitle: "Quầy số 5" },
                    { title: "Bình Thạnh", subTitle: "Vincom Bình Thạnh" },
                ],
                dropOff: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Khu Hòa Bình", subTitle: "Gần chợ Hòa Bình" },
                ],
            },
            backward: {
                key: "dalat",
                startLocation: "Bến xe Đà Lạt",
                endLocation: "Bến xe Miền Đông",
                pickUp: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Khu Hòa Bình", subTitle: "Gần chợ Hòa Bình" },
                ],
                dropOff: [
                    { title: "Miền Đông", subTitle: "Quầy số 5" },
                    { title: "Bình Thạnh", subTitle: "Vincom Bình Thạnh" },
                ],
            },
        },
        createAt: new Date("2025-07-05T08:30:00.000Z"),
        updateAt: new Date("2025-10-10T09:45:00.000Z"),
        isDelete: false,
    },
    {
        id: "trip-saigon-dalat-mailinh-01",
        routeId: "saigon-dalat",
        routeName: "Sài Gòn - Đà Lạt",
        compId: "mailinh",
        compName: "Mai Linh Express",
        busName: "Limousine 34 giường",
        priceType: "fixed",
        price: [
            {
                time: "07:30",
                detail: [
                    { label: "Ghế thường", value: 175000 },
                    { label: "Giường VIP", value: 245000 },
                ],
            },
            {
                time: "15:00",
                detail: [
                    { label: "Ghế thường", value: 175000 },
                    { label: "Giường VIP", value: 245000 },
                ],
            },
            {
                time: "21:30",
                detail: [
                    { label: "Ghế thường", value: 195000 },
                    { label: "Giường VIP", value: 265000 },
                ],
            },
        ],
        saleId: "sale-loyalty-2025",
        snapShotSale: {
            saleId: "sale-loyalty-2025",
            label: "Ưu đãi khách hàng thân thiết",
            type: "percent",
            value: 12,
            startDate: "2025-09-01T00:00:00.000Z",
            endDate: "2025-11-30T23:59:59.000Z",
            updateAt: "2025-08-28T10:30:00.000Z",
            isActive: true,
        },
        salePrice: [
            {
                time: "07:30",
                detail: [
                    { label: "Ghế thường", value: 154000 },
                    { label: "Giường VIP", value: 215600 },
                ],
            },
            {
                time: "15:00",
                detail: [
                    { label: "Ghế thường", value: 154000 },
                    { label: "Giường VIP", value: 215600 },
                ],
            },
            {
                time: "21:30",
                detail: [
                    { label: "Ghế thường", value: 171600 },
                    { label: "Giường VIP", value: 233200 },
                ],
            },
        ],
        tripConfig: {
            forward: {
                key: "saigon",
                startLocation: "Bến xe Miền Đông",
                endLocation: "Bến xe Đà Lạt",
                pickUp: [
                    { title: "Miền Đông", subTitle: "Quầy Mai Linh" },
                    { title: "Quận 2", subTitle: "Thảo Điền Pearl" },
                    { title: "Quận 9", subTitle: "Vincom Quận 9" },
                ],
                dropOff: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "VP Mai Linh Đà Lạt" },
                    { title: "Phường 1", subTitle: "Đường Phan Đình Phùng" },
                ],
            },
            backward: {
                key: "dalat",
                startLocation: "Bến xe Đà Lạt",
                endLocation: "Bến xe Miền Đông",
                pickUp: [
                    { title: "Bến xe Đà Lạt", subTitle: "Đường 3 Tháng 2" },
                    { title: "Trung tâm Đà Lạt", subTitle: "VP Mai Linh Đà Lạt" },
                    { title: "Phường 1", subTitle: "Đường Phan Đình Phùng" },
                ],
                dropOff: [
                    { title: "Miền Đông", subTitle: "Quầy Mai Linh" },
                    { title: "Quận 2", subTitle: "Thảo Điền Pearl" },
                    { title: "Quận 9", subTitle: "Vincom Quận 9" },
                ],
            },
        },
        createAt: new Date("2025-08-20T07:15:00.000Z"),
        updateAt: new Date("2025-10-16T13:40:00.000Z"),
        isDelete: false,
    },
    {
        id: "trip-saigon-dalat-sapavip-01",
        routeId: "saigon-dalat",
        routeName: "Sài Gòn - Đà Lạt",
        compId: "sapavip",
        compName: "Sapa VIP Limousine",
        busName: "Limousine 9 chỗ",
        priceType: "fixed",
        price: [
            {
                time: "09:00",
                detail: [
                    { label: "Ghế VIP", value: 350000 },
                    { label: "Ghế Premium", value: 450000 },
                ],
            },
            {
                time: "16:00",
                detail: [
                    { label: "Ghế VIP", value: 350000 },
                    { label: "Ghế Premium", value: 450000 },
                ],
            },
        ],
        saleId: null,
        snapShotSale: null,
        salePrice: [],
        tripConfig: {
            forward: {
                key: "saigon",
                startLocation: "Điểm đón trung tâm",
                endLocation: "Khách sạn trung tâm Đà Lạt",
                pickUp: [
                    { title: "Quận 1", subTitle: "Khách sạn Sheraton" },
                    { title: "Quận 1", subTitle: "Khách sạn Rex" },
                    { title: "Quận 3", subTitle: "Nhà khách chỉ định" },
                ],
                dropOff: [
                    { title: "Trung tâm Đà Lạt", subTitle: "Ana Mandara" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Dalat Palace" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Khách sạn chỉ định" },
                ],
            },
            backward: {
                key: "dalat",
                startLocation: "Khách sạn trung tâm Đà Lạt",
                endLocation: "Điểm đón trung tâm",
                pickUp: [
                    { title: "Trung tâm Đà Lạt", subTitle: "Ana Mandara" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Dalat Palace" },
                    { title: "Trung tâm Đà Lạt", subTitle: "Khách sạn chỉ định" },
                ],
                dropOff: [
                    { title: "Quận 1", subTitle: "Khách sạn Sheraton" },
                    { title: "Quận 1", subTitle: "Khách sạn Rex" },
                    { title: "Quận 3", subTitle: "Nhà khách chỉ định" },
                ],
            },
        },
        createAt: new Date("2025-09-28T10:00:00.000Z"),
        updateAt: new Date("2025-10-19T15:25:00.000Z"),
        isDelete: false,
    },
];

export default busTrips;