import { storedData, userCached } from "@/types/userInfo";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/state";
import { getUserInfo, getSetting, nativeStorage } from "zmp-sdk/apis";
import { useSnackbar } from "zmp-ui";
import callAddUser from "@/callAPI/callUserApi";

export default function useUserInfo() {
    const [userData, setUser] = useRecoilState<userCached | null>(userState)

    const [isRegistered, setRegistered] = useState<boolean>(false)
    const { openSnackbar } = useSnackbar()

    useEffect(() => {
        const cacheData = () => {
            //improve loadSpeed
            try {
                const localData = JSON.parse(nativeStorage.getItem("user"))
                if (localData == null) {
                    setUser(null)
                } else {
                    setUser(localData)
                    setRegistered(true)
                }
            } catch (error) {
                console.error("[Cache] Lỗi khi đọc localStorage:", error)
                setUser(null)
            }
        }
        cacheData()
    }, [])

    useEffect(() => {
        const checkSetting = async () => {
            //switch Registered BTN vs userCard
            try {
                const { authSetting } = await getSetting();
                if (!authSetting["scope.userInfo"]) {
                    setRegistered(false)
                    setUser(null)
                    nativeStorage.removeItem("user")
                }
            } catch (error) {
                console.log("Đã có lỗi với localStr", error)
                setRegistered(false)
                setUser(null)
            }
        }
        checkSetting()
    }, [])



    const handleRegister = async () => {

        try {
            const { userInfo } = await getUserInfo({ autoRequestPermission: true })
            const { newUser, coreData } = createUserObject(userInfo)
            setUser(newUser)
            setRegistered(true)
            await callAddUser(coreData)
            nativeStorage.setItem("user", JSON.stringify(newUser))

            openSnackbar({
                text: "Đăng ký thành công! ",
                type: "success",
            });

        } catch (error) {
            console.error("[useUserInfo] Lỗi khi lấy userInfo từ Zalo SDK:", error);
            setUser(null)
        }
    }

    function createUserObject(zaloUserInfo: userCached) {
        const coreData: storedData = {
            id: zaloUserInfo.id,
            name: zaloUserInfo.name,
            avatar: zaloUserInfo.avatar,
            phone: "",
            role: "Thành viên",
            totalSpending: 0,
        };

        return {
            newUser: {
                ...coreData, // lấy hết field đã có trong storedData
                dob: "",
                address: "",
                gender: "",
                favorite: "",
                isRegistered: true,
            },
            coreData: coreData

        };
    }
    return { handleRegister, userData, isRegistered }
}


