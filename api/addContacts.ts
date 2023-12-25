// firebaseUtils.js
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, updateDoc, arrayUnion, query, where, getDoc } from "firebase/firestore";
import { ContactItem } from "../Utils/type";

export const fetchUserContacts = async () => {
    const user = getAuth().currentUser;
    if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
            const id = querySnapshot.docs[0].id;
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data().contacts || [];
            }
        }
    } else {
        console.warn("User not signed in");
    }
    return [];
};
export const addContact = async (contactInfo: ContactItem) => {
    const user = getAuth().currentUser;
    if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const id = querySnapshot.docs[0].id;
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
            contacts: arrayUnion(contactInfo),
        });
        console.log("Contact added successfully");
    } else {
        console.warn("User not signed in");
    }
};
