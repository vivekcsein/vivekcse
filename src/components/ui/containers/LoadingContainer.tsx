import React from "react";
interface LoadingContainerProps {
  children: React.ReactNode;
}
const LoadingContainer = ({ children }: LoadingContainerProps) => {
  return <div className="w-full px-5 mx-auto max-w-7xl">{children}</div>;
};

export default LoadingContainer;
