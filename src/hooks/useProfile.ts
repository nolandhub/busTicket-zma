import { userState } from "@/state"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { nativeStorage } from "zmp-sdk"
import { useSnackbar } from "zmp-ui"

export default function useProfile() {
    const [visibleForm, setVisibleForm] = useState<boolean>(false)
    const [visiblePrivacyPolicies, setVisiblePrivacyPolicies] = useState<boolean>(false)
    const [visibleMember, setVisibleMember] = useState<boolean>(false)
    const setUserData = useSetRecoilState(userState)

    const { openSnackbar } = useSnackbar()

    function onEdit() {
        setVisibleForm(true)
    }

    function handleSave(formData) {
        try {

            nativeStorage.setItem("user", JSON.stringify(formData))
            setUserData(formData)
            openSnackbar({
                type: "success",
                text: "Cập nhật dữ liệu thành công"
            })
            setVisibleForm(false)
        } catch (error) {
            console.log(error)
            openSnackbar({
                type: "error",
                text: "Cập nhật thất bại, hãy thử lại sau"
            })
        }
    }

    function onPrivacyPolicies() {
        setVisiblePrivacyPolicies(true)
    }

    function onMemberProgram() {
        setVisibleMember(true)
    }

    return {
        visiblePrivacyPolicies, setVisiblePrivacyPolicies,
        visibleForm, setVisibleForm,
        handleSave,
        onEdit,
        onPrivacyPolicies,
        onMemberProgram,
        visibleMember, setVisibleMember

    }
}