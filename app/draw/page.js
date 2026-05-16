"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEraser, FaTrash, FaUndo, FaSave, FaPencilAlt, FaDownload, FaCheckCircle } from "react-icons/fa";
import confetti from "canvas-confetti";

const colors = [
  { hex: "#ff7675", name: "Red" },
  { hex: "#74b9ff", name: "Blue" },
  { hex: "#55efc4", name: "Green" },
  { hex: "#ffeaa7", name: "Yellow" },
  { hex: "#a29bfe", name: "Purple" },
  { hex: "#fab1a0", name: "Orange" },
  { hex: "#2d3436", name: "Black" },
];

export default function DrawPage() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ff7675");
  const [brushSize, setBrushSize] = useState(10);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth * 2;
        canvas.height = parent.offsetHeight * 2;
        
        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextRef.current = context;
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(e);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const getCoordinates = (e) => {
    if (e.nativeEvent.offsetX !== undefined) {
      return { offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY };
    } else {
      const touch = e.nativeEvent.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const [showSaved, setShowSaved] = useState(false);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
    
    setShowSaved(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="flex flex-col items-center pt-6 h-screen overflow-hidden bg-[#fdfcf0] pb-24">
      {/* Saved Notification */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-10 z-[100] bg-accent text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-black text-2xl kids-font"
          >
            <FaCheckCircle size={32} /> Saved Successfully! 🎉
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mb-4 text-center">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-6xl font-black kids-font text-primary drop-shadow-md"
        >
          Kids Art Studio 🎨
        </motion.h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-8 w-full max-w-7xl px-4 md:px-6 flex-1 overflow-hidden">
        {/* Left Toolbar - Crayons */}
        <div className="flex lg:flex-col items-center justify-center gap-2 md:gap-4 glass p-4 md:p-6 rounded-2xl md:rounded-[3rem] shadow-xl border-2 md:border-4 border-white h-fit overflow-x-auto no-scrollbar max-w-full">
          {colors.map((c) => (
            <motion.button
              key={c.hex}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setColor(c.hex)}
              className={`relative flex-shrink-0`}
            >
              <div 
                className={`w-10 h-16 md:w-12 md:h-24 rounded-t-full rounded-b-xl md:rounded-b-2xl shadow-lg transition-all ${
                  color === c.hex ? "ring-2 md:ring-4 ring-white ring-offset-2 md:ring-offset-4 ring-offset-primary scale-110" : "opacity-80"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            </motion.button>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative flex flex-col gap-4 overflow-hidden min-h-[300px]">
          <div className="flex-1 wooden-frame bg-white relative overflow-hidden rounded-2xl md:rounded-[2rem]">
            <canvas
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseMove={draw}
              onMouseLeave={finishDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={finishDrawing}
              ref={canvasRef}
              className="w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Bottom Toolbar */}
          <div className="glass p-3 md:p-4 rounded-2xl md:rounded-full flex flex-wrap items-center justify-center gap-3 md:gap-6 shadow-lg border-2 md:border-4 border-white mb-4 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3">
              <FaPencilAlt className="text-gray-400 text-sm md:text-base" />
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-20 md:w-32 h-2 md:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="hidden md:block w-[2px] h-8 bg-gray-200" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setColor("white")}
                className={`p-3 md:p-4 rounded-full transition-all flex items-center gap-2 font-bold text-sm md:text-base ${
                  color === "white" ? "bg-accent text-white shadow-lg scale-110" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                <FaEraser size={18} /> <span className="hidden xs:inline">Eraser</span>
              </button>

              <button
                onClick={clearCanvas}
                className="p-3 md:p-4 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-bold text-sm md:text-base"
              >
                <FaTrash size={18} /> <span className="hidden xs:inline">Clear</span>
              </button>

              <button
                onClick={downloadImage}
                className="p-3 md:p-4 rounded-full bg-secondary text-white hover:scale-110 transition-all flex items-center gap-2 font-bold shadow-md text-sm md:text-base"
              >
                <FaDownload size={18} /> <span className="hidden xs:inline">Save Art!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
