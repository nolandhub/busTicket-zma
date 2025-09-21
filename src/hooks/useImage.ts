import { useState, useEffect } from "react";

export default function useImage(src: string) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        const img = new Image();
        img.src = src;
        img.onload = () => mounted && setLoaded(true);

        return () => {
            mounted = false; // cleanup để tránh update khi unmount
        };
    }, [src]);

    return { loaded, src };
}
