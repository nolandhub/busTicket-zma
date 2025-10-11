import { useState } from "react";
import { Box, Icon, Input, Text } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "@/state";


const Info = () => {
    const userInfo = useRecoilValue(userState)
    const [name, setName] = useState(userInfo?.name || "")
    const [phone, setPhone] = useState(userInfo?.phone || "")

    return (
        <Box className="flex-1 p-2 bg-white rounded-lg">
            <Box className="flex flex-col gap-2 ">
                <Text bold size="xLarge" className="text-center">Thông tin</Text>
                <Input
                    prefix={<Box pl={4}><Icon icon="zi-info-circle" /></Box>}
                    clearable={{ mode: 'focus' }}
                    label="Tên người đi"
                    value={name}
                    onChange={(n) => setName(n.target.value)}
                />
                <Input
                    prefix={<Box pl={4}><Icon icon="zi-call" /></Box>}
                    clearable={{ mode: 'focus' }}
                    label="Số điện thoại"
                    value={phone}
                    onChange={(p) => setPhone(p.target.value)}
                />
            </Box>
        </Box>
    )
}

export default Info