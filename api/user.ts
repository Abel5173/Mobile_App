import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

export const login = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const id = userCredential.user.uid;
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error: any) {
    console.log(error);
  }
};
