import { AlgorithmStep, GraphData } from "@/types/algorithms";

// Generate a sample graph
export function generateSampleGraph(): GraphData {
  return {
    nodes: [
      { id: 0, label: "A", x: 100, y: 200 },
      { id: 1, label: "B", x: 250, y: 100 },
      { id: 2, label: "C", x: 250, y: 300 },
      { id: 3, label: "D", x: 400, y: 100 },
      { id: 4, label: "E", x: 400, y: 300 },
      { id: 5, label: "F", x: 550, y: 200 },
    ],
    edges: [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 2, weight: 2 },
      { from: 1, to: 3, weight: 5 },
      { from: 2, to: 4, weight: 3 },
      { from: 3, to: 5, weight: 2 },
      { from: 4, to: 5, weight: 6 },
      { from: 1, to: 2, weight: 1 },
    ],
  };
}

// BFS Algorithm
export function* bfs(graph: GraphData, startNode: number = 0): Generator<AlgorithmStep> {
  const visited: number[] = [];
  const queue: number[] = [startNode];
  let comparisons = 0;
  let arrayAccesses = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    arrayAccesses++;

    if (visited.includes(current)) continue;

    yield {
      graph,
      current,
      visited: [...visited],
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Visiting node ${graph.nodes.find(n => n.id === current)?.label}`,
    };

    visited.push(current);

    // Get neighbors
    const neighbors = graph.edges
      .filter((e) => e.from === current)
      .map((e) => e.to);

    for (const neighbor of neighbors) {
      comparisons++;
      if (!visited.includes(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
        arrayAccesses++;

        yield {
          graph,
          current,
          visited: [...visited],
          comparisons,
          swaps: 0,
          arrayAccesses,
          description: `Adding node ${graph.nodes.find(n => n.id === neighbor)?.label} to queue`,
        };
      }
    }
  }

  yield {
    graph,
    visited: [...visited],
    comparisons,
    swaps: 0,
    arrayAccesses,
    description: "BFS traversal complete",
  };
}

// DFS Algorithm
export function* dfs(graph: GraphData, startNode: number = 0): Generator<AlgorithmStep> {
  const visited: number[] = [];
  let comparisons = 0;
  let arrayAccesses = 0;

  function* dfsHelper(node: number): Generator<AlgorithmStep> {
    visited.push(node);
    arrayAccesses++;

    yield {
      graph,
      current: node,
      visited: [...visited],
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Visiting node ${graph.nodes.find(n => n.id === node)?.label}`,
    };

    const neighbors = graph.edges
      .filter((e) => e.from === node)
      .map((e) => e.to);

    for (const neighbor of neighbors) {
      comparisons++;
      if (!visited.includes(neighbor)) {
        yield* dfsHelper(neighbor);
      }
    }
  }

  yield* dfsHelper(startNode);

  yield {
    graph,
    visited: [...visited],
    comparisons,
    swaps: 0,
    arrayAccesses,
    description: "DFS traversal complete",
  };
}

// Dijkstra's Algorithm
export function* dijkstra(graph: GraphData, startNode: number = 0): Generator<AlgorithmStep> {
  const distances: { [key: number]: number } = {};
  const visited: number[] = [];
  const path: number[] = [];
  let comparisons = 0;
  let arrayAccesses = 0;

  // Initialize distances
  graph.nodes.forEach((node) => {
    distances[node.id] = Infinity;
  });
  distances[startNode] = 0;

  while (visited.length < graph.nodes.length) {
    // Find unvisited node with minimum distance
    let current = -1;
    let minDist = Infinity;

    for (const node of graph.nodes) {
      comparisons++;
      arrayAccesses++;
      if (!visited.includes(node.id) && distances[node.id] < minDist) {
        minDist = distances[node.id];
        current = node.id;
      }
    }

    if (current === -1) break;

    visited.push(current);
    path.push(current);

    yield {
      graph,
      current,
      visited: [...visited],
      path: [...path],
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Visiting node ${graph.nodes.find(n => n.id === current)?.label} (distance: ${distances[current]})`,
    };

    // Update distances to neighbors
    const edges = graph.edges.filter((e) => e.from === current);
    for (const edge of edges) {
      comparisons++;
      arrayAccesses += 2;
      const newDist = distances[current] + (edge.weight || 1);
      if (newDist < distances[edge.to]) {
        distances[edge.to] = newDist;

        yield {
          graph,
          current,
          visited: [...visited],
          path: [...path],
          comparisons,
          swaps: 0,
          arrayAccesses,
          description: `Updated distance to ${graph.nodes.find(n => n.id === edge.to)?.label}: ${newDist}`,
        };
      }
    }
  }

  yield {
    graph,
    visited: [...visited],
    path: [...path],
    comparisons,
    swaps: 0,
    arrayAccesses,
    description: "Shortest path algorithm complete",
  };
}
