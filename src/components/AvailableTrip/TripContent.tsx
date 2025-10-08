import { Box, Text, useSnackbar } from "zmp-ui"
import { FC, useState } from "react"
import { Heart } from "lucide-react"




const TripContent: FC<{ avatar?: string, compName: string, busName: string, onImgClick?: () => void }> = ({ avatar, busName, compName, onImgClick }) => {
    const [liked, setLiked] = useState<boolean>(false)
    const { openSnackbar } = useSnackbar()
    return (
        <Box className="flex flex-row items-start">
            <div className="flex-shrink-0">
                <img onClick={onImgClick} className="h-[80px] w-[80px] object-cover rounded-xl cursor-pointer" src={avatar ? avatar : "https://picsum.photos/200/303"} />
            </div>

            <div className="flex-1 flex-col p-2">
                <Text className="text-lg font-bold">{compName}</Text>
                <Text className="text-sm font-normal">{busName} </Text>
            </div>
            <Heart
                size={20}
                className={`mt-4 cursor-pointer ${liked ? "text-red-500 fill-red-500" : "text-gray-500"
                    }`}
                onClick={handleClick}
            />
        </Box>
    )

    function handleClick() {
        if (!liked) {
            openSnackbar({
                text: "Bạn đã yêu thích nhà xe",
            });
        }
        setLiked(!liked)
    }
}

export default TripContent

