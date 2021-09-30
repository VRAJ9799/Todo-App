import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../firebaseConfig";

export const AuthContext = createContext(undefined);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) setUser(user);
            else setUser(null);
        });
        return unsubscribe;
    }, []);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    const value = {
        user,
        signUp,
        login,
        logout,
        resetPassword,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
