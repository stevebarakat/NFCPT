import { useState, useEffect } from "react";

export default function useOnScreen(ref, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    let el = "<div></div>";
    if (ref.current) {
      el = ref.current;
      observer.observe(el);
    }
    return () => {
      observer.unobserve(el);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
