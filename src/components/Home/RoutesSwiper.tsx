import { FC, Suspense, useState } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, Modal, useNavigate } from "zmp-ui";
import { Section } from "../common/Section";
import { departureDateState, popRouteState } from "@/state";
import { PopRouteSlideSkeleton } from "../common/Skeleton";
import { PopRoute } from "@/types/routeType";
import { buildURL } from "@/helper/buildURL";
import { parseString } from "@/utils/date";
import { formatPrice } from "@/helper/formatPrice";
import { StarsIcon } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export const RouteSwiperContent: FC = () => {
    const popRoutes = useRecoilValue(popRouteState);
    const [selectedRoute, setSelectedRoute] = useState<PopRoute | null>(null);
    const date = useRecoilValue(departureDateState)
    const navigate = useNavigate()

    return (
        <>
            <Section title="Tuyến nổi bật" padding="title-only">
                <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
                    {popRoutes.map((route: PopRoute) => (
                        <SwiperSlide key={route.routeId}>
                            <Box
                                className="space-y-2 cursor-pointer p-2"
                                onClick={() => setSelectedRoute(route)}
                            >
                                <Box
                                    className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                                    style={{ backgroundImage: `url(${route.image})` }}
                                >
                                    <Text
                                        size="small"
                                        className="absolute left-2 bottom-2 bg-black bg-opacity-50 text-white px-2 rounded-full"
                                    >
                                        {route.fromLabel} - {route.toLabel}
                                    </Text>
                                </Box>
                                <Box className="gap-1 px-1">
                                    {route.note && (
                                        <div className="flex items-center space-x-1 mb-1">
                                            <StarsIcon className="text-yellow-200" size={20} strokeWidth={2} fill="yellow" />
                                            <Text className="font-medium text-xl">
                                                {route.note}
                                            </Text>
                                        </div>
                                    )}
                                    <Text className="ml-6 text-xl font-semibold text-indigo-600 ">
                                        <span className="text-gray-400 text-[16px] font-medium">Từ</span> {formatPrice(route.price)}đ
                                    </Text>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Section>

            {selectedRoute && (
                <Modal
                    visible
                    title={selectedRoute.title}
                    description={selectedRoute.description}
                    coverSrc={selectedRoute.image}
                    actions={[
                        {
                            text: "Đóng",
                            close: true,
                        },
                        {
                            text: "Đặt Ngay",
                            highLight: true,
                            onClick: () => {
                                const url = buildURL("/availableTrip", {
                                    fromLabel: selectedRoute.fromLabel,
                                    toLabel: selectedRoute.toLabel,
                                    routeId: selectedRoute.routeId,
                                    date: parseString(date),
                                })
                                navigate(url)
                            },
                        },

                    ]}
                    onClose={() => setSelectedRoute(null)}
                />
            )}
        </>
    );
};

export const RouteSwiperFallback: FC = () => {
    const dummy = [...new Array(3)];
    return (
        <Section title="Tuyến nổi bật" padding="title-only">
            <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
                {dummy.map((_, i) => (
                    <SwiperSlide key={i}>
                        <PopRouteSlideSkeleton />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
};

export const RouteSwiper: FC = () => {
    return (
        <Suspense fallback={<RouteSwiperFallback />}>
            <RouteSwiperContent />
        </Suspense>
    );
};

export default RouteSwiper;
