import React, { useState, useEffect, useRef, useCallback } from "react";
import { ReactComponent as CompareIcon } from "./assets/compare.svg";
import "./styles.css";

const ComparisonSlider = ({ leftComponent, rightComponent, onChange }) => {
  const [isResizing, setIsResizing] = useState(false);
  const topImageRef = useRef();
  const handleRef = useRef();

  const setPositioning = useCallback((x) => {
    const { left, width } = topImageRef.current.getBoundingClientRect();
    const handleWidth = handleRef.current.offsetWidth;

    if (x >= left && x <= width + left - handleWidth) {
      handleRef.current.style.left = `${((x - left) / width) * 100}%`;
      topImageRef.current.style.clipPath = `inset(0 ${
        100 - ((x - left) / width) * 100
      }% 0 0)`;
    }
  }, []);

  const handleResize = useCallback(
    (e) => {
        const element = topImageRef.current;
        const totalWidth = element.clientWidth;
        const percentage = (e.clientX/totalWidth)*100;
        // console.log(element);
 
        if (e.clientX) {
            setPositioning(e.clientX);
            if(e.clientX>0 && e.clientX<totalWidth) {
                onChange({percentage})
            }
            // console.log(e.clientX, totalWidth)
        } 
    //   else if (e.touches[0] && e.touches[0].clientX) {
    //     setPositioning(e.touches[0].clientX);
    //   }
    },
    [setPositioning]
  );

  // Set initial positioning on component mount
  useEffect(() => { 
    const { left, width } = topImageRef.current.getBoundingClientRect();
    const handleWidth = handleRef.current.offsetWidth;

    setPositioning(width / 2 + left - handleWidth / 2);
  }, [setPositioning]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);

    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("touchmove", handleResize);
    window.removeEventListener("mouseup", handleResizeEnd);
    window.removeEventListener("touchend", handleResizeEnd);
  }, [handleResize]);

  const onKeyDown = useCallback(
    (e) => {
    //     error al soltar el teclado
    //   const { offsetLeft, offsetParent } = handleRef.current;

    //   if (e.code === "ArrowLeft") {
    //     setPositioning(offsetLeft + offsetParent.offsetLeft - 10);
    //   }

    //   if (e.code === "ArrowRight") {
    //     setPositioning(offsetLeft + offsetParent.offsetLeft + 10);
    //   }
    },
    [setPositioning]
  );

  // Add keydown event on mount
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("touchmove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
      window.addEventListener("touchend", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.addEventListener("touchmove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
      window.removeEventListener("touchend", handleResizeEnd);
      window.removeEventListener("keyup", onKeyDown);
    };
  }, [isResizing, handleResize, handleResizeEnd, onKeyDown]);

  return (
    <>
      <div className="comparison-slider">
        <div
          ref={handleRef}
          className="handle"
          onMouseDown={() => setIsResizing(true)}
          onTouchStart={() => setIsResizing(true)}
        >
          <CompareIcon />
        </div>
        <div ref={topImageRef} className="comparison-item top">
          {leftComponent}
        </div>
        <div className="comparison-item">
          {rightComponent}
        </div>
      </div>
    </>
  );
};

export default ComparisonSlider;
