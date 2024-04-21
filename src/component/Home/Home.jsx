import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../Input";
export const Home = () => {
    async function onSubmit(data) {
        setLoading(true);
        setTotal(data.total);
        const perInc = 100 / data.total;
        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if (Math.round(prev) != 100) return prev + perInc;
                else {
                    clearInterval(intervalId);
                    setLoading(false);
                    return 0;
                }
            });
        }, 2000);

        // Making No. of request to server in chunk of 5 otp per request

        let skip = 0;
        let i = total;
        // for making request to server in chunk of 5 otp per request
        while (i > 0) {
            if (i < 5) {
                await executionBlock(i, skip, data, intervalId);
                break;
            } else {
                await executionBlock(5, skip, data, intervalId);
                skip += 5;
                i = i - 5;
            }
        }
    }

    function executionBlock(total, skip, data, intervalId) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/v1/bomb", { ...data, total, skip })
                .then(() => {})
                .catch(() => {
                    clearInterval(intervalId);
                    setProgress(0);
                    setLoading(false);
                });
            setTimeout(() => {
                resolve();
            }, total * 2000);
        });
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    return (
        <div className=" text-center py-10 md:px-0">
            <p className="text-3xl tracking-tighter md:text-5xl lg:text-6xl font-bold">
                Welcome to <span className="text-[#E72929]">OTP Bomber</span>
            </p>
            <p className="mt-4 text-lg md:text-2xl font-medium text-black/80">
                Want to Prank Your Friend ?
            </p>
            <p className="text-lg md:text-2xl my-1 font-medium text-black/80">
                You're at Right Place 💀💀
            </p>
            <div className="lg:w-1/3 md:w-1/2 w-full px-5 font-mono mx-auto">
                <form className="mt-10  " onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label={"Mobile Number"}
                        name={"number"}
                        type={"text"}
                        errors={errors}
                        disabled={loading}
                        {...register("number", {
                            required: "Required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Please enter a valid mobile number",
                            },
                        })}
                    />
                    <Input
                        label={"No. of Message to send"}
                        name={"total"}
                        type={"number"}
                        errors={errors}
                        disabled={loading}
                        {...register("total", {
                            required: "Required",
                            min: {
                                value: 1,
                                message:
                                    "Please enter the number of message > 1",
                            },
                            max: {
                                value: 50,
                                message:
                                    "Please enter the number of message < 50",
                            },
                        })}
                    />
                    <div className="w-full leading-4 text-sm mt-5 mx-auto bg-red-600/80 px-2 py-1 text-white rounded-md text-center">
                        ⚠️ Please do not use this website for revenge or
                        harassment. Developer is not responsible for your
                        actions.
                    </div>

                    {loading && (
                        <div className="h-4 rounded-full mt-5 bg-white w-full relative">
                            <div
                                className="h-4 rounded-full bg-blue-500 absolute"
                                style={{ width: `${progress}%` }}
                            ></div>
                            <span
                                className={`-top-1 relative z-20 ${
                                    progress > 49 && "text-white"
                                }`}
                            >
                                {Math.round(progress * (total / 100))}
                            </span>
                        </div>
                    )}

                    <button
                        type={loading ? "button" : "submit"}
                        className={`rounded-md bg-blue-500 my-5 px-5 py-2 font-semibold text-white   transition-all duration-75 text-xl shadow-[4px_4px_#001221] active:shadow-[0px_0px_rgba(0,0,0,0.3)]`}
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2 cursor-not-allowed">
                                <ClipLoader color="white" size={25} />
                                <p>Sending</p>
                            </div>
                        ) : (
                            "Bomb Now 💣"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
