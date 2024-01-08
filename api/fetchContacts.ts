import { getAuth } from 'firebase/auth';
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    getDoc,
    Firestore,
    onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ContactItems } from '../Utils/type';


export const useFetchContacts = (): ContactItems[] => {
    const [contacts, setContacts] = useState<ContactItems[]>([]);
    const user = getAuth().currentUser;
    if (user) {
        const q = query(
            collection(db as Firestore, "users"),
            where("uid", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedContacts: ContactItems[] = [];
            querySnapshot.forEach((doc) => {
                const id = doc.id;
                const data = doc.data();
                const contactsData = data?.contacts || [];
                updatedContacts.push(...contactsData);
            });
            setContacts(updatedContacts);
        });

        // return () => {
        //     unsubscribe();
        // };
    } else {
        console.warn("User not signed in");
    }

    return contacts;
};
