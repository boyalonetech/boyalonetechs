"use client";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black 
        [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] 
        ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 400,
  height = 300,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 2000, // faster switch
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 0.3,
          durMove: 0.3,
          durReturn: 0.3,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.3,
          durMove: 0.3,
          durReturn: 0.3,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  // filter children
  const childArr = useMemo(
    () =>
      Children.toArray(children).filter(
        (c): c is ReactElement<CardProps> => isValidElement<CardProps>(c)
      ),
    [children]
  );

  // stable refs
  const refsRef = useRef<CardRef[]>([]);
  if (refsRef.current.length !== childArr.length) {
    refsRef.current = Array.from({ length: childArr.length }, (_, i) => refsRef.current[i] ?? React.createRef<HTMLDivElement>());
  }

  // order of cards
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  if (order.current.length !== childArr.length) {
    order.current = Array.from({ length: childArr.length }, (_, i) => i);
  }

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const refs = refsRef.current;
    const total = refs.length;

    refs.forEach((r, i) => {
      if (r && r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      // drop animation (shortened to card height)
      tl.to(elFront, {
        y: "+=300",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => {
        if (elFront) gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, undefined, "return");
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      };
    }

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length, config.durDrop, config.durMove, config.durReturn, config.promoteOverlap, config.returnDelay, config.ease]);

  const rendered = childArr.map((child, i) => {
    const r = refsRef.current[i];
    const mergedProps: Partial<CardProps & React.RefAttributes<HTMLDivElement>> = {
      key: i,
      ref: r,
      style: { width, height, ...(child.props.style ?? {}) },
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        child.props.onClick?.(e as any);
        onCardClick?.(i);
      },
    };
    return cloneElement(child as ReactElement<any>, mergedProps as any);
  });

  return (
    <div
      ref={container}
      className="relative mx-auto perspective-[900px] overflow-hidden"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
