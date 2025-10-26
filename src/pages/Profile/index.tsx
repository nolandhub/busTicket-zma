import { Box, Page } from "zmp-ui";
import BackHeader from "@/components/common/BackHeader";
import UserCard from "@/components/common/UserCard";
import UserInfoSection from "@/components/Profile/UserInfoSection";
import PrivacyPolicies from "@/components/Profile/PrivacyPolicies";
import MembershipPolicies from "@/components/Profile/MemberProgram";
import useProfile from "@/hooks/useProfile";
import FormEditInfo from "@/components/Profile/FormEditInfo";


export default function Profile() {
    const {
        visiblePrivacyPolicies,
        setVisiblePrivacyPolicies,
        onEdit,
        onMemberProgram,
        onPrivacyPolicies,
        setVisibleForm,
        userData,
        percent,
        handleSave,
        visibleForm,
        setVisibleMember,
        visibleMember
    } = useProfile()

    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader title={"Thông tin cá nhân"} />
            <Box className="flex-1 overflow-auto mt-1 p-2">
                <UserCard />
                <UserInfoSection
                    userData={userData || null}
                    percent={percent}
                    onEdit={onEdit}
                    onMemberProgram={onMemberProgram}
                    onPrivacyPolicies={onPrivacyPolicies} />
            </Box>
            {
                <FormEditInfo
                    onClose={() => {
                        setVisibleForm(false)
                    }}
                    onSave={(formData) => handleSave(formData)}
                    userData={userData}
                    hideFormEdit={visibleForm}
                />
            }
            {
                <PrivacyPolicies
                    onClose={() => {
                        setVisiblePrivacyPolicies(false)
                    }}
                    isVisible={visiblePrivacyPolicies} />
            }
            {
                <MembershipPolicies
                    onClose={() => {
                        setVisibleMember(false)
                    }}
                    isVisible={visibleMember} />
            }
        </Page >
    );
}





