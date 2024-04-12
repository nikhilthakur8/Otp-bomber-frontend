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
        <div>
            <form
                onSubmit={onSubmit}
                className="flex flex-col space-y-10 mx-auto w-2/3"
            >
                <input
                    type="url"
                    name="url"
                    required
                    onChange={(e) =>
                        setData((prev) => {
                            prev.url = e.target.value;
                            return prev;
                        })
                    }
                />
                <input
                    type="text"
                    name="numberKey"
                    required
                    onChange={(e) =>
                        setData((prev) => {
                            prev.numberKey = e.target.value;
                            return prev;
                        })
                    }
                />
                <input
                    type="text"
                    name="mobileNumber"
                    onChange={(e) =>
                        setData((prev) => {
                            prev.mobileNumber = e.target.value;
                            return prev;
                        })
                    }
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
