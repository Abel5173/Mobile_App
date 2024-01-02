import { useEffect, useState } from "react";
import { SafetyTip } from "../Utils/type";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const useFetchTip = (tipId: string) => {
    const [tip, setTip] = useState<SafetyTip>();

    useEffect(() => {
        const fetchTip = async () => {
            const snapshot = await getDoc(doc(db, "tips", tipId));
            setTip(snapshot.data() as SafetyTip);
        };

        fetchTip();
    }, [tipId]);

    return tip;
};
