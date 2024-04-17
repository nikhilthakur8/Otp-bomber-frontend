import axios from "axios";
import React, { useState } from "react";

export const OtpLinkAddingForm = () => {
    function onSubmit(e) {
        e.preventDefault();
        console.log(data);
        axios
            .post("/api/add/otp-bombing/site", data)
            .then(() => {})
            .finally(() => {
                window.location.reload();
            });
    }
    const [data, setData] = useState({
        url: null,
        numberKey: null,
        mobileNumber: null,
    });
    return (
        <div className="my-14 font-mono">
            <form onSubmit={onSubmit} className="flex flex-col mx-auto w-2/3">
                <label htmlFor="" className="my-2">
                    URL Link
                </label>
                <input
                    type="url"
                    name="url"
                    required
                    className="rounded-md px-5 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onChange={(e) =>
                        setData((prev) => {
                            prev.url = e.target.value;
                            return prev;
                        })
                    }
                />
                <label htmlFor="" className="my-2">
                    Number Key
                </label>
                <input
                    type="text"
                    name="numberKey"
                    required
                    className="rounded-md px-5 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onChange={(e) =>
                        setData((prev) => {
                            prev.numberKey = e.target.value;
                            return prev;
                        })
                    }
                />
                <label htmlFor="" className="my-2">
                    Mobile Number Prefix
                </label>
                <input
                    type="text"
                    name="mobileNumber"
                    className="rounded-md px-5 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onChange={(e) =>
                        setData((prev) => {
                            prev.mobileNumber = e.target.value;
                            return prev;
                        })
                    }
                />
                <button
                    className="bg-blue-600 mt-10 hover:bg-blue-500/60 text-white font-semibold mx-10 py-2 rounded-full"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
