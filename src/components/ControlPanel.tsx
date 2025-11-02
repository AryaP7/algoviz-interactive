import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react";

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

export const ControlPanel = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  speed,
  onSpeedChange,
  disabled = false,
}: ControlPanelProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onStepBackward}
            disabled={disabled || isPlaying}
            title="Step Backward"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          {isPlaying ? (
            <Button
              size="icon"
              onClick={onPause}
              className="h-12 w-12 bg-primary hover:bg-primary/90"
              title="Pause"
            >
              <Pause className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={onPlay}
              disabled={disabled}
              className="h-12 w-12 bg-primary hover:bg-primary/90"
              title="Play"
            >
              <Play className="h-5 w-5" />
            </Button>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={onStepForward}
            disabled={disabled || isPlaying}
            title="Step Forward"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            disabled={disabled && !isPlaying}
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Speed</label>
            <span className="text-sm text-muted-foreground">{speed}ms</span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
            min={50}
            max={2000}
            step={50}
            disabled={isPlaying}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
