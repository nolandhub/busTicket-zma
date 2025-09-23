import { FC, Suspense, useState } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, Modal, useNavigate } from "zmp-ui";
import { Section } from "../common/Section";
import { departureDateState, popRouteState } from "@/state";
import { PopRouteSlideSkeleton } from "../common/Skeleton";
import { PopRoute } from "@/types/routeType";
import { buildURL } from "@/helper/buildURL";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { parseString } from "@/utils/date";


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
                                <Box className="space-y-2">
                                    {route.note && (
                                        <Text className=" font-medium text-xl">
                                            ✨{route.note}
                                        </Text>
                                    )}
                                    <Text className="text-xl font-semibold text-indigo-600 ">
                                        {route.price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
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
