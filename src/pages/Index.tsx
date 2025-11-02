import { useState, useEffect, useRef } from "react";
import { CategorySidebar } from "@/components/CategorySidebar";
import { VisualizationCanvas } from "@/components/VisualizationCanvas";
import { GraphVisualization } from "@/components/GraphVisualization";
import { ControlPanel } from "@/components/ControlPanel";
import { MetricsPanel } from "@/components/MetricsPanel";
import { InputConfigurator } from "@/components/InputConfigurator";
import { CodeViewer } from "@/components/CodeViewer";
import { StepDescription } from "@/components/StepDescription";
import { bubbleSort, quickSort, mergeSort } from "@/utils/sortingAlgorithms";
import { heapSort } from "@/utils/heapSort";
import { insertionSort } from "@/utils/insertionSort";
import { bfs, dfs, dijkstra, generateSampleGraph } from "@/utils/graphAlgorithms";
import { linearSearch, binarySearch, jumpSearch } from "@/utils/searchingAlgorithms";
import { AlgorithmStep } from "@/types/algorithms";
import { algorithmDatabase } from "@/data/algorithmDatabase";
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

const algorithmGenerators: Record<string, (input: any, target?: number) => Generator<AlgorithmStep>> = {
  bubble: bubbleSort,
  quick: quickSort,
  merge: mergeSort,
  heap: heapSort,
  insertion: insertionSort,
  "linear-search": (arr: number[], target: number) => linearSearch(arr, target || 25),
  "binary-search": (arr: number[], target: number) => binarySearch(arr, target || 25),
  "jump-search": (arr: number[], target: number) => jumpSearch(arr, target || 25),
  bfs: () => bfs(generateSampleGraph()),
  dfs: () => dfs(generateSampleGraph()),
  dijkstra: () => dijkstra(generateSampleGraph()),
};

const timeComplexities = {
  bubble: "O(n²)",
  quick: "O(n log n)",
  merge: "O(n log n)",
};

const Index = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubble");
  const currentAlgorithm = algorithmDatabase.find((a) => a.id === selectedAlgorithm);
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
    const generator = algorithmGenerators[algorithm];
    if (!generator) return [];

    const stepsArray: AlgorithmStep[] = [];
    
    // For search algorithms, use a target value
    const isSearchAlgorithm = algorithm.includes("search");
    const sortedArray = isSearchAlgorithm ? [...inputArray].sort((a, b) => a - b) : inputArray;
    const target = isSearchAlgorithm ? sortedArray[Math.floor(sortedArray.length / 2)] : undefined;
    
    // For graph algorithms, don't pass array
    const isGraphAlgorithm = ["bfs", "dfs", "dijkstra"].includes(algorithm);
    const gen = isGraphAlgorithm ? generator(null) : generator(sortedArray, target);
    
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
      if (step.array) {
        setArray(step.array);
      }
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

  if (!currentAlgorithm) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Algorithm Visualizer Pro</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {algorithmDatabase.length} algorithms across {new Set(algorithmDatabase.map(a => a.category)).size} categories
            </p>
          </div>
          <div className="flex items-center gap-2">
            <InputConfigurator
              arraySize={arraySize}
              onArraySizeChange={setArraySize}
              onGenerateArray={handleGenerateArray}
              disabled={isPlaying}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Category Navigation */}
        <div className="w-64 flex-shrink-0">
          <CategorySidebar
            selectedAlgorithm={selectedAlgorithm}
            onSelectAlgorithm={setSelectedAlgorithm}
          />
        </div>

        {/* Center - Visualization Area */}
        <div className="flex-1 flex flex-col p-6 overflow-auto">
          <div className="space-y-4">
            {/* Step Description */}
            {steps[currentStep]?.description && (
              <StepDescription description={steps[currentStep].description} />
            )}
            
            {/* Visualization Canvas */}
            {currentAlgorithm.visualizationType === "array" && (
              <VisualizationCanvas array={array} highlights={highlights} />
            )}
            {currentAlgorithm.visualizationType === "graph" && steps[currentStep]?.graph && (
              <GraphVisualization
                graph={steps[currentStep].graph!}
                visited={steps[currentStep].visited}
                current={steps[currentStep].current}
                path={steps[currentStep].path}
              />
            )}

            {/* Control Panel */}
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

            {/* Metrics and Code Viewer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1">
                <MetricsPanel
                  comparisons={metrics.comparisons}
                  swaps={metrics.swaps}
                  arrayAccesses={metrics.arrayAccesses}
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  timeComplexity={currentAlgorithm.timeComplexity.average}
                />
              </div>
              <div className="lg:col-span-2">
                <CodeViewer
                  code={currentAlgorithm.code}
                  description={currentAlgorithm.description}
                  algorithmName={currentAlgorithm.name}
                  timeComplexity={currentAlgorithm.timeComplexity}
                  spaceComplexity={currentAlgorithm.spaceComplexity}
                  currentLine={steps[currentStep]?.currentLine}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
