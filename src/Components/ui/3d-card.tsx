"use client";

import React, { useMemo, useRef, useState } from "react";

type CardContainerProps = {
  children: React.ReactNode;
  className?: string;
};

type CardBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

type CardItemProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  translateX?: number;
  translateY?: number;
  translateZ?: number | string;
  rotateX?: number;
  rotateZ?: number;
};

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div className={cn("relative flex items-center justify-center [perspective:1200px]", className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, style, ...props }: CardBodyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 10;
    const rotateX = ((midY - y) / midY) * 8;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={ref}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        ...style,
      }}
      className={cn("w-full [transform-style:preserve-3d]", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardItem({
  as: Component = "div",
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateZ = 0,
  style,
  children,
  ...props
}: CardItemProps) {
  const transform = useMemo(() => {
    const tz = typeof translateZ === "number" ? `${translateZ}px` : translateZ;
    return `translateX(${translateX}px) translateY(${translateY}px) translateZ(${tz}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
  }, [translateX, translateY, translateZ, rotateX, rotateZ]);

  return (
    <Component
      style={{
        transform,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
