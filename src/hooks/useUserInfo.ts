import { CoreData, UserCached } from "@/types/userType";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isRegisteredState, userState } from "@/state";
import {
    getUserInfo, getSetting,
    nativeStorage, authorize,
    getAccessToken, getPhoneNumber
} from "zmp-sdk/apis";
import { useSnackbar } from "zmp-ui";
import { addUser } from "@/firebase/firestore/userCrud"

export default function useUserInfo() {
    const [userData, setUser] = useRecoilState<UserCached | null>(userState)
    const [isRegistered, setIsRegistered] = useRecoilState(isRegisteredState)
    const { openSnackbar } = useSnackbar()


    useEffect(() => {
        const init = async () => {
            try {
                //dev
                if (import.meta.env.DEV) {
                    const userCache = localStorage.getItem("user");
                    if (!userCache) {
                        setUser(null)
                        setIsRegistered(false)
                        return;
                    }
                    setIsRegistered(true)
                    setUser(JSON.parse(userCache))
                    return
                }

                //prod
                const { authSetting } = await getSetting();
                if (!authSetting["scope.userInfo"]) {
                    setUser(null)
                    return;
                }

                const userCache = nativeStorage.getItem("user");

                if (!userCache) {
                    setUser(null)
                    setIsRegistered(false)
                    return;
                }

                setUser(JSON.parse(userCache))
                setIsRegistered(true)

            } catch (error) {
                console.error("[Cache] Lỗi khi đọc nativeStorage:", error);

                setUser(null)
            }
        };
        init();
    }, []);

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
            return null
        }
    };

    const handleRegister = async () => {
        try {
            await authorize({
                scopes: ["scope.userInfo", "scope.userPhonenumber"],
            });
            const { userInfo } = await getUserInfo({ autoRequestPermission: true })

            if (import.meta.env.DEV) {
                const { newUser } = createUserObject(userInfo)
                setIsRegistered(true)
                setUser(newUser)
                nativeStorage.setItem("user", JSON.stringify(newUser))
                return openSnackbar({ text: "Developer environment, register successfully", type: "success" });
            }

            const res = await getMobilePhone()
            const phoneNumber = res?.data?.number ? String(res.data.number) : "";
            const { newUser, coreData } = createUserObject(userInfo, phoneNumber)

            setUser(newUser)
            nativeStorage.setItem("user", JSON.stringify(newUser))
            await addUser(coreData.id, coreData);

            setIsRegistered(true)
            openSnackbar({ text: "Đăng ký thành công!", type: "success" });

        } catch (error) {
            console.error("[useUserInfo] Lỗi khi lấy userInfo từ Zalo SDK:", error);
            openSnackbar({ text: "Đã có lỗi xảy ra, hãy thử lại sau!", type: "error" });
        }
    }

    function createUserObject(zaloUserInfo: UserCached, numberPhone?: string) {
        const coreSave: CoreData = {
            id: zaloUserInfo.id,
            name: zaloUserInfo.name,
            avatar: zaloUserInfo.avatar,
            phone: numberPhone || "",
            role: "Thành viên",
            totalSpending: 0,
            createAt: new Date()
        };

        return {
            newUser: {
                ...coreSave,
                dob: "",
                address: "",
                gender: "",
                favorite: "",
            },
            coreData: coreSave
        };
    }
    return { handleRegister, userData, isRegistered }
}
