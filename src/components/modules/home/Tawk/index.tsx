"use client";

import { useEffect } from "react";

const Tawk = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_TAWK_CREDENTIALS}`;
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div></div>;
};

export default Tawk;
