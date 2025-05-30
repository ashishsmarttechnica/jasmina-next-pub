"use client";
import noImage2 from "@/assets/form/noImage2.svg";
import Image from "next/image";
import { useState } from "react";

const ImageFallback = ({
  src,
  fallbackSrc = noImage2,
  alt = "image",
  width = 32,
  height = 32,
  className = "",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const handleError = () => {
    if (!hasTriedFallback) {
      setImgSrc(fallbackSrc);
      setHasTriedFallback(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default ImageFallback;
