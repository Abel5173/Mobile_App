import { firebaseDb } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const addUserToFirestore = async (user: User) => {
    try {
        const dcoref = await addDoc(collection(firebaseDb, 'users'), {
            name: user.name,
            email: user.email,
            dob: user.dob,
            phoneNumber: user.phoneNumber
        })
        console.log('User added to Firestore!');
    } catch (error) {
        console.error('Error adding user to Firestore: ', error);
    }
};

export default addUserToFirestore;
