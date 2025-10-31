import { useState, useEffect } from "react";

type CellProps = {
  letter: string;
  status: string | null;
  index: number;
};

function Cell({ letter, status, index }: CellProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showColor, setShowColor] = useState(false);

  useEffect(() => { 
    if (letter === '') {
      setShowColor(false);
      setIsFlipping(false);
    }
  }, [letter]) // This makes animation work again after game restart!

  useEffect(() => {
    if (status !== null) {
      setIsFlipping(true);

      const colorTimer = setTimeout(() => {
        setShowColor(true);
      }, 200 + index * 200); 
      
      return () => {
        clearTimeout(colorTimer);
      };
    }
  }, [status,index]);

  const colorClass = showColor
    ? status === "right"
      ? "bg-green-400 text-white"
      : status === "present"
      ? "bg-yellow-400 text-white"
      : status === "wrong"
      ? "bg-gray-500 text-white"
      : ""
    : "bg-transparent";

  return (
    <div
      className={`w-20 h-20 border-2 border-gray-400 flex items-center justify-center text-3xl font-bold transition-transform duration-300 ${
        isFlipping ? "flip" : ""
      } ${colorClass}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {letter}
    </div>
  );
}

export default Cell;
