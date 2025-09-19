// import { Picker } from "zmp-ui";
// import { OptionValueType, PickerColumnOption } from "zmp-ui/picker";



// interface Props {
//     icon: React.ReactNode;
//     tittle: string;
//     value: OptionValueType;
//     placeholder: string;
//     onChange: (value: { [name: string]: PickerColumnOption }) => void
// }



// const InputPicker = ({ icon, tittle, value, placeholder, onChange }: Props) => {
//     return (
//         <div className="flex items-center gap-2">
//             {icon}
//             <Picker
//                 action={{
//                     close: true,
//                     text: 'Đóng'
//                 }}
//                 data={[
//                     {
//                         name: 'suggestions',
//                         options: [
//                             { displayName: "Sân Bay Tân Sơn Nhất", value: "tansonnhat" },
//                             { displayName: "Sài Gòn", value: "saigon" },
//                             { displayName: "Hà Nội", value: "hanoi" },
//                             { displayName: "Đà Lạt", value: "dalat" },
//                             { displayName: "Vũng Tàu", value: "vungtau" },
//                             { displayName: "Nha Trang", value: "nhatrang" },
//                             { displayName: "Bình Dương", value: "binhduong" },
//                             { displayName: "Sapa", value: "sapa" },
//                             { displayName: "Lào Cai", value: "laocai" },
//                             { displayName: "Kon Tum", value: "kontum" },
//                             { displayName: "Ninh Hòa", value: "ninhhoa" },
//                             { displayName: "Bến Cát", value: "bencat" },
//                             { displayName: "Cam Ranh", value: "camranh" },
//                             { displayName: "Tuy Hòa", value: "tuyhoa" },
//                             { displayName: "Hội An", value: "hoian" },
//                             { displayName: "Đà Nẵng", value: "danang" },
//                             { displayName: "Huế", value: "hue" },
//                             { displayName: "Cà Mau", value: "camau" },
//                             { displayName: "Cần Thơ", value: "cantho" },
//                             { displayName: "Mũi Né", value: "muine" },
//                             { displayName: "Phan Thiết", value: "phanthiet" },
//                             { displayName: "Ninh Thuận", value: "ninhthuan" },
//                             { displayName: "Mộc Châu", value: "mocchau" }
//                         ]
//                     }
//                 ]}
//                 mask
//                 maskClosable
//                 title={tittle}
//                 value={{ suggestions: value }}
//                 placeholder={placeholder}
//                 onChange={onChange}
//             />

//         </div>

//     )

// }

// export default InputPicker



import { Picker, Box } from "zmp-ui";
import { OptionValueType, PickerColumnOption } from "zmp-ui/picker";

interface Props {
    icon: React.ReactNode;
    tittle: string;
    value: OptionValueType;
    placeholder: string;
    onChange: (value: { [name: string]: PickerColumnOption }) => void;
}

const InputPicker = ({ icon, tittle, value, placeholder, onChange }: Props) => {
    return (
        <Box className="flex items-center gap-2 w-full">
            {icon}
            <Picker
                title={tittle}
                placeholder={placeholder}
                value={{ suggestions: value }}
                onChange={onChange}
                mask
                maskClosable
                action={{ close: true, text: "Đóng" }}
                data={[
                    {
                        name: "suggestions",
                        options: [
                            { displayName: "Sân Bay Tân Sơn Nhất", value: "tansonnhat" },
                            { displayName: "Sài Gòn", value: "saigon" },
                            { displayName: "Hà Nội", value: "hanoi" },
                            { displayName: "Đà Lạt", value: "dalat" },
                            { displayName: "Vũng Tàu", value: "vungtau" },
                            { displayName: "Nha Trang", value: "nhatrang" },
                            { displayName: "Bình Dương", value: "binhduong" },
                            { displayName: "Sapa", value: "sapa" },
                            { displayName: "Lào Cai", value: "laocai" },
                            { displayName: "Kon Tum", value: "kontum" },
                            { displayName: "Ninh Hòa", value: "ninhhoa" },
                            { displayName: "Bến Cát", value: "bencat" },
                            { displayName: "Cam Ranh", value: "camranh" },
                            { displayName: "Tuy Hòa", value: "tuyhoa" },
                            { displayName: "Hội An", value: "hoian" },
                            { displayName: "Đà Nẵng", value: "danang" },
                            { displayName: "Huế", value: "hue" },
                            { displayName: "Cà Mau", value: "camau" },
                            { displayName: "Cần Thơ", value: "cantho" },
                            { displayName: "Mũi Né", value: "muine" },
                            { displayName: "Phan Thiết", value: "phanthiet" },
                            { displayName: "Ninh Thuận", value: "ninhthuan" },
                            { displayName: "Mộc Châu", value: "mocchau" },
                        ],
                    },
                ]}
            />
        </Box>
    );
};

export default InputPicker;



