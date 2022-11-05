import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Link from "next/link";

const buttonStyle = cva(["font-mono"], {
  variants: {
    variant: {
      primary: "rounded-md",
      secondary: "",
      triatery: "hover:underline underline-offset-2",
    },
    size: {
      sm: "py-1",
      md: "px-4 py-2",
      lg: "px-2 py-3",
    },
    color: {
      default: "",
      blue: "bg-blue-700 text-white",
      yellow: "bg-yellow-300 text-black",
    },
  },
  compoundVariants: [{ variant: "primary", class: "bg-blue-700 text-white" }],
  defaultVariants: {
    variant: "primary",
    size: "md",
    color: "default",
  },
});

export type buttonStyleProps = VariantProps<typeof buttonStyle>;

export type ButtonBaseProps = {
  icon?: React.ReactNode;
  loading?: boolean;
} & buttonStyleProps;

export type ButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export type LinkButtonProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
  };

const hasHref = (
  props: ButtonProps | LinkButtonProps
): props is LinkButtonProps => "href" in props;

export default function Button(props: ButtonProps | LinkButtonProps) {
  const className = buttonStyle({
    ...(props as buttonStyleProps),
    class: props.className,
  });

  return hasHref(props) ? (
    <Link href={props.href ?? ""} className={className}>
      {props.children}
    </Link>
  ) : (
    <button {...(props as ButtonProps)} className={className}>
      {props.children}
    </button>
  );
}
