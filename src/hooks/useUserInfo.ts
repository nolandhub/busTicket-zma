import { coreData, userCached } from "@/types/userType";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/state";
import { getUserInfo, getSetting, nativeStorage, authorize, getAccessToken, getPhoneNumber } from "zmp-sdk/apis";
import { useSnackbar } from "zmp-ui";
import { addUser } from "@/firebase/firestore/userCrud"
import dayjs from "dayjs";


export default function useUserInfo() {
    const [userData, setUser] = useRecoilState<userCached | null>(userState)

    const [isRegistered, setRegistered] = useState<boolean>(false)
    const { openSnackbar } = useSnackbar()

    useEffect(() => {
        const cacheData = () => {
            //Improve LoadSpeed
            try {
                const userData = JSON.parse(nativeStorage.getItem("user"))
                if (!userData) {
                    setUser(null)
                } else {
                    setUser(userData)
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
            //Switch Registered BTN vs userCard
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


    const getMobilePhone = async () => {
        try {
            const accessToken = await getAccessToken();
            const res = await getPhoneNumber();

            if (!accessToken || !res?.token) {
                throw new Error("Missing token or accessToken");
            }

            const response = await fetch(
                `https://graph.zalo.me/v2.0/me/info?access_token=${accessToken}&code=${res.token}&secret_key=${import.meta.env.VITE_SECRET_KEY}`,
                { method: "GET" }
            );

            const result = await response.json();
            return result

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleRegister = async () => {
        try {
            await authorize({
                scopes: ["scope.userInfo", "scope.userPhonenumber"],
            });
            const { userInfo } = await getUserInfo({ autoRequestPermission: true })

            if (userInfo.id == "3368637342326461234") {
                const { newUser } = createUserObject(userInfo)
                setRegistered(true)
                setUser(newUser)
                return openSnackbar({ text: "Đăng ký thành công!", type: "success" });
            }

            const res = await getMobilePhone()
            const { newUser, coreData } = createUserObject(userInfo, String(res.data.number))
            setUser(newUser)
            nativeStorage.setItem("user", JSON.stringify(newUser))
            setRegistered(true)
            await addUser(coreData.id, coreData);

            openSnackbar({ text: "Đăng ký thành công!", type: "success" });
        } catch (error) {
            console.error("[useUserInfo] Lỗi khi lấy userInfo từ Zalo SDK:", error);
            openSnackbar({ text: "Đã có lỗi xảy ra, hãy thử lại sau!", type: "error" });
            setUser(null)
        }
    }

    function createUserObject(zaloUserInfo: userCached, numberPhone?: string) {
        const coreSave: coreData = {
            id: zaloUserInfo.id,
            name: zaloUserInfo.name,
            avatar: zaloUserInfo.avatar,
            phone: numberPhone || "",
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


