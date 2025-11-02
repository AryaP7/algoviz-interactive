import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Shuffle, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface InputConfiguratorProps {
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  onGenerateArray: (type: "random" | "sorted" | "reversed" | "nearly-sorted") => void;
  disabled?: boolean;
}

export const InputConfigurator = ({
  arraySize,
  onArraySizeChange,
  onGenerateArray,
  disabled = false,
}: InputConfiguratorProps) => {
  const dataTypes = [
    { type: "random" as const, label: "Random", icon: Shuffle },
    { type: "sorted" as const, label: "Sorted", icon: TrendingUp },
    { type: "reversed" as const, label: "Reversed", icon: TrendingDown },
    { type: "nearly-sorted" as const, label: "Nearly Sorted", icon: Minus },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Input Configuration</h3>
      
      <div className="space-y-6">
        {/* Array Size Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="array-size" className="text-sm font-medium">
              Array Size
            </Label>
            <span className="text-sm font-mono text-muted-foreground">{arraySize}</span>
          </div>
          <Slider
            id="array-size"
            value={[arraySize]}
            onValueChange={([value]) => onArraySizeChange(value)}
            min={5}
            max={50}
            step={1}
            disabled={disabled}
            className="w-full"
          />
        </div>

        {/* Data Generation Buttons */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Generate Data</Label>
          <div className="grid grid-cols-2 gap-2">
            {dataTypes.map(({ type, label, icon: Icon }) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => onGenerateArray(type)}
                disabled={disabled}
                className="justify-start gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
