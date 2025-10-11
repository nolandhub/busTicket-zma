import { Box } from "zmp-ui";
import UserCard from "../common/UserCard";
import useImage from "@/hooks/useImage";

export default function UserHero() {
    const { loaded, src } = useImage("https://serverapi-pi.vercel.app/Probus/bg-hero.webp");
    return (
        <Box
            className="relative p-2 bg-no-repeat bg-cover bg-center h-[160px] flex items-end justify-center mb-24"
            style={loaded ? { backgroundImage: `url(${src})` } : { backgroundColor: "#CBD5E1" }}
        >
            {/* overlay */}
            < Box className="absolute inset-0 bg-black/5" />

            {/* UserCard */}
            < Box
                className="relative w-[90%] top-20 mb-[-10px]"
            >
                <UserCard />
            </Box >
        </Box >
    );
}
