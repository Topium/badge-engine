import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Props = { children: string | JSX.Element | JSX.Element[] }
type Auth = { token: string | null, setToken: (newToken: string | null) => void }

const AuthContext = createContext<Auth>({token: null, setToken: () => null})

function AuthProvider({children}: Props) {
    const [token, setToken_] = useState(localStorage.getItem("token"));

    function setToken(newToken: string | null) {
        setToken_(newToken)
    }
    useEffect(() => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem('token',token);
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
        }
      }, [token]);

    const contextValue = useMemo(() => ({
        token,
        setToken,
    }),
    [token]
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