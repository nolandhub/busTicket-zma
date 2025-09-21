import useUserInfo from "@/hooks/useUserInfo";
import { FC, HTMLProps, PropsWithChildren } from "react";
import { Box, Text } from "zmp-ui";
import { BodyTextProps } from "zmp-ui/text";

export const ImageSkeleton: FC<HTMLProps<HTMLImageElement>> = ({
    className,
    ...props
}) => {
    return (
        <div
            {...props}
            className={`bg-slate-300 animate-pulse ${className ?? ""}`}
        />
    );
};

export const TextSkeleton: FC<PropsWithChildren<BodyTextProps>> = ({
    className,
    ...props
}) => {
    return (
        <Text
            {...props}
            className={`bg-slate-300 text-transparent w-fit h-fit animate-pulse ${className ?? ""
                }`}
        />
    );
};

export const PopRouteSlideSkeleton: FC = () => {
    return (
        <Box className="space-y-3">
            {/* Placeholder cho ảnh tuyến đường */}
            <ImageSkeleton className="w-full aspect-video rounded-lg" />

            {/* Placeholder cho text title */}
            <Box className="space-y-1">
                <TextSkeleton size="large">Lorem ipsum dolor sit amet consectetu .praesentium dolores veritatis culpa atque autem natus asperiores aliquid</TextSkeleton>
                <TextSkeleton size="large">20,000đ</TextSkeleton>
            </Box>
        </Box>
    );
};


export const UserCardSkeleton = () => {
    const { isRegistered } = useUserInfo()

    if (!isRegistered) {
        <Box className="bg-white rounded-3xl shadow-md max-w-2xl mx-auto p-5 sm:p-6 animate-pulse">
        </Box>
    }
    return (
        <Box className="bg-white rounded-3xl shadow-md w-full max-w-2xl mx-auto p-4 sm:p-6 animate-pulse">
            <Box className="flex flex-row sm:flex-row justify-between items-center gap-4">
                {/* Avatar + info */}
                <Box className="flex items-center gap-3 w-full sm:w-auto">
                    <Box className="w-16 h-16 rounded-full bg-slate-300 flex-shrink-0" />
                    <Box className="flex-1 space-y-2">
                        <Box className="w-3/4 h-5 bg-slate-300 rounded" />
                        <Box className="w-1/2 h-4 bg-slate-300 rounded" />
                    </Box>
                </Box>

                {/* Wallet */}
                <Box className="flex flex-col items-center gap-2 w-full sm:w-auto">
                    <Box className="w-2/3 h-8 bg-amber-200 rounded-full" />
                    <Box className="w-1/2 h-3 bg-slate-300 rounded" />
                </Box>
            </Box>
        </Box>


    );
}
