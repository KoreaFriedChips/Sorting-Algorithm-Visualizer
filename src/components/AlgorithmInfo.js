import React from "react";

const AlgorithmInfo = ({ algorithm }) => {
  // Define the algorithm details based on the algorithm name
  let pseudoCode = "";
  let complexity = [];
  let advantages = [];
  let disadvantages = [];

  if (algorithm === "Bubble Sort") {
    pseudoCode = `      function bubbleSort(array)
        for i from 0 to array.length - 1
          for j from 0 to array.length - i - 1
            if array[j] > array[j + 1]
              swap array[j] and array[j + 1]
    `;
    complexity = [
      <span>
        Time Complexity: O(n<sup>2</sup>)
      </span>,
      "Space Complexity: O(1)",
    ];
    advantages = [
      "Simple implementation and easy to understand",
      "Stable sorting algorithm, meaning that elements with the same key value maintain their relative order in the sorted output",
    ];
    disadvantages = [
      "Inefficient for large datasets",
      "Comparison-based sorting algorithm, which means that a comparison operator is used to determine the relative order of elements in the input data set and limits the efficiency of the algorithm in certain cases",
    ];
  } else if (algorithm === "Selection Sort") {
    pseudoCode = `      function selectionSort(array)
        for i from 0 to array.length - 1
          minIndex = i
            for j from i + 1 to array.length
              if array[j] < array[minIndex]
                minIndex = j
              swap array[i] and array[minIndex]
      
    `;
    complexity = [
      <span>
        Time Complexity: O(n<sup>2</sup>)
      </span>,
      "Space Complexity: O(1)",
    ];
    advantages = [
      "Simple implementation",
      "Easy to understand",
      "In-place sorting algorithm, meaning it doesn't require additional memory",
    ];
    disadvantages = [
      "Inefficient for large datasets",
      "It doesn't adapt to the input, so it performs the same number of comparisons and swaps even if the array is partially sorted",
    ];
  } else if (algorithm === "Insertion Sort") {
    pseudoCode = `      function insertionSort(array)
        for i from 1 to array.length - 1
          key = array[i]
            j = i - 1
            while j >= 0 and array[j] > key
              array[j + 1] = array[j]
              j = j - 1
            array[j + 1] = key
        `;
    complexity = [
      <span>
        Time Complexity: O(n<sup>2</sup>)
      </span>,
      "Space Complexity: O(1)",
    ];
    advantages = [
      "Simple implementation",
      "Efficient for small datasets or partially sorted arrays",
    ];
    disadvantages = [
      "Inefficient for large datasets",
      "Slower than more advanced sorting algorithms",
    ];
  } else if (algorithm === "Merge Sort") {
    pseudoCode = `      function mergeSort(array):
        if length of array <= 1:
          return array
        
        mid = length of array / 2
        leftArray = mergeSort(subarray from start to mid)
        rightArray = mergeSort(subarray from mid+1 to end)
        
        return merge(leftArray, rightArray)
      
      function merge(leftArray, rightArray):
        mergedArray = empty array
        leftIndex = 0
        rightIndex = 0
        
        while leftIndex < length of leftArray and rightIndex < length of rightArray:
          if leftArray[leftIndex] <= rightArray[rightIndex]:
            append leftArray[leftIndex] to mergedArray
            increment leftIndex
          else:
            append rightArray[rightIndex] to mergedArray
            increment rightIndex
            
        append remaining elements in leftArray (if any) to mergedArray
        append remaining elements in rightArray (if any) to mergedArray
        
        return mergedArray
        `;
    complexity = ["Time Complexity: O(n log n)", "Space Complexity: O(n)"];
    advantages = [
      "Stable sorting, which means that it preserves the relative order of elements with equal values. This property is important in certain applications",
      "Consistent O(n log n) performance",
      "Suitable for linked-lists due to its divide-and-conquer nature",
    ];
    disadvantages = [
      "Extra memory used during the merging process when storing sorted elements",
    ];
  } else if (algorithm === "Quick Sort") {
    pseudoCode = `    function quickSort(array, low, high):
      if low < high:
        pivotIndex = partition(array, low, high)
        quickSort(array, low, pivotIndex - 1)
        quickSort(array, pivotIndex + 1, high)
    
    function partition(array, low, high):
      pivot = array[high]
      i = low - 1
        
      for j = low to high - 1:
      if array[j] <= pivot:
        i = i + 1
        swap array[i] and array[j]
        
      swap array[i + 1] and array[high]
      return i + 1
        `;
    complexity = ["Time Complexity: O(n log n)", "Space Complexity: O(log n)"];
    advantages = [
      "Efficient average case performance",
      "In-place sorting, meaning it doesn't require additional memory for storing temporary arrays or data structures",
      "Space/memory efficient as it has O(n) space complexity",
    ];
    disadvantages = [
      "Worse case time complexity is O(n^2)",
      "Not stable, which means the relative order of equal elements may change during the sorting process.",
    ];
  }

  return (
    <div className="algorithm-info">
      <h2>{algorithm} Details</h2>
      <div className="columns">
        <div className="column">
          <h3>Pseudo Code:</h3>
          <pre className="pseudo-code">{pseudoCode}</pre>
        </div>
        <div>
          <h3>Complexity:</h3>
          <ul>
            {complexity.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Advantages:</h3>
          <ul>
            {advantages.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Disadvantages:</h3>
          <ul>
            {disadvantages.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
