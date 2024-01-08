import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const auth = getAuth();
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);

    if (userCredential?.user) {
      const token = await userCredential.user.getIdToken();
      return token;
    } else {
      console.error('Authentication error: User information not available.');
      return null;
    }
  } catch (error: any) {
    alert("Sign in failed. Check your email or password and try again.");
    return null;
  }
};
