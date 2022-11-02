import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Link from "next/link";

const buttonStyle = cva(["font-mono"], {
  variants: {
    variant: {
      primary: "bg-blue-800 rounded-md",
      secondary: "",
      triatery: "text-black hover:underline underline-offset-2",
    },
    size: {
      sm: "py-1",
      md: "px-4 py-2",
      lg: "px-2 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
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
    variant: props.variant,
    size: props.size,
    class: props.className,
  });

  return hasHref(props) ? (
    <Link href={props.href ?? ""} className={className}>
      {props.children}
    </Link>
  ) : (
    <button className={className}>{props.children}</button>
  );
}
