import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Modal, useNavigate } from "zmp-ui";
import { useState } from "react";
import dayjs from "dayjs";
import { buildURL } from "@/utils/buildURL";

import "swiper/css";
import "swiper/css/pagination";

const routes = [
    {
        id: 1,
        title: "SÀI GÒN - ĐÀ LẠT",
        from: "saigon",
        fromLabel: "Sài Gòn",
        to: "dalat",
        toLabel: "Đà Lạt",
        image: "https://serverapi-pi.vercel.app/destination/dalat.webp",
        description: "Tuyến đường du lịch nổi tiếng giữa miền Nam và cao nguyên Đà Lạt.",
    },
    {
        id: 2,
        title: "SÀI GÒN - VŨNG TÀU",
        from: "saigon",
        fromLabel: "Sài Gòn",
        to: "vungtau",
        toLabel: "Vũng Tàu",
        image: "https://serverapi-pi.vercel.app/destination/vungtau.webp",
        description: "Tuyến đường biển nhanh chóng, thuận tiện cho du lịch cuối tuần.",
    },
    {
        id: 3,
        title: "HÀ NỘI - SAPA",
        from: "hanoi",
        fromLabel: "Hà Nội",
        to: "sapa",
        toLabel: "Sa Pa",
        image: "https://serverapi-pi.vercel.app/destination/sapa.webp",
        description: "Khám phá vùng núi Tây Bắc, nhiều cảnh đẹp hùng vĩ.",
    },
    {
        id: 4,
        title: "SÀI GÒN - HÀ NỘI",
        from: "saigon",
        fromLabel: "Sài Gòn",
        to: "hanoi",
        toLabel: "Hà Nội",
        image: "https://serverapi-pi.vercel.app/destination/hanoi.webp",
        description: "Tuyến đường dài Bắc Nam với nhiều lựa chọn xe giường nằm chất lượng.",
    },
];

const RouteSwiper = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<typeof routes[0] | null>(null);
    const today = dayjs().format("DD-MM-YYYY");

    const goBooking = (r: typeof routes[0]) => {
        navigate(
            buildURL("/availableTrip", {
                from: r.from,
                to: r.to,
                date: today,
                fromLabel: r.fromLabel,
                toLabel: r.toLabel,
            })
        );
    };

    return (
        <div className="py-4 px-3">
            <h2 className="text-center text-lg font-bold mb-3">Gợi ý cho bạn</h2>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop
                spaceBetween={12}
                slidesPerView={1.2}
                breakpoints={{ 480: { slidesPerView: 2 }, 640: { slidesPerView: 2.5 } }}
                className="!pb-8"
            >
                {routes.map((r) => (
                    <SwiperSlide key={r.id}>
                        <div
                            onClick={() => setSelected(r)}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer hover:scale-4 transition"
                        >
                            <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60" />
                            <h3 className="absolute bottom-2 left-2 text-white font-semibold text-xs">
                                {r.title}
                            </h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {selected && (
                <Modal
                    visible
                    title={selected.title}
                    coverSrc={selected.image}
                    description={selected.description}
                    actions={[
                        { text: "Đóng", close: true },
                        { text: "Đặt vé", highLight: true, onClick: () => goBooking(selected) },
                    ]}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
};

export default RouteSwiper;
