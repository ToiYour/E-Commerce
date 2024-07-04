import LoadingFixed from "@/components/LoadingFixed";
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
  loading?: boolean;
  authUser?: ICustomer;
  setAuthUser?: Dispatch<SetStateAction<ICustomer | undefined>>;
  isLoggedIn?: boolean;
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
}
const AuthContext = createContext<AuthContextType>({});
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<ICustomer | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, loading };
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
            setAuthUser(undefined);
            setIsLoggedIn(false);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setAuthUser(undefined);
        setIsLoggedIn(false);
        setLoading(false);
      }
    })();
  }, []);
  if (loading) {
    return <LoadingFixed />;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
