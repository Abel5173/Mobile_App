import { addDoc, collection } from 'firebase/firestore';
import { getAuth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email: string, password: string) => {
    try{
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        return token;
    } catch (error: any) {
        console.log(error);
    }
}

// export const signup = async (user: User, password: string) => {
//     try{
//         const auth = getAuth();
//         const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);

//         // Add user to Firestore
//         const docref = await addDoc(collection(firebaseDb, 'users'), {
//             name: user.name,
//             email: user.email,
//             date: user.dob,
//             password: password,
//             phoneNumber: user.phoneNumber
//         })
//         const token = await userCredential.user.getIdToken();
//         return token;
//     } catch (error: any) {
//         console.log(error);
//     }
// }