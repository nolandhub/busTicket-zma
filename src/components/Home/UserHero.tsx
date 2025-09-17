import { Box } from "zmp-ui";
import UserCard from "../common/UserCard";
import useUserInfo from "../hooks/useUserInfo";
import bgHero from "@/static/bg-hero.webp"


export default function UserHero() {
    const { handleRegister, userData, isRegistered } = useUserInfo()

    return (
        <Box className="relative pb-28">
            <img
                loading="eager"
                src={bgHero}
                alt="Banner"
                className="w-full h-40 object-center"
            />
            <Box className="absolute left-1/2 pt-12 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[60%]">
                <UserCard user={userData} onClick={handleRegister} isRegistered={isRegistered} />
            </Box>
        </Box>
    );
}
