import { Wallet } from "lucide-react";
import { FC, Suspense } from "react";
import { Avatar, Box, Spinner, Text } from "zmp-ui";
import { zaloUser, firestoreUser } from "@/types/userInfo";
import RegisterSection from "../Home/RegisterSection";

interface userBannerProps {
    user: zaloUser & firestoreUser | null
    isRegistered: boolean
    onClick: () => void
}

const UserCard: FC<userBannerProps> = ({ user, onClick, isRegistered }) => {
    if (!isRegistered) {
        return (
            <RegisterSection handleClick={onClick} />
        );
    }

    if (!user || null) return null

    return (
        <Box className="bg-white rounded-3xl shadow-md max-w-2xl mx-auto p-5 sm:p-6">
            <Box flex alignItems="center" justifyContent="space-between" className="gap-4 ">
                <Box flex alignItems="center" className="gap-4">
                    <Avatar backgroundColor="SKYBLUE-GREEN" size={65} src={user.avatar}>
                        {user.name?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Text size="large" className="font-bold text-black truncate">
                            {user.name || "Người dùng"}
                        </Text>
                        <Text size="small" className="font-semibold text-gray-500 truncate">
                            {user.role || "Thành viên"}
                        </Text>
                    </Box>
                </Box>

                {/* Wallet */}
                <Box flex flexDirection="column" alignItems="center">
                    <Box
                        flex
                        justifyContent="space-between"
                        className="gap-2 bg-amber-500 text-white px-4 py-2 rounded-full"
                    >
                        <Wallet size={20} />
                        <Text size="small" className="font-semibold">
                            {(Number(user.totalSpending) || 0).toLocaleString("vi-VN")}đ
                        </Text>
                    </Box>
                    <Text size="xSmall" className="font-bold mt-1 text-center">
                        Lịch sử giao dịch
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default UserCard



