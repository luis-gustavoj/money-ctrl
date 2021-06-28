import { useEffect } from "react";

export function useOutsideClick(ref: any, setItem: (arg0: boolean) => void) {
  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setItem(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
}
