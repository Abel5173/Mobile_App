import { useEffect, useState } from "react";
import { SafetyTip } from "../Utils/type";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const useFetchSafetyTip = () => {
    const [safetyTip, setSafetyTip] = useState<SafetyTip[]>([]);

    useEffect(() => {
        const snapshot = getDocs(collection(db, "tips"));
        snapshot.then((querySnapshot) => {
            const fetchedSafetyTip: SafetyTip[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const tip: SafetyTip = {
                    tipId: doc.id,
                    img: data.img,
                    title: data.title,
                    description: data.description,
                };
                fetchedSafetyTip.push(tip);
            });
            setSafetyTip(fetchedSafetyTip);
        });
    }, [safetyTip])

    return safetyTip;
}