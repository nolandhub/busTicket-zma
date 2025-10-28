import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { Divider } from "../common/Divider";
import { BusFrontIcon, Coins, Edit } from "lucide-react";
import { Progress } from "zmp-ui";

import dayjs from "dayjs";
import { UserCached } from "@/types/userType";

interface Props {
    empty?: boolean
    label: string
    value: string
    hideDivider?: boolean
}

export const InfoSection: FC<Props> = ({ label, value, hideDivider, empty }) => {
    return (
        <>
            <div className="flex justify-between">
                <Text className="font-normal text-zinc-500">
                    {label}
                </Text>
                <Text className={`${empty ? "text-red-600 font-semibold" : "font-semibold"}`}>
                    {value}
                </Text>
            </div>
            <Divider className={`${hideDivider ? "hidden" : ""}`} size={1} />
        </>
    )
}

interface UserInfoSection {
    userData: UserCached | null,
    percent: number,
    onEdit: () => void,
    onMemberProgram: () => void,
    onPrivacyPolicies: () => void,
}

const UserInfoSection: FC<UserInfoSection> = (
    {
        userData,
        percent,
        onEdit,
        onMemberProgram,
        onPrivacyPolicies,
    }) => {

    return (
        <Box className="flex flex-col pb-20">
            <Box className="flex flex-col border-l border-b border-r border-slate-200 p-2 bg-white rounded-b-2xl shadow-md">
                <Text.Header >Thăng hạng thành viên</Text.Header>
                <Box className="mt-2">
                    <Box className="flex border border-slate-200 flex-1 items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl shadow-sm">
                        <div>
                            <BusFrontIcon
                                className="bg-green-500 text-white rounded-full p-2.5 shadow-lg"
                                size={45}
                            />
                        </div>
                        <div className="flex-1">
                            <Progress
                                trailColor="#e5e7eb"
                                strokeColor="#84cc16"
                                strokeWidth={8}
                                completed={percent}
                                maxCompleted={100}
                            />
                        </div>
                        <div>
                            <Coins
                                className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-full p-2.5 shadow-lg"
                                size={45}
                            />
                        </div>
                    </Box>
                    <Box className="flex mt-2 mb-1 justify-between items-center">
                        <Box>
                            <Text.Title className="ml-2">Member</Text.Title>
                            <Text className="ml-4 font-medium text-slate-600">0-699k</Text>
                        </Box>
                        <Box>
                            <Text.Title className="ml-2">Silver</Text.Title>
                            <Text className="mr-2 font-medium text-slate-600">Trên 700k</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className="mt-4 p-2 bg-white rounded-md shadow-md border border-slate-300">
                <Text onClick={onMemberProgram} className="cursor-pointer font-semibold py-2 p-2">
                    Chính sách chương trình thành viên</Text>
                <Divider className="border border-slate-100 " size={1} />
                <Text onClick={onPrivacyPolicies} className="cursor-pointer font-semibold py-2 p-2">
                    Chính sách bảo mật</Text>
            </Box>

            {/* Update Info */}
            <Box className="flex justify-between p-2 mt-4">
                <Text.Header>Tài Khoản</Text.Header>
                <Box onClick={onEdit} className="cursor-pointer flex py-1 space-x-2 rounded-md hover:bg-slate-200">
                    <Edit />
                    <Text bold>Cập nhật</Text>
                </Box>
            </Box>

            <Box className="p-4 space-y-4 bg-white rounded-lg border border-slate-300 shadow-md">
                <InfoSection label={"Họ tên"} value={userData?.name || "--"} />
                <InfoSection label={"Giới tính"} value={userData?.gender || "--"} />
                <InfoSection label={"Ngày sinh"} value={userData?.dob ? dayjs(userData?.dob).format('DD/MM/YYYY') : "--"} />
                <InfoSection label={"Điện thoại"} value={userData?.phone || "--"} />
                <InfoSection label={"Địa chỉ"} value={userData?.address || "--"} />
                <InfoSection hideDivider={true} label={"Nhà xe yêu thích"} value={userData?.favorite || "--"} />
            </Box>
        </Box >
    )
}

export default UserInfoSection
