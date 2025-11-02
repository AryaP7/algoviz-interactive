import { useState, useEffect, useRef } from "react";
import { AlgorithmSelector } from "@/components/AlgorithmSelector";
import { VisualizationCanvas } from "@/components/VisualizationCanvas";
import { ControlPanel } from "@/components/ControlPanel";
import { MetricsPanel } from "@/components/MetricsPanel";
import { InputConfigurator } from "@/components/InputConfigurator";
import { bubbleSort, quickSort, mergeSort, AlgorithmStep } from "@/utils/sortingAlgorithms";
import { toast } from "sonner";

const generateArray = (size: number, type: "random" | "sorted" | "reversed" | "nearly-sorted"): number[] => {
  const arr = Array.from({ length: size }, (_, i) => i + 1);
  
  switch (type) {
    case "random":
      return arr.sort(() => Math.random() - 0.5);
    case "sorted":
      return arr;
    case "reversed":
      return arr.reverse();
    case "nearly-sorted":
      const nearlySorted = [...arr];
      const swaps = Math.floor(size * 0.1);
      for (let i = 0; i < swaps; i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [nearlySorted[idx1], nearlySorted[idx2]] = [nearlySorted[idx2], nearlySorted[idx1]];
      }
      return nearlySorted;
  }
};

const algorithmGenerators = {
  bubble: bubbleSort,
  quick: quickSort,
  merge: mergeSort,
};

const timeComplexities = {
  bubble: "O(n²)",
  quick: "O(n log n)",
  merge: "O(n log n)",
};

const Index = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState<number[]>(() => generateArray(20, "random"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [highlights, setHighlights] = useState<{
    comparing?: number[];
    swapping?: number[];
    sorted?: number[];
    pivot?: number;
  }>({});
  const [metrics, setMetrics] = useState({
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateSteps = (algorithm: string, inputArray: number[]) => {
    const generator = algorithmGenerators[algorithm as keyof typeof algorithmGenerators];
    if (!generator) return [];

    const stepsArray: AlgorithmStep[] = [];
    const gen = generator(inputArray);
    
    let result = gen.next();
    while (!result.done) {
      stepsArray.push(result.value);
      result = gen.next();
    }
    
    return stepsArray;
  };

  const handleGenerateArray = (type: "random" | "sorted" | "reversed" | "nearly-sorted") => {
    const newArray = generateArray(arraySize, type);
    setArray(newArray);
    handleReset();
    toast.success(`Generated ${type} array`);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setHighlights({});
    setMetrics({ comparisons: 0, swaps: 0, arrayAccesses: 0 });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const newSteps = generateSteps(selectedAlgorithm, array);
    setSteps(newSteps);
  };

  const handlePlay = () => {
    if (steps.length === 0) {
      const newSteps = generateSteps(selectedAlgorithm, array);
      setSteps(newSteps);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            toast.success("Algorithm completed!");
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, steps.length, speed]);

  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      setArray(step.array);
      setHighlights({
        comparing: step.comparing,
        swapping: step.swapping,
        sorted: step.sorted,
        pivot: step.pivot,
      });
      setMetrics({
        comparisons: step.comparisons,
        swaps: step.swaps,
        arrayAccesses: step.arrayAccesses,
      });
    }
  }, [currentStep, steps]);

  useEffect(() => {
    handleReset();
  }, [selectedAlgorithm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Algorithm Visualizer</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Interactive step-by-step algorithm execution
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Algorithm Selection */}
          <div className="lg:col-span-1 space-y-6">
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
            />
            <InputConfigurator
              arraySize={arraySize}
              onArraySizeChange={setArraySize}
              onGenerateArray={handleGenerateArray}
              disabled={isPlaying}
            />
          </div>

          {/* Center - Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <VisualizationCanvas array={array} highlights={highlights} />
            <ControlPanel
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
              onStepForward={handleStepForward}
              onStepBackward={handleStepBackward}
              speed={speed}
              onSpeedChange={setSpeed}
              disabled={steps.length === 0}
            />
          </div>

          {/* Right Sidebar - Metrics */}
          <div className="lg:col-span-1">
            <MetricsPanel
              comparisons={metrics.comparisons}
              swaps={metrics.swaps}
              arrayAccesses={metrics.arrayAccesses}
              currentStep={currentStep}
              totalSteps={steps.length}
              timeComplexity={timeComplexities[selectedAlgorithm as keyof typeof timeComplexities]}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
