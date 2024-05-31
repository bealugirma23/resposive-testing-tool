import React, { useRef, useState, useEffect } from "react";

function Tabletcanva(props) {
  const canvasRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPosition.x;
    const dy = e.clientY - lastPosition.y;
    setTransform((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const scale = transform.scale - e.deltaY * 0.001;
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(Math.max(0.5, scale), 2),
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [isDragging, lastPosition, transform]);

  return (
    <div
      ref={canvasRef}
      className="flex justify-center items-center  "
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        transition: isDragging ? "none" : "transform 0.1s",
      }}
    >
      <iframe
        title="tablet-view"
        className="frame scale-75 border"
        width="1024"
        height="768"
        src={props.URL}
      ></iframe>
    </div>
  );
}

export default Tabletcanva;
