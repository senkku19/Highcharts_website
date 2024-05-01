import { useState } from "react";

export default function useSettings(){
    const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle
  };
}