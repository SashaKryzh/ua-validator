interface SpacerProps {
  className?: string;
}

export default function Spacer({ className }: SpacerProps) {
  return <div className={className} />;
}
