
import { FC } from "react";
import { Box, Tabs } from "zmp-ui";
import { ImageViewer } from "zmp-ui";
import { useState } from "react";


const ImgSlide: FC<{ isVisible: boolean, handleClose: () => void }> = ({ isVisible, handleClose }) => {
    return (
        <ImageViewer
            images={[
                {
                    alt: "Ảnh 1",
                    src: "https://picsum.photos/id/1035/800/600",
                },
                {
                    alt: "Ảnh 2",
                    src: "https://picsum.photos/id/1015/800/600",
                },
                {
                    alt: "Ảnh 3",
                    src: "https://picsum.photos/id/1025/800/600",
                },
            ]}
            maskStyle={{
                backgroundImage: 'url(\'https://picsum.photos/id/1035/800/600\')',
                filter: 'blur(10px)'
            }}
            activeIndex={0} // bắt đầu hiển thị từ ảnh số 0
            onClose={handleClose}
            visible={isVisible}
        />
    );
}


const TabView = () => {
    const tabInfo = [
        { id: "img", name: "Hình ảnh" },
        { id: "move", name: "Đón/ Trả" },
        { id: "warn", name: "Lưu ý" },
    ];
    const [visible, setVisible] = useState<boolean>(true)
    const [activeKey, setActiveKey] = useState<string>("null")

    const handleActive = (key) => {
        if (key === "img") {
            setActiveKey(key)
            setVisible(true)
        } else {
            setActiveKey(key)
        }
    }

    return (
        <>
            <Tabs defaultActiveKey={"warn"} onTabClick={(key) => handleActive(key)} >
                {tabInfo.map((cat) => (
                    <Tabs.Tab key={cat.id} label={cat.name}>
                    </Tabs.Tab>
                ))}
            </Tabs>

            {activeKey === "img" && (
                <ImgSlide isVisible={visible} handleClose={() => setVisible(false)} />
            )}

            {activeKey === "warn" && (
                <Box className="p-4">
                    Đây là phần lưu ý, bạn có thể viết text hoặc format tùy ý.
                </Box>
            )}
            {activeKey === "move" && (
                <Box className="p-4">
                    Đây là phần lưu ý, bạn có thể viết text hoặc format tùy ý.
                    Đây là phần lưu ý, bạn có thể viết text hoặc format tùy ý.
                </Box>
            )}

        </>
    );
};

export default TabView