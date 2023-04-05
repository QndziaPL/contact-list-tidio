import { FC, useEffect, useState } from "react";

export interface ISingleLetterWithColor {
  content: string;
  animationSpeed: number;
  baseColor?: string;
}

export const SingleLetterWithColor: FC<ISingleLetterWithColor> = ({
  content,
  animationSpeed,
  baseColor,
}) => {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContentIndex((prev) => {
        if (prev < content.length - 2) {
          return prev + 1;
        }
        return 0;
      });
    }, animationSpeed);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const output = [...content].map((letter, index) => (
    <span
      key={index}
      style={{
        color:
          index === activeContentIndex ? "#ff0000" : baseColor ? baseColor : "",
      }}
    >
      {letter}
    </span>
  ));

  return <div>{output}</div>;
};
