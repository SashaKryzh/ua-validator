import clsx from "clsx";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        "w-full rounded-full border bg-gray-100 py-3 pr-4 pl-12 outline-none focus:border-blue-500",
        props.className
      )}
    />
  );
});

Input.displayName = "Input";
