import React from "react";
import styled from "styled-components";

const Loaders = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $height }) => ($height ? `calc(100vh - ${$height})` : `100vh`)};

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ $size }) => ($size ? `${$size * $size}px` : "64px")};
    height: ${({ $size }) => ($size ? `${$size * $size}px` : "64px")};
    border: ${({ $size }) => ($size ? `${$size}px` : "8px")} solid;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ $color }) => $color || "black"} transparent transparent
      transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ height, size, color }) => {
  return (
    <Loaders $height={height} $size={size} $color={color}>
      <div></div>
      <div></div>
      <div></div>
    </Loaders>
  );
};

export default Loader;
