import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
export const Home = () => {
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const perInc = 100 / data.total;
        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if (prev != 100) return prev + perInc;
                else {
                    clearInterval(intervalId);
                    setLoading(false);
                    return 0;
                }
            });
        }, 2000);

        // Making No. of request to server in chunk of 5 otp per request

        let totalReqToBeMade = Math.floor(data.total / 5);
        const reqLessThan5 = data.total % 5;
        if (reqLessThan5 != 0) await executionBlock(reqLessThan5, intervalId);
        for (; totalReqToBeMade > 0; totalReqToBeMade--) {
            await executionBlock(5, intervalId);
        }
        clearInterval(intervalId);
        setLoading(false);
        setProgress(0);
    }
    function executionBlock(total, intervalId) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/v1/bomb", { ...data, total: total })
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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        number: "",
        total: 0,
    });
    const [progress, setProgress] = useState(0);
    return (
        <div className=" font-mono text-center px-5 py-10 md:px-0">
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold">
                Welcome to <span className="text-red-800/80">OTP Bomber</span>
            </p>
            <p className="mt-5 text-lg md:text-2xl font-medium text-black/80">
                Want to Prank Your Friend ?
            </p>
            <p className="text-lg md:text-2xl my-1 font-medium text-black/80">
                You're at Right Place 💀💀
            </p>
            <div className="lg:w-1/3 md:w-1/2 w-full px-5 font-mono mx-auto">
                <form
                    className=" mt-10 flex flex-col items-center"
                    onSubmit={onSubmit}
                >
                    <input
                        className="flex h-12 rounded-md border w-full border-black/30 bg-transparent px-3 py-3 text-base md:text-xl text-blue-900 font-medium placeholder:text-gray-600 placeholder:text-base md:placeholder:text-xl focus:outline-none"
                        type="tel"
                        placeholder="Enter Mobile No. (97468XXXXX)"
                        max={9999999999}
                        min={1111111111}
                        disabled={loading}
                        onChange={(e) => {
                            setData({
                                ...data,
                                number: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        className="flex h-12 mt-5 rounded-md border w-full border-black/30 bg-transparent px-3 py-3 text-base md:text-xl text-blue-900 font-medium placeholder:text-gray-600 placeholder:text-base md:placeholder:text-xl focus:outline-none"
                        type="number"
                        placeholder="No. of Messages to send"
                        disabled={loading}
                        max={50}
                        min={1}
                        onChange={(e) => {
                            setData({
                                ...data,
                                total: e.target.value,
                            });
                        }}
                        required
                    />
                    {/* <span className="text-sm font-semibold text-gray-700 mt-1 mx-2 mr-auto">
                        ⚠️ Please Don't misue this service
                    </span> */}
                    <div className="w-full leading-4 text-sm mt-5 mx-auto bg-red-600/80 px-2 py-1 text-white rounded-md">
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
                            <p
                                className={`-mt-1 relative z-20 ${
                                    progress > 47 && "text-white"
                                }`}
                            >
                                {progress * (data.total / 100)}
                            </p>
                        </div>
                    )}

                    <button
                        type={loading ? "button" : "submit"}
                        className={`rounded-md bg-blue-500  my-5 px-5 py-2 font-semibold text-white shadow-sm hover:bg-blue-500/70  text-xl`}
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
