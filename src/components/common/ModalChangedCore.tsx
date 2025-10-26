import { Modal } from "zmp-ui";
import SearchArea from "../Home/SearchArea";


interface ModalChangeProps {
    visible: boolean
    onClose: () => void
}
export default function ModalChange({ visible, onClose }: ModalChangeProps) {
    return (
        <Modal
            actions={[
                {
                    close: true,
                    highLight: true,
                    text: 'Đóng'
                }
            ]}
            onClose={onClose}
            visible={visible}
        >
            <SearchArea />
        </Modal>
    )
}