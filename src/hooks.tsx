import { useRef, useEffect } from "react";

export const useOnClickOutside = (
  setAutoComplete: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef &&
      !wrapperRef.current?.contains((event.target as unknown) as Node)
    ) {
      setAutoComplete(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return { wrapperRef };
};
