import { createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from "react";
import { Auth } from "../config/firebase/config";

export const UsersContext = createContext();

export default function UserContextProviders({ children }) {
    const [authUser, setAuthUSer] = useState({});

    const signInGoogle = () => {
        const providerGoogle = new GoogleAuthProvider();
        signInWithPopup(Auth, providerGoogle)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                console.log(error);
            })
    }

    const logoutUser = () => {
        signOut(Auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
            setAuthUSer(currentUser)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <UsersContext.Provider value={{ authUser, signInGoogle, logoutUser }}>
            {children}
        </UsersContext.Provider>
    )
}