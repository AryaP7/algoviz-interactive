import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowUpDown, Search, Network, Binary, Lightbulb, Zap, GitBranch, Split, Hash, Text } from "lucide-react";
import { algorithmDatabase } from "@/data/algorithmDatabase";
import { AlgorithmCategory } from "@/types/algorithms";
import { useState } from "react";

const categoryConfig: Record<AlgorithmCategory, { icon: any; label: string; color: string }> = {
  sorting: { icon: ArrowUpDown, label: "Sorting", color: "text-blue-500" },
  searching: { icon: Search, label: "Searching", color: "text-green-500" },
  graph: { icon: Network, label: "Graph", color: "text-purple-500" },
  tree: { icon: Binary, label: "Tree", color: "text-orange-500" },
  "dynamic-programming": { icon: Lightbulb, label: "Dynamic Programming", color: "text-yellow-500" },
  greedy: { icon: Zap, label: "Greedy", color: "text-red-500" },
  backtracking: { icon: GitBranch, label: "Backtracking", color: "text-pink-500" },
  "divide-conquer": { icon: Split, label: "Divide & Conquer", color: "text-cyan-500" },
  "string-matching": { icon: Text, label: "String Matching", color: "text-indigo-500" },
  hashing: { icon: Hash, label: "Hashing", color: "text-teal-500" },
};

interface CategorySidebarProps {
  selectedAlgorithm: string;
  onSelectAlgorithm: (id: string) => void;
}

export const CategorySidebar = ({ selectedAlgorithm, onSelectAlgorithm }: CategorySidebarProps) => {
  const [openCategories, setOpenCategories] = useState<Set<AlgorithmCategory>>(
    new Set(["sorting", "searching", "graph"])
  );

  const toggleCategory = (category: AlgorithmCategory) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const algorithmsByCategory = algorithmDatabase.reduce((acc, algo) => {
    if (!acc[algo.category]) acc[algo.category] = [];
    acc[algo.category].push(algo);
    return acc;
  }, {} as Record<AlgorithmCategory, typeof algorithmDatabase>);

  return (
    <div className="h-full border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Algorithms</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {algorithmDatabase.length} algorithms available
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-2">
          {Object.entries(categoryConfig).map(([category, config]) => {
            const algorithms = algorithmsByCategory[category as AlgorithmCategory] || [];
            if (algorithms.length === 0) return null;
            
            const Icon = config.icon;
            const isOpen = openCategories.has(category as AlgorithmCategory);

            return (
              <Collapsible
                key={category}
                open={isOpen}
                onOpenChange={() => toggleCategory(category as AlgorithmCategory)}
                className="mb-1"
              >
                <CollapsibleTrigger className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Icon className={`h-4 w-4 ${config.color}`} />
                  <span className="flex-1 text-left text-sm font-medium text-foreground">
                    {config.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{algorithms.length}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-9 pr-2 space-y-1 mt-1">
                  {algorithms.map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => onSelectAlgorithm(algo.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                        selectedAlgorithm === algo.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {algo.name}
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
