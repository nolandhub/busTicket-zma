import { FC } from "react";
import { Box, Sheet, Text } from "zmp-ui";

const MembershipPolicies: FC<{ isVisible?: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
    return (
        <Sheet
            title="CHÍNH SÁCH CHƯƠNG TRÌNH THÀNH VIÊN"
            visible={isVisible}
            onClose={onClose}
            zIndex={1200}
        >
            <Box className="p-4 space-y-5 overflow-y-auto max-h-[60vh] leading-relaxed text-gray-700">

                {/* Giới thiệu */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">I. Giới thiệu</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Chương trình thành viên được xây dựng nhằm tri ân khách hàng đã tin tưởng và sử dụng Mini App bán vé xe.</li>
                        <li>Chính sách này quy định quyền lợi, nghĩa vụ và điều kiện khi tham gia chương trình.</li>
                    </ul>
                </Box>

                {/* Điều kiện tham gia */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">II. Điều kiện tham gia</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Mọi khách hàng đăng ký tài khoản hợp lệ trên mini app đều có thể tham gia chương trình.</li>
                        <li>Khách hàng cần cung cấp thông tin chính xác (họ tên, số điện thoại, email) để xác thực quyền lợi.</li>
                        <li>Mỗi người dùng chỉ được sở hữu một tài khoản thành viên duy nhất.</li>
                    </ul>
                </Box>

                {/* Cấp bậc thành viên */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">III. Cấp bậc thành viên</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Chương trình có nhiều cấp bậc (ví dụ: Thành viên, Bạc, Vàng, Kim Cương) dựa trên tổng số tiền hoặc số lượng vé đặt trong năm.</li>
                        <li>Cấp bậc được xét tự động và cập nhật định kỳ dựa trên lịch sử giao dịch.</li>
                        <li>Mỗi cấp bậc mang lại các quyền lợi khác nhau như ưu đãi, tích điểm, hoặc quà tặng sinh nhật.</li>
                    </ul>
                </Box>

                {/* Quyền lợi thành viên */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">IV. Quyền lợi của thành viên</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Tích lũy điểm thưởng cho mỗi giao dịch đặt vé thành công.</li>
                        <li>Được nhận mã giảm giá, ưu đãi đặc biệt theo cấp bậc.</li>
                        <li>Được tham gia các chương trình dành riêng cho thành viên (sự kiện, ưu tiên hỗ trợ, quà tặng... ).</li>
                        <li>Điểm thưởng có thể được quy đổi sang mã giảm giá hoặc phần quà theo quy định hiện hành.</li>
                    </ul>
                </Box>

                {/* Quy định sử dụng điểm */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">V. Quy định về điểm thưởng</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Điểm thưởng không có giá trị quy đổi thành tiền mặt.</li>
                        <li>Điểm có thể hết hạn sau một khoảng thời gian nhất định (ví dụ: 12 tháng kể từ ngày phát sinh).</li>
                        <li>Trong trường hợp hủy vé hoặc hoàn tiền, điểm tích lũy tương ứng sẽ bị trừ lại.</li>
                    </ul>
                </Box>

                {/* Nghĩa vụ và trách nhiệm */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">VI. Nghĩa vụ và trách nhiệm của thành viên</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Bảo mật tài khoản và không chia sẻ thông tin đăng nhập cho người khác.</li>
                        <li>Không được gian lận, lợi dụng chương trình để trục lợi cá nhân.</li>
                        <li>Tuân thủ đầy đủ các quy định, điều khoản của mini app.</li>
                    </ul>
                </Box>

                {/* Hủy hoặc chấm dứt quyền lợi */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">VII. Hủy hoặc chấm dứt quyền lợi</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Chúng tôi có quyền tạm dừng hoặc hủy quyền lợi thành viên nếu phát hiện hành vi gian lận hoặc vi phạm điều khoản.</li>
                        <li>Điểm tích lũy và ưu đãi chưa sử dụng sẽ bị hủy nếu tài khoản bị khóa hoặc xóa.</li>
                    </ul>
                </Box>

                {/* Thay đổi chính sách */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">VIII. Thay đổi chính sách</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Mini App có thể điều chỉnh nội dung chương trình thành viên theo từng giai đoạn.</li>
                        <li>Mọi thay đổi sẽ được thông báo công khai trên ứng dụng hoặc qua email.</li>
                        <li>Việc tiếp tục sử dụng dịch vụ được hiểu là khách hàng đồng ý với các thay đổi mới.</li>
                    </ul>
                </Box>

                {/* Liên hệ */}
                <Box>
                    <Text className="font-bold text-green-600 text-base mb-1">IX. Liên hệ và hỗ trợ</Text>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Email: support@miniap-vexe.vn</li>
                        <li>Hotline: 1900 1234</li>
                        <li>Địa chỉ: Tầng 5, Tòa nhà ABC, Đà Nẵng, Việt Nam</li>
                    </ul>
                </Box>

            </Box>
        </Sheet>
    );
};

export default MembershipPolicies;
