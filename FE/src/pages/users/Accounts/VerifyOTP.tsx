import { compareOTP, forgotPassWord } from "@/api/customer";
import { ICustomer } from "@/interfaces/customer";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
interface IPropsVerifyOTP {
  user: ICustomer;
  setStep: (val: number) => void;
}
const VerifyOTP = ({ user, setStep }: IPropsVerifyOTP) => {
  const [time, setTime] = useState(15 * 60 - 1);
  const [expired, setExpired] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  useEffect(() => {
    const elementInputs = document.querySelectorAll(
      ".verify-wrapper input"
    ) as NodeListOf<HTMLInputElement>;
    const btnSubmit = document.querySelector(
      ".btn-verify"
    ) as HTMLButtonElement;
    elementInputs[0].value == "" && elementInputs[0].focus();
    const handleInput = (input: HTMLInputElement) => () => {
      const currentInput = input;
      const nextInput = currentInput.nextElementSibling as HTMLInputElement;
      if (currentInput.value.length > 0 && currentInput.value.length === 2) {
        currentInput.value = "";
      }
      if (nextInput != null && currentInput.value !== "") {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }
      if (elementInputs[4].value === "") {
        btnSubmit.setAttribute("disabled", "true");
      } else {
        btnSubmit.removeAttribute("disabled");
      }
    };

    const handleKeyup = (input: HTMLInputElement) => (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        const inputBackspace = e.target as HTMLInputElement;
        inputBackspace.value = "";
        const prevInput = input.previousElementSibling as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    };

    elementInputs.forEach((input) => {
      input.addEventListener("input", handleInput(input));
      input.addEventListener("keyup", handleKeyup(input));
    });
    const idInterval = setInterval(remainingTime, 1000);
    return () => {
      elementInputs.forEach((input) => {
        input.removeEventListener("input", handleInput(input));
        input.removeEventListener("keyup", handleKeyup(input));
      });
      clearInterval(idInterval);
    };
  }, [time]);
  const handleValueOTP = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updateValues = [...otpValues];
    updateValues[index] = e.target.value;
    setOtpValues(updateValues);
  };
  const remainingTime = () => {
    setTime((prev) => prev - 1);
    const elementTime = document.querySelector(
      ".remaining-time"
    ) as HTMLSpanElement;

    const minute = Math.floor(time / 60);
    const seconds = time % 60;
    if (time != 0) {
      elementTime.innerHTML = `${minute}:${seconds}s`;
    } else {
      elementTime.innerHTML = "Mã OTP đã hết hạn";
    }
  };
  const resendOTP = async () => {
    setTime(15 * 60 - 1);
    setExpired(false);
    const { data } = await forgotPassWord({
      user_name: user.user_name as string,
    });
    ToastSuccess(data?.message);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await compareOTP({
        userId: user._id as string,
        otp: Number(otpValues.join("")),
      });
      setStep(3);
      ToastSuccess(data.messages);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.messages);
      }
    }
  };
  return (
    <div className="relative flex  flex-col justify-center overflow-hidden bg-gray-50 py-20 px-10">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Xác thực mã OTP</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                Mình đã gửi mã tới email của bạn. Bạn vui lòng kiểm tra mail
                giúp mình nhé!
              </p>
            </div>
          </div>
          <div>
            <form action="" onSubmit={onSubmit}>
              <div className="flex flex-col space-y-10">
                <div>
                  <div className="verify-wrapper flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-3">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        onChange={(e) => handleValueOTP(e, index)}
                        className="appearance-none size-14 md:size-16  flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="number"
                        disabled={index != 0}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mt-5">
                      <p className="text-sm">
                        Thời gian còn lại:{" "}
                        <span className="remaining-time font-semibold text-blue-600">
                          15
                        </span>
                      </p>
                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Không nhận được mã?</p>{" "}
                        <button
                          onClick={resendOTP}
                          disabled={!expired}
                          className="flex flex-row items-center font-semibold text-blue-600"
                          type="button"
                        >
                          Gửi lại
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      *Lưu ý: Sau 15 phút chưa nhận được mã bạn có thể yêu cầu
                      gửi lại.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      disabled
                      className="btn-verify lex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Xác thực
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
