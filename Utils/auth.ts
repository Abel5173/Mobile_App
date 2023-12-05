import auth from '@react-native-firebase/auth';
type Auth = {
    signUp: (email: string, password: string) => void;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
};
const signUp: Auth['signUp'] = async (email, password) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        console.error(error);
    }
};

const signIn: Auth['signIn'] = async (email, password) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error(error);
    }
};

const signOut:Auth['signOut'] = async () => {
    try {
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }
};
