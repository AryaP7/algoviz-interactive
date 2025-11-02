import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface VisualizationCanvasProps {
  array: number[];
  highlights?: {
    comparing?: number[];
    swapping?: number[];
    sorted?: number[];
    pivot?: number;
  };
}

export const VisualizationCanvas = ({ array, highlights = {} }: VisualizationCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const maxValue = Math.max(...array, 1);

  const getBarColor = (index: number) => {
    if (highlights.sorted?.includes(index)) return "hsl(var(--algo-sorted))";
    if (highlights.pivot === index) return "hsl(var(--algo-pivot))";
    if (highlights.swapping?.includes(index)) return "hsl(var(--algo-swapping))";
    if (highlights.comparing?.includes(index)) return "hsl(var(--algo-comparing))";
    return "hsl(var(--primary))";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-background border-border">
      <div 
        ref={canvasRef}
        className="w-full h-[400px] flex items-end justify-center gap-1"
      >
        {array.map((value, index) => {
          const heightPercent = (value / maxValue) * 100;
          const color = getBarColor(index);
          
          return (
            <div
              key={index}
              className="flex-1 max-w-[60px] transition-all duration-300 ease-out relative group"
              style={{
                height: `${heightPercent}%`,
                backgroundColor: color,
                borderRadius: "4px 4px 0 0",
                minWidth: "8px",
                boxShadow: highlights.swapping?.includes(index) 
                  ? "0 0 20px hsl(var(--algo-swapping) / 0.6)" 
                  : "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-background px-2 py-1 rounded shadow-lg border">
                {value}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--algo-comparing))" }} />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--algo-swapping))" }} />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--algo-sorted))" }} />
          <span className="text-muted-foreground">Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--algo-pivot))" }} />
          <span className="text-muted-foreground">Pivot</span>
        </div>
      </div>
    </Card>
  );
};
