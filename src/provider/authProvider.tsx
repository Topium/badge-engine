import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserData } from "../types/User";

type Props = { children: string | JSX.Element | JSX.Element[] }
type Auth = { user: UserData, setUser: (newUser: UserData) => void }

const AuthContext = createContext<Auth>({user: {access_token: null, username: null}, setUser: () => null})

function AuthProvider({children}: Props) {
    const [user, setUser_] = useState(JSON.parse(localStorage.getItem("user") || '{"username":null,"access_token":null}'));

    function setUser(newUser: UserData | null) {
        setUser_(newUser)
    }
    useEffect(() => {
        if (user) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
          localStorage.setItem('token',user);
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
        }
      }, [user]);

    const contextValue = useMemo(() => ({
        user,
        setUser,
    }),
    [user]
    );

    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    )
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider