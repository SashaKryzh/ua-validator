import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconContext, IconType } from "react-icons";

const inputStyle = cva(
  "w-full border bg-gray-100 py-3 pr-4 outline-none focus:border-blue-500",
  {
    variants: {
      icon: {
        true: "pl-12",
        false: "pl-4",
      },
      rounded: {
        false: "",
        sm: "rounded-md",
        true: "rounded-full",
      },
    },
    defaultVariants: {
      icon: false,
      rounded: "sm",
    },
  }
);

export type inputStyleProps = VariantProps<typeof inputStyle>;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  inputStyleProps & {
    icon?: JSX.Element;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="relative">
      {props.icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
          <div className="flex h-10 w-10 items-center justify-center">
            <IconContext.Provider value={{ className: "w-6 h-6" }}>
              {props.icon}
            </IconContext.Provider>
          </div>
        </div>
      )}
      <input
        ref={ref}
        {...props}
        className={clsx(
          inputStyle({ icon: props.icon && true, rounded: props.rounded }),
          props.className
        )}
      />
    </div>
  );
});

Input.displayName = "Input";

export const Label: React.FC<{ slug: string; children: string }> = (props) => (
  <label className="pb-1" htmlFor={props.slug}>
    {props.children}
  </label>
);
