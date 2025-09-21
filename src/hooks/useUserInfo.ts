import { coreData, userCached } from "@/types/userType";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/state";
import { getUserInfo, getSetting, nativeStorage } from "zmp-sdk/apis";
import { useSnackbar } from "zmp-ui";
import { addUser } from "@/firebase/firestore/userCrud"
import dayjs from "dayjs";

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
            const locaData = JSON.parse(nativeStorage.getItem("user"))
            if (locaData) {
                setRegistered(true)
                setUser(locaData)
            } else {
                setUser(newUser)
                nativeStorage.setItem("user", JSON.stringify(newUser))
                setRegistered(true)
                await addUser(coreData.id, coreData);
            }

            openSnackbar({ text: "Đăng ký thành công!", type: "success" });
        } catch (error) {
            console.error("[useUserInfo] Lỗi khi lấy userInfo từ Zalo SDK:", error);
            openSnackbar({ text: "Đã có lỗi xảy ra, hãy thử lại sau!", type: "error" });
            setUser(null)
        }
    }

    function createUserObject(zaloUserInfo: userCached) {

        const coreSave: coreData = {
            id: zaloUserInfo.id,
            name: zaloUserInfo.name,
            avatar: zaloUserInfo.avatar,
            phone: "",
            role: "Thành viên",
            totalSpending: 0,
            createAt: dayjs().toDate()
        };

        return {
            newUser: {
                ...coreSave, // lấy hết field đã có trong storedData
                dob: "",
                address: "",
                gender: "",
                favorite: "",
                isRegistered: true,
            },
            coreData: coreSave

        };
    }
    return { handleRegister, userData, isRegistered }
}


