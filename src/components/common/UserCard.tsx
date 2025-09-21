import { Wallet } from "lucide-react";
import { FC, Suspense } from "react";
import { Avatar, Box, Text, Button, Spinner } from "zmp-ui";

import useUserInfo from "@/hooks/useUserInfo";
import { UserCardSkeleton } from "./Skeleton";

const RegisterSection: FC<{ handleClick: () => void }> = ({ handleClick }) => {
    return (
        <Suspense fallback={<Spinner />} >
            <Box textAlign="center" className="bg-white rounded-2xl shadow-lg max-w-sm p-2 mx-auto space-y-2">
                <Text size="large" bold className="text-red-600">
                    Chương trình thành viên
                </Text>
                <Text size="normal" bold className="text-gray-700">
                    Tận hưởng ngàn ưu đãi đặc quyền chỉ dành riêng cho bạn &lt;3
                </Text>
                <Button type="danger" size="medium" onClick={handleClick}>
                    Đăng ký ngay
                </Button>
            </Box >
        </Suspense >
    );
}

const UserCardContent: FC = () => {
    const { handleRegister, userData, isRegistered } = useUserInfo()
    if (!isRegistered) {
        return <RegisterSection handleClick={handleRegister} />
    }
    if (!userData) {
        return <RegisterSection handleClick={handleRegister} />
    }
    return (
        < Box className="bg-white rounded-3xl shadow-md max-w-2xl mx-auto p-5 sm:p-6" >
            <Box flex alignItems="center" justifyContent="space-between" className="gap-4 ">
                <Box flex alignItems="center" className="gap-4">
                    <Avatar backgroundColor="SKYBLUE-GREEN" size={65} src={userData.avatar}>
                        {userData.name?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Text size="large" className="font-bold text-black truncate">
                            {userData.name}
                        </Text>
                        <Text size="small" className="font-semibold text-gray-500 truncate">
                            {userData.role}
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
                            {Number(userData.totalSpending).toLocaleString("vi-VN")}đ
                        </Text>
                    </Box>
                    <Text size="xSmall" className="font-bold mt-1 text-center">
                        Lịch sử giao dịch
                    </Text>
                </Box>
            </Box>
        </Box >
    );
}

const UserCard: FC = () => {
    return (
        <Suspense fallback={<UserCardSkeleton />}>
            <UserCardContent />
        </Suspense>
    )
}

export default UserCard


