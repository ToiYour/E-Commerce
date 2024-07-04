import { auth } from "@/config/firebase";
import { AuthContext } from "@/contexts/AuthProvider";
import { ICustomer } from "@/interfaces/customer";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { signInWithGoogleAndFacebook } from "@/services/auth";
import { removeItemLocal, setItemLocal } from "@/services/localStorageService";
import { AxiosError } from "axios";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryRouter } from "./router";
import { useSocket } from "./socket";
export const useAuth = () => {
  return useContext(AuthContext);
};
interface useLogin {
  message?: string;
  access_token?: string;
  user?: ICustomer;
}
export const useLogin = () => {
  const historyRouter = useHistoryRouter();
  const socket = useSocket();
  const { setAuthUser, setIsLoggedIn } = useAuth();
  const handleLogin = (playload: useLogin) => {
    setAuthUser?.(playload.user);
    setIsLoggedIn?.(true);
    setItemLocal("token", playload.access_token);
    ToastSuccess(playload.message as string);
    if (!socket?.connected) {
      socket?.connect();
    }
    historyRouter();
  };
  return handleLogin;
};
export const useLogout = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const { setAuthUser, setIsLoggedIn } = useAuth();
  const handleLogout = async (message: string) => {
    setAuthUser?.(undefined);
    setIsLoggedIn?.(false);
    removeItemLocal("token");
    ToastSuccess(message as string);
    await signOut(auth);
    socket?.disconnect();
    navigate("/");
  };
  return handleLogout;
};

export const useGoogleLogin = () => {
  const loginSuccess = useLogin();
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        const data = getAdditionalUserInfo(result)?.profile;
        const payload = {
          name: {
            first_name: data?.family_name as string,
            last_name: data?.given_name as string,
          },
          user_name: data?.id as string,
          uid: data?.id as string,
          avatar: data?.picture as string,
          email: email as string,
        };
        signInWithGoogleAndFacebook(payload)
          .then(({ data }) => {
            loginSuccess(data);
          })
          .catch((err) => {
            console.log(err);
            if (err instanceof AxiosError) {
              ToastError(err.response?.data.message);
            }
          });
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          ToastError(error.response?.data.message);
        }
      });
  };
  return {
    loginGoogle,
  };
};
export const useFacebookLogin = () => {
  const loginSuccess = useLogin();
  const loginFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const data = getAdditionalUserInfo(result)?.profile;
        const { picture } = data as { picture: { url: string } };
        const payload = {
          name: {
            first_name: data?.first_name as string,
            last_name: data?.last_name as string,
          },
          user_name: data?.id as string,
          uid: data?.id as string,
          avatar: picture?.url as string,
          email: data?.email as string,
        };
        signInWithGoogleAndFacebook(payload)
          .then(({ data }) => {
            loginSuccess(data);
          })
          .catch((err) => {
            console.log(err);
            if (err instanceof AxiosError) {
              ToastError(err.response?.data.message);
            }
          });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          ToastError(error.response?.data.message);
        }
      });
  };
  return { loginFacebook };
};
