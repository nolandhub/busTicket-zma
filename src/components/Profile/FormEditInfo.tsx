import { UserCached } from "@/types/userType";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react"
import { DatePicker, Input, Select } from "zmp-ui";


interface Props {
    userData: UserCached | null
    onClose: () => void
    onSave: (formData: any) => void
}
const FormEditInfo: FC<Props> = ({ userData, onClose, onSave }) => {

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Chỉnh sửa thông tin</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <Input
                            clearable={{ mode: "focus" }}
                            helperText="Vui lòng nhập tên của bạn"
                            label="Họ tên"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <Input
                            clearable={{ mode: "focus" }}
                            helperText="Vui lòng nhập số điện thoại của bạn"
                            label="Điện thoại"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
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
                    </div>

                    <div>
                        <DatePicker
                            endYear={Number(new Date().getFullYear)}
                            endDate={new Date()}
                            label="Ngày sinh"
                            helperText="Chọn ngày sinh"
                            value={new Date(formData.dob) || new Date()}
                            onChange={(value) => setFormData({ ...formData, dob: String(value) })}
                        />
                    </div>

                    <div>
                        <Input
                            clearable={{ mode: "focus" }}
                            helperText="Vui lòng nhập địa chỉ"
                            label="Địa chỉ"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div>
                        <Input
                            clearable={{ mode: "focus" }}
                            helperText="Nhập tên nhà xe yêu thích"
                            label="Nhà xe yêu thích"
                            value={formData.favorite}
                            onChange={(e) => setFormData({ ...formData, favorite: e.target.value })}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-2 p-4 border-t">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    )

}


export default FormEditInfo