import {createContext, ReactNode, useState, useEffect} from "react";
import { api } from "../services/api";

type AuthProvider = {
  children: ReactNode;
}

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  signInUrl: string;
  user: User | null;
  signOut: () => void;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
  }
}
export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=1a4bcfa064a2e1c53179`;

  async function signIn(code: string) {
    
    const responseAuth = await api.post<AuthResponse>("/authenticate", {code});

    const {token, user} = responseAuth.data;

    localStorage.setItem("@ZeonityWhile:token", token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);

  }

  async function signOut() {
    setUser(null);

    localStorage.removeItem("@ZeonityWhile:token");
  }

  useEffect(() => {
    const url = window.location.href;

    const result = url.includes("?code=");

    if(result) {
      const [urlWithoutCode, gitHubCode] = url.split("?code=");

      signIn(gitHubCode);

      window.history.pushState({}, "", urlWithoutCode);
    }
  }, [])

  useEffect( () => {
    const token = localStorage.getItem("@ZeonityWhile:token");
    
    if (token) {
      
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("/profile").then((response) => {
        setUser(response.data);
      })
    }

  },[])


  return (
    <AuthContext.Provider value={{signInUrl, user, signOut}}>
      {props.children}
    </AuthContext.Provider>
  )
  
}