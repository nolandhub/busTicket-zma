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
            className={`bg-skeleton animate-pulse ${className ?? ""}`}
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
            className={`bg-skeleton text-transparent w-fit h-fit animate-pulse ${className ?? ""
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



