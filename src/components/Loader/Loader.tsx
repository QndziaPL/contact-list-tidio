import { FC, useEffect, useState } from "react";

export interface ISingleLetterWithColor {
  content: string;
  animationSpeed: number;
}

export const Loader: FC<ISingleLetterWithColor> = ({
  content,
  animationSpeed,
}) => {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContentIndex((prev) => {
        if (prev < content.length - 1) {
          return prev + 1;
        }
        return 0;
      });
    }, animationSpeed);

    return () => {
      clearInterval(interval);
    };
  }, [animationSpeed, content]);

  const output = [...content].map((letter, index) => (
    <span
      data-testid="letter"
      key={index}
      style={{
        color: index === activeContentIndex ? "red" : "black",
      }}
    >
      {letter}
    </span>
  ));

  return <div data-testid="loader">{output}</div>;
};
