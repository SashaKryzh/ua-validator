import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type { FieldProps } from "formik";
import { Field } from "formik";
import { forwardRef } from "react";
import { IconContext } from "react-icons";
import TextareaAutosize, {
  type TextareaAutosizeProps,
} from "react-textarea-autosize";

const inputStyle = cva("w-full outline-none text-h7", {
  variants: {
    variant: {
      default:
        "block px-0 text-h7 py-3 text-black bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 peer autofill:bg-transparent",
      rounded: "border py-3 bg-gray-100 rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type inputStyleProps = VariantProps<typeof inputStyle>;

export type InputProps = React.ComponentPropsWithRef<'input'> &
  inputStyleProps & {
    placeholderLabel?: string | null;
    error?: string;
    prefixNode?: React.ReactNode;
    suffixNode?:  React.ReactNode;
  };

export const InputField = forwardRef<
  HTMLInputElement,
  InputProps & { name: string; showError?: boolean }
>((props, ref) => {
  const showError = props.showError ?? true;

  return (
    <Field name={props.name}>
      {({ field, form, meta }: FieldProps) => {
        const error = showError && meta.touched && meta.error;

        return (
          <Input
            ref={ref}
            error={typeof error === "string" ? error : undefined}
            {...field}
            {...props}
          />
        );
      }}
    </Field>
  );
});

InputField.displayName = "InputField";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="py-1">
      <div className="relative z-0">
        {props.prefixNode && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
            <div className="flex h-10 w-10 items-center justify-center">
              <IconContext.Provider value={{ className: "w-6 h-6" }}>
                {props.prefixNode}
              </IconContext.Provider>
            </div>
          </div>
        )}
        <input
          ref={ref}
          {...props}
          placeholder=" "
          className={clsx(
            inputStyle({ variant: props.variant }),
            props.className,
            props.error && "border-error",
            props.prefixNode && "pl-12"
          )}
        />
        {props.placeholderLabel && (
          <label
            htmlFor={props.id}
            className={clsx(
              "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-h7 text-black opacity-50 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75",
              props.error && "text-error opacity-100"
            )}
          >
            {props.placeholderLabel}
          </label>
        )}
      </div>
      {props.error && <p className="mt-1 text-h8 text-error">{props.error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export const Label: React.FC<{ slug: string; children: string }> = (props) => (
  <label className="pb-1" htmlFor={props.slug}>
    {props.children}
  </label>
);

type TextAreaProps = TextareaAutosizeProps &
  React.RefAttributes<HTMLTextAreaElement> & {
    error?: string;
    placeholderLabel?: string;
  };

// TODO: Show error text
export function TextArea(props: TextAreaProps) {
  return (
    <div className="py-1">
      <div className="relative z-0">
        <TextareaAutosize
          {...props}
          id={props.id}
          minRows={3}
          placeholder=" "
          className={clsx(
            "peer block w-full resize-none appearance-none border-0 border-b-2 border-black bg-transparent px-1 py-3 text-h7 text-black outline-none autofill:bg-transparent focus:outline-none focus:ring-0",
            "bg-gray-50",
            props.error && "border-error",
            props.className
          )}
        />
        {props.placeholderLabel && (
          <label
            htmlFor={props.id}
            className={clsx(
              "absolute top-3 z-10 origin-[0] -translate-y-7 scale-75 transform text-h7 text-black opacity-50 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75",
              props.error && "text-error opacity-100"
            )}
          >
            {props.placeholderLabel}
          </label>
        )}
      </div>
    </div>
  );
}
