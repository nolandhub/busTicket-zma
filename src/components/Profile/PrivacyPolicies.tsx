import { FC } from "react";
import { Box, Sheet, Text } from "zmp-ui";

const PrivacyPolicies: FC<{ isVisible?: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
    return (
        <Sheet
            title="CHÍNH SÁCH BẢO MẬT"
            visible={isVisible}
            onClose={onClose}
            zIndex={1200}
        >
            <Box className="p-4 space-y-5 overflow-y-auto max-h-[60vh] leading-relaxed text-gray-700">

                {/* Giới thiệu */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">I. Giới thiệu</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Đại diện {<strong>ProbusVN Vé Xe Limousine</strong>} cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng (“khách hàng”).</li>
                        <li>Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân trong quá trình cung cấp dịch vụ đặt vé xe trực tuyến.</li>
                    </ul>
                </Box>

                {/* Mục đích và phạm vi thu thập */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">II. Mục đích và phạm vi thu thập thông tin</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Cung cấp dịch vụ đặt vé, xác nhận giao dịch và hỗ trợ khách hàng.</li>
                        <li>Gửi thông báo về tình trạng vé, khuyến mãi (nếu người dùng đồng ý).</li>
                        <li>Phân tích hành vi sử dụng để cải thiện chất lượng dịch vụ.</li>
                        <li>Thông tin được thu thập gồm: họ tên, số điện thoại, email, thông tin thanh toán (không lưu thông tin thẻ), và dữ liệu truy cập như địa chỉ IP, thiết bị.</li>
                    </ul>
                </Box>

                {/* Phạm vi sử dụng */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">III. Phạm vi sử dụng thông tin</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Xử lý, xác nhận giao dịch và gửi thông tin hành trình.</li>
                        <li>Hỗ trợ kỹ thuật, chăm sóc khách hàng và phản hồi yêu cầu.</li>
                        <li>Nâng cao chất lượng và độ an toàn của dịch vụ.</li>
                        <li>Phát hiện, ngăn chặn các hành vi gian lận hoặc vi phạm điều khoản sử dụng.</li>
                    </ul>
                </Box>

                {/* Thời gian lưu trữ */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">IV. Thời gian lưu trữ thông tin</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Thông tin được lưu trong suốt thời gian người dùng duy trì tài khoản hoặc khi cần thiết để hoàn thành các mục đích đã nêu.</li>
                        <li>Khi người dùng yêu cầu xóa tài khoản, dữ liệu sẽ được xóa khỏi hệ thống sau tối đa 90 ngày (trừ trường hợp pháp luật yêu cầu giữ lại lâu hơn).</li>
                    </ul>
                </Box>

                {/* Bảo mật thông tin */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">V. Bảo mật và bảo vệ thông tin cá nhân</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Mã hóa dữ liệu trong quá trình truyền tải và lưu trữ.</li>
                        <li>Giới hạn quyền truy cập chỉ cho nhân viên có thẩm quyền.</li>
                        <li>Sao lưu định kỳ và giám sát hệ thống an ninh.</li>
                        <li>Cập nhật và nâng cấp các biện pháp bảo mật thường xuyên.</li>
                        <li>Người dùng nên bảo mật thông tin đăng nhập và không chia sẻ cho người khác.</li>
                    </ul>
                </Box>

                {/* Chia sẻ thông tin */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">VI. Chia sẻ thông tin với bên thứ ba</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Không chia sẻ hoặc bán thông tin cá nhân cho bên thứ ba nếu không có sự đồng ý của người dùng.</li>
                        <li>Chỉ chia sẻ khi cần thiết để thực hiện dịch vụ (ví dụ: đối tác vận chuyển, thanh toán).</li>
                        <li>Cung cấp thông tin theo yêu cầu hợp pháp của cơ quan có thẩm quyền.</li>
                    </ul>
                </Box>

                {/* Quyền và nghĩa vụ */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">VII. Quyền và nghĩa vụ của người dùng</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Người dùng có quyền kiểm tra, chỉnh sửa, hoặc yêu cầu xóa thông tin cá nhân.</li>
                        <li>Có thể yêu cầu ngừng nhận thông báo quảng cáo.</li>
                        <li>Cung cấp thông tin chính xác, đầy đủ khi đăng ký và đặt vé.</li>
                        <li>Tự chịu trách nhiệm bảo mật tài khoản cá nhân.</li>
                    </ul>
                </Box>

                {/* Liên hệ */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">VIII. Liên hệ và hỗ trợ</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Email: support@miniap-vexe.vn</li>
                        <li>Hotline: 1900 1234</li>
                        <li>Địa chỉ: Tầng 5, Tòa nhà ABC, Đà Nẵng, Việt Nam</li>
                    </ul>
                </Box>

                {/* Thay đổi chính sách */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">IX. Thay đổi chính sách</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Chính sách bảo mật có thể được cập nhật theo thời gian.</li>
                        <li>Mọi thay đổi sẽ được thông báo công khai trên ứng dụng hoặc qua email trước khi có hiệu lực.</li>
                        <li>Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc người dùng đã đồng ý với các nội dung cập nhật.</li>
                    </ul>
                </Box>

            </Box>
        </Sheet>
    );
};

export default PrivacyPolicies;
