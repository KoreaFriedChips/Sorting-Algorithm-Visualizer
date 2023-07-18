import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlgorithmInfo from "./AlgorithmInfo";

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      originalArray: [],
      isSorting: false,
      delaySpeed: 10,
      selectedAlgorithm: null,
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  generateArray() {
    this.setState({ selectedAlgorithm: null });
    const array = [];
    for (let i = 0; i < 50; i++) {
      array.push(randomIntFromInterval(5, 400));
    }
    // console.log(array)
    this.setState({ array, originalArray: array });
  }

  resetArray() {
    const { originalArray } = this.state;
    this.setState({ array: originalArray, selectedAlgorithm: false });
  }

  isSorted(array) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
  }

  isSortingOrSorted() {
    // Check if sorting is already in progress
    if (this.state.isSorting) {
      return true;
    }
    const { array } = this.state;
    if (this.isSorted(array)) {
      // Array is already sorted, no need to sort again
      toast.success(
        "Already sorted! Reset the array or generate a new array to visualize another sorting algorithm."
      );
      return true;
    }
    return false;
  }

  bubbleSort() {
    if (this.isSortingOrSorted()) return;
    // Set isSorting to true to disable other buttons
    this.setState({ isSorting: true });
    this.setState({ selectedAlgorithm: "Bubble Sort" });
    const { array } = this.state;
    const sortedArray = array.slice();
    const animations = [];

    // bubble sort algorithm
    for (let i = 0; i < sortedArray.length - 1; i++) {
      for (let j = 0; j < sortedArray.length - i - 1; j++) {
        // Add animation for comparing two elements
        animations.push([j, j + 1, "compare"]);
        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap the elements
          animations.push([j, j + 1, "swap"]);
          const temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }
      }
    }

    this.animateSorting(animations, sortedArray);
  }

  selectionSort() {
    if (this.isSortingOrSorted()) return;
    // Set isSorting to true to disable other buttons
    this.setState({ isSorting: true });
    this.setState({ selectedAlgorithm: "Selection Sort" });
    const { array } = this.state;
    const sortedArray = array.slice();
    const animations = [];

    // selection sort algorithm
    for (let i = 0; i < sortedArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedArray.length; j++) {
        // Add animation for comparing two elements
        animations.push([j, minIndex, "compare"]);
        if (sortedArray[j] < sortedArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        // Swap the elements
        animations.push([minIndex, i, "swap"]);
        const temp = sortedArray[i];
        sortedArray[i] = sortedArray[minIndex];
        sortedArray[minIndex] = temp;
      }
    }

    this.animateSorting(animations, sortedArray);
  }

  insertionSort() {
    if (this.isSortingOrSorted()) {
      return;
    }
    // Set isSorting to true to disable other buttons
    this.setState({ isSorting: true });
    this.setState({ selectedAlgorithm: "Insertion Sort" });
    const { array } = this.state;
    const sortedArray = array.slice();
    const animations = [];

    // insertion sort algorithm
    for (let i = 1; i < sortedArray.length; i++) {
      const key = sortedArray[i];
      let j = i - 1;

      // Add animation for comparing key with previous element
      animations.push([i, j, "compare"]);

      while (j >= 0 && sortedArray[j] > key) {
        // Add animation for swapping elements
        animations.push([j, j + 1, "swap"]);
        sortedArray[j + 1] = sortedArray[j];
        j--;
      }

      // Place the key at its correct position
      sortedArray[j + 1] = key;
    }

    this.animateSorting(animations, sortedArray);
  }

  mergeSortRecursive(array) {
    // Create a copy of the original array to avoid modifying it
    const origArray = array.slice();
    const animations = [];
    this.mergeSortHelper(origArray, 0, origArray.length - 1, animations);
    // Return the sorted array and animations
    return { sortedArray: origArray, animations };
  }

  mergeSortHelper(array, start, end, animations) {
    if (start >= end) {
      // Base case: the array has only one element or is empty
      return;
    }

    const mid = Math.floor((start + end) / 2);
    // Recursively sort the left and right halves of the array
    this.mergeSortHelper(array, start, mid, animations);
    this.mergeSortHelper(array, mid + 1, end, animations);
    // Merge the sorted halves and accumulate animations
    this.merge(array, start, mid, end, animations);
  }

  merge(array, start, mid, end, animations) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let mergedIndex = start;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      const leftValue = leftArray[leftIndex];
      const rightValue = rightArray[rightIndex];

      const leftOriginalIndex = start + leftIndex;
      const rightOriginalIndex = mid + 1 + rightIndex;

      if (leftValue <= rightValue) {
        array[mergedIndex] = leftValue;
        animations.push([leftOriginalIndex, mergedIndex, "compare"]);
        animations.push([mergedIndex, leftValue, "place"]);
        leftIndex++;
      } else {
        array[mergedIndex] = rightValue;
        animations.push([rightOriginalIndex, mergedIndex, "compare"]);
        animations.push([mergedIndex, rightValue, "place"]);
        rightIndex++;
      }
      mergedIndex++;
    }

    while (leftIndex < leftArray.length) {
      array[mergedIndex] = leftArray[leftIndex];
      animations.push([start + leftIndex, mergedIndex, "compare"]);
      animations.push([mergedIndex, leftArray[leftIndex], "place"]);
      leftIndex++;
      mergedIndex++;
    }

    while (rightIndex < rightArray.length) {
      array[mergedIndex] = rightArray[rightIndex];
      animations.push([mid + 1 + rightIndex, mergedIndex, "compare"]);
      animations.push([mergedIndex, rightArray[rightIndex], "place"]);
      rightIndex++;
      mergedIndex++;
    }
  }

  mergeSort() {
    if (this.isSortingOrSorted()) return;
    // Set isSorting to true to disable other buttons
    this.setState({ isSorting: true });
    this.setState({ selectedAlgorithm: "Merge Sort" });
    const { array } = this.state;
    console.log("Array before mergeSort: " + array);
    const sortedArray = this.mergeSortRecursive(array);
    console.log("Sorted array: " + sortedArray.sortedArray);
    const animations = sortedArray.animations;
    this.animateSorting(animations, sortedArray.sortedArray);
  }

  quickSortRecursive(array, startIndex, endIndex) {
    if (startIndex < endIndex) {
      const pivotIndex = this.partition(array, startIndex, endIndex);
      this.quickSortRecursive(array, startIndex, pivotIndex - 1);
      this.quickSortRecursive(array, pivotIndex + 1, endIndex);
    }
  }

  partition(array, startIndex, endIndex) {
    const pivot = array[endIndex];
    let i = startIndex - 1;

    for (let j = startIndex; j < endIndex; j++) {
      // Add animation for comparing two elements
      this.animations.push([j, endIndex, "compare"]);

      if (array[j] <= pivot) {
        i++;
        this.swap(array, i, j);
      }
    }

    this.swap(array, i + 1, endIndex);
    return i + 1;
  }

  swap(array, i, j) {
    // Add animation for swapping two elements
    this.animations.push([i, j, "swap"]);

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  quickSort() {
    if (this.isSortingOrSorted()) return;
    // Set isSorting to true to disable other buttons
    this.setState({ isSorting: true });
    this.setState({ selectedAlgorithm: "Quick Sort" });
    const { array } = this.state;

    // Copy the original array to preserve the state
    const arrayCopy = [...array];

    this.animations = [];
    this.quickSortRecursive(arrayCopy, 0, arrayCopy.length - 1);
    this.animateSorting(this.animations, arrayCopy);
  }

  animateSorting(animations, sortedArray) {
    const arrayBars = document.getElementsByClassName("array-bar");
    let i = 0;

    const animate = () => {
      if (i >= animations.length) {
        // Reset the colors of all bars and show the notification
        for (let i = 0; i < arrayBars.length; i++) {
          arrayBars[i].style.backgroundColor = "#007bff";
        }
        // Update the state with the sorted array
        this.setState({ array: sortedArray, isSorting: false });
        toast.success("Congratulations! The array is now sorted!");
        console.log(sortedArray);
        return;
      }

      const [barOneIdx, barTwoIdx, animationType] = animations[i];
      // console.log(barOneIdx + " " + barTwoIdx + " " + animationType);

      if (animationType === "compare") {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        // Apply animation for comparing two elements
        barOneStyle.backgroundColor = "red";
        barTwoStyle.backgroundColor = "red";

        // Reset the colors after the comparison
        setTimeout(() => {
          barOneStyle.backgroundColor = "#007bff";
          barTwoStyle.backgroundColor = "#007bff";
          i++;
          animate();
        }, this.state.delaySpeed);
      } else if (animationType === "swap") {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        // Apply animation for swapping two elements
        barOneStyle.backgroundColor = "green";
        barTwoStyle.backgroundColor = "green";

        // Swap the heights of the bars
        const tempHeight = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = tempHeight;

        // Reset the colors after the swap
        setTimeout(() => {
          barOneStyle.backgroundColor = "#007bff";
          barTwoStyle.backgroundColor = "#007bff";
          i++;
          animate();
        }, this.state.delaySpeed);
      } else if (animationType === "place") {
        // Apply animation for placing the value in the correct spot for merge sort
        const value = barTwoIdx;
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.backgroundColor = "green";
        barOneStyle.height = `${value}px`;

        // Reset the color after placing the value
        setTimeout(() => {
          barOneStyle.backgroundColor = "#007bff";
          i++;
          animate();
        }, this.state.delaySpeed);
      }
    };

    // Start the animation
    animate();
  }

  handleDelaySpeedChange = (event) => {
    this.setState({ delaySpeed: parseInt(event.target.value) });
    console.log(this.state.delaySpeed);
  };

  render() {
    const { array, isSorting, delaySpeed, selectedAlgorithm } = this.state;
    console.log(array);
    return (
      <div className="sorting-visualizer">
        <ToastContainer position="top-center" />
        <h1>Sorting Algorithm Visualizer</h1>
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div>
          <button onClick={() => this.bubbleSort()} disabled={isSorting}>
            Bubble Sort
          </button>
          <button onClick={() => this.selectionSort()} disabled={isSorting}>
            Selection Sort
          </button>
          <button onClick={() => this.insertionSort()} disabled={isSorting}>
            Insertion Sort
          </button>
          <button onClick={() => this.mergeSort()} disabled={isSorting}>
            Merge Sort
          </button>
          <button onClick={() => this.quickSort()} disabled={isSorting}>
            Quick Sort
          </button>
        </div>
        <div className="slider-container">
          <label htmlFor="delay-slider">
            Delay Speed: {this.state.delaySpeed}
          </label>
          <input
            type="range"
            id="delay-slider"
            min="1"
            max="100"
            value={delaySpeed}
            onChange={this.handleDelaySpeedChange}
            // disabled={isSorting}
          />
        </div>
        <div>
          <button onClick={() => this.generateArray()} disabled={isSorting}>
            Generate New Array
          </button>
          <button onClick={() => this.resetArray()} disabled={isSorting}>
            Reset Array
          </button>
        </div>
        {selectedAlgorithm && <AlgorithmInfo algorithm={selectedAlgorithm} />}
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
