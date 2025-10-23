import { userState } from "@/state";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { Box, Text } from "zmp-ui";
import { Divider } from "../common/Divider";
import { BusFrontIcon, Coins, Edit } from "lucide-react";
import { Progress } from "zmp-ui";
import useProfile from "@/hooks/useProfile";
import FormEditInfo from "./FormEditInfo";
import dayjs from "dayjs";
import PrivacyPolicies from "./PrivacyPolicies";
import MembershipPolicies from "./MemberProgram";

interface Props {
    label: string
    value: string
    hideDivider?: boolean
}

const InfoSection: FC<Props> = ({ label, value, hideDivider }) => {
    return (
        <>
            <div className="flex justify-between">
                <Text className="font-normal text-zinc-500">
                    {label}
                </Text>
                <Text className="font-semibold">
                    {value}
                </Text>
            </div>
            <Divider className={`${hideDivider ? "hidden" : ""}`} size={1} />
        </>
    )
}

const UserInfoSection = () => {
    const userData = useRecoilValue(userState)
    const {
        onEdit,
        onMemberProgram,
        onPrivacyPolicies,
        visibleForm,
        setVisibleForm,
        visiblePrivacyPolicies, setVisiblePrivacyPolicies,
        handleSave,
        visibleMember, setVisibleMember,
    } = useProfile()

    return (
        <Box className="flex flex-col rounded-lg pb-14">
            <Box className="flex flex-col p-2 bg-white rounded-b-3xl">
                <Text.Header className="">Thăng hạng thành viên</Text.Header>
                <Box className="mt-2">
                    <Box className="flex flex-1 items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl shadow-sm">
                        <div >
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
                                completed={70}
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

            <Box className="mt-4 p-2 bg-white rounded-md">
                <Text onClick={onMemberProgram} className="cursor-pointer font-semibold py-2 p-2">Chính sách chương trình thành viên</Text>
                <Divider className="border border-slate-100" size={1} />
                <Text onClick={onPrivacyPolicies} className="cursor-pointer font-semibold py-2 p-2">Chính sách bảo mật</Text>
            </Box>

            <Box className="flex justify-between p-2 mt-4">
                <Text.Header>Tài Khoản</Text.Header>
                <Box onClick={onEdit} className="cursor-pointer flex py-1 space-x-2 rounded-md hover:bg-slate-200">
                    <Edit />
                    <Text bold>Cập nhật</Text>
                </Box>
            </Box>

            <Box className="p-4 space-y-4 bg-white">
                <InfoSection label={"Họ tên"} value={userData?.name || "--"} />
                <InfoSection label={"Giới tính"} value={userData?.gender || "--"} />
                <InfoSection label={"Ngày sinh"} value={userData?.dob ? dayjs(userData?.dob).format('DD/MM/YYYY') : "--"} />
                <InfoSection label={"Điện thoại"} value={userData?.phone || "--"} />
                <InfoSection label={"Địa chỉ"} value={userData?.address || "--"} />
                <InfoSection hideDivider={true} label={"Nhà xe yêu thích"} value={userData?.favorite || "--"} />
            </Box>
            {
                (visibleForm && <FormEditInfo
                    onClose={() => setVisibleForm(false)}
                    onSave={(formData) => handleSave(formData)}
                    userData={userData}
                />)
            }
            {
                <PrivacyPolicies onClose={() => setVisiblePrivacyPolicies(false)} isVisible={visiblePrivacyPolicies} />
            }
            {
                <MembershipPolicies onClose={() => setVisibleMember(false)} isVisible={visibleMember} />
            }
        </Box >
    )
}

export default UserInfoSection
