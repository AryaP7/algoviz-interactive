import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, Hash, GitBranch } from "lucide-react";

export type AlgorithmCategory = "sorting" | "searching" | "hashing" | "recursion";
export type SortingAlgorithm = "bubble" | "quick" | "merge" | "heap" | "insertion";

interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  description: string;
}

const algorithms: Algorithm[] = [
  {
    id: "bubble",
    name: "Bubble Sort",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    description: "Simple comparison-based sort, repeatedly swapping adjacent elements"
  },
  {
    id: "quick",
    name: "Quick Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    description: "Divide-and-conquer using pivot partitioning"
  },
  {
    id: "merge",
    name: "Merge Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    description: "Stable divide-and-conquer with guaranteed O(n log n) performance"
  },
];

const categoryIcons = {
  sorting: ArrowUpDown,
  searching: Search,
  hashing: Hash,
  recursion: GitBranch,
};

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onSelectAlgorithm: (id: string) => void;
}

export const AlgorithmSelector = ({ selectedAlgorithm, onSelectAlgorithm }: AlgorithmSelectorProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Select Algorithm</h2>
      <div className="grid gap-3">
        {algorithms.map((algo) => {
          const Icon = categoryIcons[algo.category];
          const isSelected = selectedAlgorithm === algo.id;
          
          return (
            <Card
              key={algo.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? "bg-primary/10 border-primary ring-2 ring-primary/20" 
                  : "hover:border-primary/40"
              }`}
              onClick={() => onSelectAlgorithm(algo.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground">{algo.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{algo.description}</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono">
                      <span className="text-muted-foreground">Time: </span>
                      <span className="text-foreground">{algo.timeComplexity.average}</span>
                    </div>
                    <div className="text-xs font-mono">
                      <span className="text-muted-foreground">Space: </span>
                      <span className="text-foreground">{algo.spaceComplexity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
