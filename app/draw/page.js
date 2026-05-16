"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEraser, FaTrash, FaUndo, FaSave } from "react-icons/fa";

const colors = ["#ff7675", "#74b9ff", "#55efc4", "#ffeaa7", "#a29bfe", "#2d3436"];

export default function DrawPage() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ff7675");
  const [brushSize, setBrushSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center pt-8 h-screen overflow-hidden">
      <div className="mb-6 text-center">
        <h1 className="text-5xl font-black kids-font text-accent">Magic Drawing Board 🎨</h1>
        <p className="text-gray-500">Pick a color and start creating!</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6 glass p-4 rounded-full shadow-lg">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-125 ${
              color === c ? "border-white scale-110 shadow-lg" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
        <div className="w-[2px] h-8 bg-gray-200 mx-2" />
        <button
          onClick={() => setColor("white")}
          className={`p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all ${
            color === "white" ? "ring-4 ring-accent" : ""
          }`}
          title="Eraser"
        >
          <FaEraser size={24} />
        </button>
        <button
          onClick={clearCanvas}
          className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-all"
          title="Clear All"
        >
          <FaTrash size={24} />
        </button>
        <input
          type="range"
          min="5"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
        />
      </div>

      <div className="relative flex-1 w-full max-w-5xl px-4 pb-20">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          className="w-full h-full bg-white rounded-[2rem] shadow-2xl cursor-crosshair border-8 border-white"
        />
      </div>
    </div>
  );
}
