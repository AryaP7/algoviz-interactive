import { Algorithm } from "@/types/algorithms";

export const algorithmDatabase: Algorithm[] = [
  // SORTING ALGORITHMS
  {
    id: "bubble",
    name: "Bubble Sort",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    description: "Simple comparison-based sort that repeatedly swaps adjacent elements if they are in wrong order. Named for the way smaller elements 'bubble' to the top.",
    visualizationType: "array",
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
  },
  {
    id: "quick",
    name: "Quick Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    description: "Efficient divide-and-conquer algorithm using pivot partitioning. Partitions array around a pivot, recursively sorts sub-arrays.",
    visualizationType: "array",
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
  },
  {
    id: "merge",
    name: "Merge Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    description: "Stable divide-and-conquer with guaranteed O(n log n) performance. Divides array into halves, recursively sorts them, then merges.",
    visualizationType: "array",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i), right.slice(j));
}`
  },
  {
    id: "heap",
    name: "Heap Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    description: "Uses binary heap data structure. Builds max heap, repeatedly extracts maximum element and rebuilds heap.",
    visualizationType: "array",
    code: `function heapSort(arr) {
  const n = arr.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}`
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    description: "Builds sorted array one element at a time. Efficient for small datasets and nearly sorted arrays.",
    visualizationType: "array",
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`
  },

  // SEARCHING ALGORITHMS
  {
    id: "linear-search",
    name: "Linear Search",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    description: "Sequential search through array elements. Simple but inefficient for large datasets.",
    visualizationType: "array",
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    description: "Efficient search on sorted array. Repeatedly divides search interval in half.",
    visualizationType: "array",
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`
  },
  {
    id: "jump-search",
    name: "Jump Search",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(√n)", worst: "O(√n)" },
    spaceComplexity: "O(1)",
    description: "Jumps ahead by fixed steps, then performs linear search. Works on sorted arrays.",
    visualizationType: "array",
    code: `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  
  return arr[prev] === target ? prev : -1;
}`
  },

  // GRAPH ALGORITHMS
  {
    id: "bfs",
    name: "Breadth-First Search",
    category: "graph",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    description: "Explores graph level by level using a queue. Finds shortest path in unweighted graphs.",
    visualizationType: "graph",
    code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  
  while (queue.length > 0) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    
    visited.add(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
}`
  },
  {
    id: "dfs",
    name: "Depth-First Search",
    category: "graph",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    description: "Explores as far as possible along each branch using recursion or stack.",
    visualizationType: "graph",
    code: `function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "graph",
    timeComplexity: { best: "O((V+E) log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)" },
    spaceComplexity: "O(V)",
    description: "Finds shortest path from source to all vertices in weighted graph with non-negative weights.",
    visualizationType: "graph",
    code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = [[0, start]];
  
  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  
  while (pq.length > 0) {
    const [dist, node] = pq.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    
    for (const [neighbor, weight] of graph[node]) {
      const newDist = dist + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }
}`
  },

  // DYNAMIC PROGRAMMING
  {
    id: "fibonacci",
    name: "Fibonacci (DP)",
    category: "dynamic-programming",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    description: "Computes Fibonacci numbers using memoization to avoid redundant calculations.",
    visualizationType: "array",
    code: `function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`
  },
  {
    id: "knapsack",
    name: "0/1 Knapsack",
    category: "dynamic-programming",
    timeComplexity: { best: "O(nW)", average: "O(nW)", worst: "O(nW)" },
    spaceComplexity: "O(nW)",
    description: "Optimizes selection of items with given weights and values to maximize total value within weight limit.",
    visualizationType: "matrix",
    code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
}`
  },

  // BACKTRACKING
  {
    id: "n-queens",
    name: "N-Queens Problem",
    category: "backtracking",
    timeComplexity: { best: "O(N!)", average: "O(N!)", worst: "O(N!)" },
    spaceComplexity: "O(N²)",
    description: "Places N chess queens on N×N board so no two queens threaten each other.",
    visualizationType: "matrix",
    code: `function solveNQueens(n) {
  const board = Array(n).fill(0).map(() => Array(n).fill('.'));
  const solutions = [];
  
  function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
      if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
    }
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  backtrack(0);
  return solutions;
}`
  },
];
