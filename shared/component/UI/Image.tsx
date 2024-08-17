import React, { HTMLAttributes } from "react";
import { BASE_URL } from "@/shared/lib/api";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  res?: boolean;
  alt?: string
}
export default function Image(props: ImageProps) {
  const { src, ...attrs } = props;

  

  return <img src={(props.res ? BASE_URL : '' + src)} {...attrs} />;
}
