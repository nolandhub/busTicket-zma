// UserHero.tsx
import { Box } from "zmp-ui";
import UserCard from "../common/UserCard";

export default function UserHero() {
    return (
        <Box className="relative w-full mb-24">
            <img
                src={"/assets/banner-CCu2cmNb.webp"}
                alt="banner"
                className="w-full h-[20vh] object-center"
                loading="eager"
                
                width={500}
                height={300}
            />

            <Box className="absolute inset-0 bg-black/5" />

            <Box className="absolute -bottom-5 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%]">
                <UserCard />
            </Box>
        </Box>

    );
}