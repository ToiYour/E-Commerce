import { ICustomer } from "@/interfaces/customer";
import { ToastError } from "@/lib/utils";
import { getAccountIsLoggedIn } from "@/services/auth";
import { getItemLocal } from "@/services/localStorageService";
import { AxiosError } from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
interface AuthContextType {
  authUser?: ICustomer;
  setAuthUser?: Dispatch<SetStateAction<ICustomer | undefined>>;
  isLoggedIn?: boolean;
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
}
const AuthContext = createContext<AuthContextType>({});
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<ICustomer | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
  useEffect(() => {
    (async () => {
      if (getItemLocal("token")) {
        try {
          const { data } = await getAccountIsLoggedIn();
          if (data) {
            setAuthUser(data?.user);
            setIsLoggedIn(true);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            error.response && ToastError(error.response?.data.message);
          }
        }
      }
    })();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
