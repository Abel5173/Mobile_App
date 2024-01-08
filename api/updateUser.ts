import { User, getAuth, updateProfile } from "firebase/auth"
// import User from "../Utils/type"

const auth = getAuth();
function update(user: User) {
    const currentUser = auth.currentUser;
    if(currentUser) {
        updateProfile(currentUser, {
            displayName: "Jane Q. User",
            // phoneNumber: '09123456789',

        }).then(() => {
            console.log('User updated!');
        }).catch((error) => {
            console.log('Error updating user: ', error);
        })
    }

}