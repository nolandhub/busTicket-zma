import { Box } from "zmp-ui";
import UserCard from "../common/UserCard";
import UserInfoSection from "./UserInfo";
import useProfile from "@/hooks/useProfile";
import FormEditInfo from "./FormEditInfo";
import PrivacyPolicies from "./PrivacyPolicies";
import MembershipPolicies from "./MemberProgram";

export default function ProfileContent() {
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
        <>
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
        </>
    )
}