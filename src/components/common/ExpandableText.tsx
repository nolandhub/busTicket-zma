import { useState } from "react";
import { Text } from "zmp-ui";
const ExpandableText = ({ text, limit = 3 }: { text: string, limit?: number }) => {
    const words = text.split(" "); // tách thành mảng từ
    const [expanded, setExpanded] = useState(false);

    const toggle = () => setExpanded(!expanded);

    if (words.length <= limit) return <p>{text}</p>;

    return (
        <Text size="large" onClick={toggle}>
            {expanded ? text : words.slice(0, limit).join(" ") + "...."}
        </Text>
    );
};

export default ExpandableText
