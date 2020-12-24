import React, { useContext, useEffect, useState } from 'react';
import { auth as firebaseAuth } from './firebase';

interface Auth {
    loggedIn: boolean;
    userId?: string
}

interface AuthInit {
    loading: boolean;
    auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth() : Auth {
    return useContext(AuthContext);
}

export function useAuthInit() : AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({loading: true});
    useEffect(() => {
       return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            setAuthInit({loading: false, auth: {loggedIn: Boolean(firebaseUser)} });
      });
    }, []);
    return authInit;
}