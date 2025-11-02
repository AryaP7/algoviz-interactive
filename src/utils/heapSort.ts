import { AlgorithmStep } from "@/types/algorithms";

export function* heapSort(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;
  const sorted: number[] = [];

  function* heapify(n: number, i: number): Generator<AlgorithmStep> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    arrayAccesses += 3;

    if (left < n) {
      comparisons++;
      yield {
        array: [...array],
        comparing: [largest, left],
        sorted,
        comparisons,
        swaps,
        arrayAccesses,
        description: `Comparing parent ${array[largest]} with left child ${array[left]}`,
      };

      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      comparisons++;
      yield {
        array: [...array],
        comparing: [largest, right],
        sorted,
        comparisons,
        swaps,
        arrayAccesses,
        description: `Comparing largest ${array[largest]} with right child ${array[right]}`,
      };

      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      swaps++;
      arrayAccesses += 4;

      yield {
        array: [...array],
        swapping: [i, largest],
        sorted,
        comparisons,
        swaps,
        arrayAccesses,
        description: `Swapping ${array[largest]} and ${array[i]} to maintain heap property`,
      };

      yield* heapify(n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield {
      array: [...array],
      current: i,
      comparisons,
      swaps,
      arrayAccesses,
      description: `Building max heap: heapify from index ${i}`,
    };
    yield* heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    swaps++;
    arrayAccesses += 4;

    yield {
      array: [...array],
      swapping: [0, i],
      sorted,
      comparisons,
      swaps,
      arrayAccesses,
      description: `Moving max element ${array[i]} to sorted position ${i}`,
    };

    sorted.push(i);

    yield* heapify(i, 0);
  }

  sorted.push(0);

  yield {
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons,
    swaps,
    arrayAccesses,
    description: "Heap sort complete",
  };
}
