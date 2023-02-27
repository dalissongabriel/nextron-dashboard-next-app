import { animated, useSpring } from "@react-spring/web";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: string;
  delay?: number;
  fontSize?: string;
  from?: number;
}

export default function GrowingNumberAnimation({
  children,
  color = "#000000",
  delay = 150,
  fontSize = "1rem",
  from = 0,
}: Props) {
  const { number } = useSpring({
    from: { number: from },
    number: children,
    delay,
  });

  return (
    <animated.div style={{ fontSize, color }}>
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}
