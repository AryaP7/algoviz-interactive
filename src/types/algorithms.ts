export type AlgorithmCategory = 
  | "sorting" 
  | "searching" 
  | "graph" 
  | "tree"
  | "dynamic-programming"
  | "greedy"
  | "backtracking"
  | "divide-conquer"
  | "string-matching"
  | "hashing";

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  description: string;
  code: string;
  visualizationType: "array" | "graph" | "tree" | "matrix";
}

export interface AlgorithmStep {
  array?: number[];
  graph?: GraphData;
  tree?: TreeNode;
  matrix?: number[][];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  current?: number;
  visited?: number[];
  path?: number[];
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
  description?: string;
  currentLine?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
}

export interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  x?: number;
  y?: number;
}
