import { ToastError, ToastSuccess } from "@/lib/utils";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { loginWithGoogleOrFacebook } from "@/api/customer";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
        loginWithGoogleOrFacebook(payload)
          .then(({ data }) => {
            sessionStorage.setItem("token", data.access_token);
            navigate("/");
            queryClient.invalidateQueries({
              queryKey: ["GET_ACCOUNT_BY_TOKEN"],
            });
            ToastSuccess(data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        ToastError(errorMessage);
      });
  };
  return {
    loginGoogle,
  };
};
const useFacebookLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({ position: "center" });
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
        loginWithGoogleOrFacebook(payload)
          .then(({ data }) => {
            sessionStorage.setItem("token", data.access_token);
            navigate("/");
            queryClient.invalidateQueries({
              queryKey: ["GET_ACCOUNT_BY_TOKEN"],
            });
            ToastSuccess(data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        ToastError(errorMessage);
      });
  };
  return { loginFacebook };
};

export { useFacebookLogin, useGoogleLogin };
