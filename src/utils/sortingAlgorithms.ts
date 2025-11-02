export interface AlgorithmStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
}

// Bubble Sort
export function* bubbleSort(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      arrayAccesses += 2;
      comparisons++;
      
      yield {
        array: [...array],
        comparing: [j, j + 1],
        sorted,
        comparisons,
        swaps,
        arrayAccesses,
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        arrayAccesses += 4;
        swapped = true;

        yield {
          array: [...array],
          swapping: [j, j + 1],
          sorted,
          comparisons,
          swaps,
          arrayAccesses,
        };
      }
    }
    
    sorted.push(n - i - 1);
    
    if (!swapped) break;
  }

  sorted.push(0);
  yield {
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons,
    swaps,
    arrayAccesses,
  };
}

// Quick Sort
export function* quickSort(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;
  const sorted: number[] = [];

  function* partition(low: number, high: number): Generator<AlgorithmStep, number> {
    const pivot = array[high];
    arrayAccesses++;
    let i = low - 1;

    yield {
      array: [...array],
      pivot: high,
      sorted,
      comparisons,
      swaps,
      arrayAccesses,
    };

    for (let j = low; j < high; j++) {
      arrayAccesses++;
      comparisons++;

      yield {
        array: [...array],
        comparing: [j, high],
        pivot: high,
        sorted,
        comparisons,
        swaps,
        arrayAccesses,
      };

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        swaps++;
        arrayAccesses += 4;

        yield {
          array: [...array],
          swapping: [i, j],
          pivot: high,
          sorted,
          comparisons,
          swaps,
          arrayAccesses,
        };
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swaps++;
    arrayAccesses += 4;

    yield {
      array: [...array],
      swapping: [i + 1, high],
      sorted,
      comparisons,
      swaps,
      arrayAccesses,
    };

    sorted.push(i + 1);
    return i + 1;
  }

  function* quickSortHelper(low: number, high: number): Generator<AlgorithmStep> {
    if (low < high) {
      const pi = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sorted.push(low);
    }
  }

  yield* quickSortHelper(0, array.length - 1);

  yield {
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    comparisons,
    swaps,
    arrayAccesses,
  };
}

// Merge Sort
export function* mergeSort(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;
  const sorted: number[] = [];

  function* merge(left: number, mid: number, right: number): Generator<AlgorithmStep> {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    arrayAccesses += leftArr.length + rightArr.length;

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      arrayAccesses += 2;

      yield {
        array: [...array],
        comparing: [left + i, mid + 1 + j],
        sorted,
        comparisons,
        swaps,
        arrayAccesses,
      };

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }
      arrayAccesses++;
      swaps++;
      k++;

      yield {
        array: [...array],
        swapping: [k - 1],
        sorted,
        comparisons,
        swaps,
        arrayAccesses,
      };
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      arrayAccesses += 2;
      swaps++;
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      arrayAccesses += 2;
      swaps++;
      j++;
      k++;
    }
  }

  function* mergeSortHelper(left: number, right: number): Generator<AlgorithmStep> {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      yield* mergeSortHelper(left, mid);
      yield* mergeSortHelper(mid + 1, right);
      yield* merge(left, mid, right);
    }
  }

  yield* mergeSortHelper(0, array.length - 1);

  yield {
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    comparisons,
    swaps,
    arrayAccesses,
  };
}
