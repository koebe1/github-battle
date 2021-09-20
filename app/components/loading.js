import React, { useState, useEffect, useRef } from "react";

export default function Loading({
  text = "loading",
  loaderSign = ".",
  speed = 300
}) {
  const [loaderCount, setLoaderCount] = useState(0);
  const interval = useRef();

  useEffect(() => {
    interval.current = window.setInterval(() => {
      loaderCount === 5
        ? setLoaderCount(0)
        : setLoaderCount(count => count + 1);
    }, speed);

    return window.clearInterval(interval.current);
  }, [loaderCount, text, speed]);

  return (
    <p className="loading">
      {text}

      {loaderSign.repeat(loaderCount)}
    </p>
  );
}
