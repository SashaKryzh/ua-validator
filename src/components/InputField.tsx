import { Input, type InputProps } from "@/ui/Input";
import { Field, type FieldProps } from "formik";
import { forwardRef } from "react";

const InputField = forwardRef<
  HTMLInputElement,
  InputProps & { name: string; showError?: boolean }
>((props, ref) => {
  const showError = props.showError ?? true;

  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => {
        const error = showError && meta.touched && meta.error;
        const placeholder =
          props.placeholderLabel === null ||
          props.placeholderLabel === undefined
            ? props.placeholder
            : " ";
        // TODO: rewrite to inject whole label node as prop from InputField

        return (
          <Input
            ref={ref}
            error={typeof error === "string" ? error : undefined}
            placeholder={placeholder}
            {...field}
            {...props}
          />
        );
      }}
    </Field>
  );
});

InputField.displayName = "InputField";

export default InputField;
