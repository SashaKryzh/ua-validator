import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

export type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const hasHref = (props: ButtonProps | LinkProps): props is LinkProps =>
  "href" in props;

export function ButtonOrLink(props: ButtonProps | LinkProps) {
  return hasHref(props) ? (
    <Link {...(props as LinkProps)}>{props.children}</Link>
  ) : (
    <button {...(props as ButtonProps)}>{props.children}</button>
  );
}

const buttonStyle = cva("text-h5", {
  variants: {
    variant: {
      primary: "bg-black text-white",
      triatery: "text-black",
    },
    size: {
      default: "p-4",
    },
    rounded: {
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    rounded: "full",
  },
});

export type ButtonBaseProps = {
  icon?: React.ReactNode;
  loading?: boolean;
} & VariantProps<typeof buttonStyle>;

export function Button(props: ButtonBaseProps & (ButtonProps | LinkProps)) {
  const className = buttonStyle(props);

  return (
    <ButtonOrLink {...props} className={className}>
      {props.children}
    </ButtonOrLink>
  );
}
