import { Wallet } from "lucide-react";
import { FC, Suspense } from "react";
import { Avatar, Box, Text, Button, Spinner } from "zmp-ui";
import useUserInfo from "@/hooks/useUserInfo";
import { UserCardSkeleton } from "./Skeleton";
import { formatPrice } from "@/helper/formatPrice";

const RegisterSection: FC<{ handleClick: () => void }> = ({ handleClick }) => {
    return (
        <Suspense fallback={<Spinner />}>
            <Box textAlign="center" className="bg-white rounded-2xl shadow-lg max-w-sm p-2 mx-auto space-y-2">
                <Text size="large" bold className="text-red-600">
                    Chương trình thành viên
                </Text>
                <Text size="normal" bold className="text-gray-700">
                    Tận hưởng ngàn ưu đãi đặc quyền chỉ dành riêng cho bạn &lt;3
                </Text>
                <Button type="highlight" size="medium" onClick={handleClick}>
                    Đăng ký ngay
                </Button>
            </Box>
        </Suspense>
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
        <Box className="bg-white rounded-3xl shadow-md mx-auto p-5">
            <Box className=" flex space-x-2 gap-3">
                {/* User Info */}
                <Box flex alignItems="center" className="gap-2 flex-1 ">
                    <Avatar backgroundColor="SKYBLUE-GREEN" size={50} src={userData.avatar}>
                        {userData.name?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box className="flex-1 min-w-0">
                        <Text size="large" className="font-bold text-black truncate">
                            {userData.name}
                        </Text>
                        <Text size="small" className="font-semibold text-gray-500 truncate">
                            {userData.role}
                        </Text>
                    </Box>
                </Box>

                {/* Wallet */}
                <Box className="flex flex-col items-center">
                    <Box
                        flex
                        alignItems="center"
                        className="gap-2 bg-amber-500 text-white px-3 py-2 rounded-full max-w-[160px]"
                    >
                        <Wallet size={18} className="flex-shrink-0" />
                        <Text size="xSmall" className="font-semibold truncate">
                            {formatPrice(1020203393)}đ
                        </Text>
                    </Box>
                    <Text size="xSmall" className="font-bold mt-1 text-right whitespace-nowrap">
                        Lịch sử GD
                    </Text>
                </Box>
            </Box>
        </Box>
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
