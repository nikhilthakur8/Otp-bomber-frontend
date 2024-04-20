/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
const Input = React.forwardRef(function Input(
    { label = "", name = "", type = "text", errors, defaultValue, ...props },
    ref
) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="mt-4 relative w-full">
            <input
                className={`flex h-12 w-full rounded-md border   border-black/30 bg-transparent px-3 py-2 text-base md:text-lg text-blue-900 font-medium  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none ${
                    type === "email" && "lowercase"
                }`}
                type={type}
                id={name}
                ref={ref}
                name={name}
                defaultValue={defaultValue}
                {...props}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => !e.target.value && setIsFocused(false)}
            />
            <label
                htmlFor={name}
                className={` font-medium  rounded-md cursor-text text-gray-600 transition-all   px-1 mx-2 absolute  left-0 ${
                    ((isFocused || defaultValue) &&
                        "text-sm -top-3 backdrop-blur-3xl") ||
                    "top-2.5 text-lg"
                }`}
            >
                {label}
            </label>
            {errors[name] && (
                <p className="text-red-600 mt-1 text-sm text-start">
                    * {errors[name]?.message}
                </p>
            )}
        </div>
    );
});

export default Input;
