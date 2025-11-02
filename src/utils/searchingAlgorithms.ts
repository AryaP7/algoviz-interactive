import { AlgorithmStep } from "@/types/algorithms";

// Linear Search
export function* linearSearch(arr: number[], target: number): Generator<AlgorithmStep> {
  let comparisons = 0;
  let arrayAccesses = 0;

  for (let i = 0; i < arr.length; i++) {
    arrayAccesses++;
    comparisons++;

    yield {
      array: [...arr],
      current: i,
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Checking index ${i}: ${arr[i]} === ${target}?`,
    };

    if (arr[i] === target) {
      yield {
        array: [...arr],
        current: i,
        sorted: [i],
        comparisons,
        swaps: 0,
        arrayAccesses,
        description: `Found target ${target} at index ${i}`,
      };
      return;
    }
  }

  yield {
    array: [...arr],
    comparisons,
    swaps: 0,
    arrayAccesses,
    description: `Target ${target} not found in array`,
  };
}

// Binary Search
export function* binarySearch(arr: number[], target: number): Generator<AlgorithmStep> {
  let comparisons = 0;
  let arrayAccesses = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    arrayAccesses++;
    comparisons++;

    yield {
      array: [...arr],
      comparing: [left, right, mid],
      current: mid,
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Checking middle element at index ${mid}: ${arr[mid]}`,
    };

    if (arr[mid] === target) {
      yield {
        array: [...arr],
        current: mid,
        sorted: [mid],
        comparisons,
        swaps: 0,
        arrayAccesses,
        description: `Found target ${target} at index ${mid}`,
      };
      return;
    }

    if (arr[mid] < target) {
      left = mid + 1;
      yield {
        array: [...arr],
        comparing: [mid],
        comparisons,
        swaps: 0,
        arrayAccesses,
        description: `${arr[mid]} < ${target}, searching right half`,
      };
    } else {
      right = mid - 1;
      yield {
        array: [...arr],
        comparing: [mid],
        comparisons,
        swaps: 0,
        arrayAccesses,
        description: `${arr[mid]} > ${target}, searching left half`,
      };
    }
  }

  yield {
    array: [...arr],
    comparisons,
    swaps: 0,
    arrayAccesses,
    description: `Target ${target} not found in array`,
  };
}

// Jump Search
export function* jumpSearch(arr: number[], target: number): Generator<AlgorithmStep> {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  let comparisons = 0;
  let arrayAccesses = 0;

  // Jump to find the block
  while (arr[Math.min(step, n) - 1] < target) {
    arrayAccesses++;
    comparisons++;

    yield {
      array: [...arr],
      comparing: [prev, Math.min(step, n) - 1],
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Jumping: checking index ${Math.min(step, n) - 1}`,
    };

    prev = step;
    if (prev >= n) {
      yield {
        array: [...arr],
        comparisons,
        swaps: 0,
        arrayAccesses,
        description: `Jumped past array, target ${target} not found`,
      };
      return;
    }
  }

  // Linear search in the block
  while (arr[prev] < target) {
    arrayAccesses++;
    comparisons++;

    yield {
      array: [...arr],
      current: prev,
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Linear search in block: checking index ${prev}`,
    };

    prev++;
    if (prev === Math.min(step, n)) {
      yield {
        array: [...arr],
        comparisons,
        swaps: 0,
        arrayAccesses,
        description: `Reached end of block, target ${target} not found`,
      };
      return;
    }
  }

  arrayAccesses++;
  comparisons++;

  if (arr[prev] === target) {
    yield {
      array: [...arr],
      current: prev,
      sorted: [prev],
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Found target ${target} at index ${prev}`,
    };
  } else {
    yield {
      array: [...arr],
      comparisons,
      swaps: 0,
      arrayAccesses,
      description: `Target ${target} not found in array`,
    };
  }
}
