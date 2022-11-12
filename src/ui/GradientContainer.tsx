enum Gradient {
  default,
}

export function GradientContainer(props: {
  gradient?: Gradient;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-[#F1ACAC] via-[#BF98C6] to-[#2833D0] p-[0.20rem]">
      <div className="h-full w-full bg-white">{props.children}</div>
    </div>
  );
}
