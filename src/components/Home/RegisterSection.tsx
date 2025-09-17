
import { FC } from "react";
import { Box, Button, Text } from "zmp-ui";

interface propsRegister {
    handleClick: () => void;
};

const RegisterSection: FC<propsRegister> = ({ handleClick }) => {
    return (
        <Box textAlign="center" className="bg-white rounded-2xl shadow-lg max-w-sm p-2 mx-auto space-y-2">
            <Text size="large" bold className="text-red-600">
                Chương trình thành viên
            </Text>
            <Text size="normal" bold className="text-gray-700">
                Tận hưởng ngàn ưu đãi đặc quyền chỉ dành riêng cho bạn &lt;3
            </Text>
            <Button type="danger" onClick={handleClick}>
                Đăng ký ngay
            </Button>
        </Box >
    );
}
export default RegisterSection
