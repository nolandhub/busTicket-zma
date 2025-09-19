import { Box } from "zmp-ui";
import UserCard from "../common/UserCard";
import useUserInfo from "../../hooks/useUserInfo";



export default function UserHero() {
    const { handleRegister, userData, isRegistered } = useUserInfo()

    return (
        <Box
            className="relative p-2 bg-no-repeat bg-cover bg-center h-[160px] flex items-end justify-center mb-24"
            style={{
                backgroundImage: `url(https://serverapi-pi.vercel.app/Probus/bg-hero.webp)`,
            }}
        >
            {/* overlay */}
            <Box className="absolute inset-0 bg-black/5" />

            {/* UserCard */}
            <Box
                className="relative w-[80%] sm:w-[80%] md:w-[60%] max-w-md mb-[-80px] top-4"
            >
                <UserCard
                    user={userData}
                    onClick={handleRegister}
                    isRegistered={isRegistered}
                />
            </Box>
        </Box>


    );
}
