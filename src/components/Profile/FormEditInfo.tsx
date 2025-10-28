import { UserCached } from "@/types/userType";
import { FC, useState } from "react"
import { Box, Button, DatePicker, Input, Select, Sheet } from "zmp-ui";

interface Props {
    userData: UserCached | null
    hideFormEdit?: boolean
    onClose: () => void
    onSave: (formData: any) => void
}
const FormEditInfo: FC<Props> = ({ userData, onClose, onSave, hideFormEdit }) => {

    const [formData, setFormData] = useState({
        ...userData,
        name: userData?.name || '',
        gender: userData?.gender || 'Khác',
        dob: userData?.dob || '',
        phone: userData?.phone || '',
        address: userData?.address || '',
        favorite: userData?.favorite || ''
    });


    const handleSubmit = () => {
        onSave(formData);
    };


    function translateGenderToNumber(val: string | number) {
        switch (val) {
            case 0: return "Nam"
            case 1: return "Nữ"
            case 2: return "Khác"
            case "Nam": return 0
            case "Nữ": return 1
            case "Khác": return 2
            default: return typeof val === 'number' ? "Khác" : 2
        }
    }

    return (
        <Sheet
            title="Cập nhật thông tin"
            visible={hideFormEdit}
            onClose={onClose}
        >
            <Box
                className="custom-bottom-sheet h-[560px]"
                flex
                flexDirection="column"
                p={2}
            >
                <Box
                    className="bottom-sheet-body flex flex-col p-4 space-y-4"
                    style={{
                        overflowY: 'auto'
                    }}
                >

                    <Input
                        clearable={{ mode: "focus" }}
                        helperText="Vui lòng nhập tên của bạn"
                        label="Họ tên"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <Input
                        clearable={{ mode: "focus" }}
                        helperText="Vui lòng nhập số điện thoại của bạn"
                        label="Điện thoại"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />

                    <Select
                        helperText="Chọn giới tính của bạn"
                        label="Giới tính"
                        placeholder="Chọn giới tính"
                        value={translateGenderToNumber(formData.gender)}
                        onChange={(value) => {
                            const genderString = translateGenderToNumber(Number(value)) as string;
                            setFormData({ ...formData, gender: genderString });
                        }} closeOnSelect
                    >
                        <Select.Option title="Nam" value={0} />
                        <Select.Option title="Nữ" value={1} />
                        <Select.Option title="Khác" value={2} />
                    </Select>

                    <DatePicker

                        endYear={Number(new Date().getFullYear)}
                        endDate={new Date()}
                        label="Ngày sinh"
                        helperText="Chọn ngày sinh"
                        value={new Date(formData.dob) || new Date()}
                        onChange={(value) => setFormData({ ...formData, dob: String(value) })}
                    />

                    <Input
                        clearable={{ mode: "focus" }}
                        helperText="Vui lòng nhập địa chỉ"
                        label="Địa chỉ"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />

                    <Input
                        clearable={{ mode: "focus" }}
                        helperText="Nhập tên nhà xe yêu thích"
                        label="Nhà xe yêu thích"
                        value={formData.favorite}
                        onChange={(e) => setFormData({ ...formData, favorite: e.target.value })}
                    />

                    <Box
                        className="flex flex-row gap-6 pb-14">
                        <Button

                            onClick={onClose}
                            fullWidth
                            variant="secondary"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            fullWidth>
                            Cập nhật
                        </Button>

                    </Box>


                </Box>

            </Box>
        </Sheet>
    )
}


export default FormEditInfo