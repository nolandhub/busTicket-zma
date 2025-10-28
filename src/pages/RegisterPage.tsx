import { FC } from "react";
import { Box, Button, Page, Text } from "zmp-ui";
import { ShieldCheck } from "lucide-react";

const RegisterPage: FC<{ onRegister: () => void }> = ({ onRegister }) => {
    return (
        <Page className="flex-1 flex items-center h-[95vh] p-4 justify-center bg-green-500">
            <Box className="bg-white p-4 rounded-lg">
                <Box className="flex flex-col gap-4 items-center justify-center">
                    <ShieldCheck
                        size={36}
                        color="green"
                        strokeWidth={2}
                    />
                    <Text className="font-medium text-center">
                        ProbusVN Vé Xe Limousine muốn truy cập thông tin của bạn
                    </Text>
                    <Text>
                        Thông tin người dùng, ảnh đại diện để xác thực và truy cập các tính năng của Zalo (bắt buộc)
                    </Text>
                    <Text>
                        Số điện thoại của bạn để xác thực, liên lạc và thông báo về chuyến đi
                    </Text>
                    <Button onClick={onRegister}>
                        Tôi đồng ý
                    </Button>
                </Box>

            </Box>
        </Page>
    );
};

export default RegisterPage;