# Sorting Algorithm Visualizer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In this project I show more techinical and algorithmic knowledge with a sorting visualizers proving that I understand the various sorting algorithms and what is actually happening visually. For each sorting algorithm I will give the pseudo code, complexity analysis, advantages, and disadvantages.

## Bubble Sort

- Pseudo Code

```
      function bubbleSort(array)
        for i from 0 to array.length - 1
          for j from 0 to array.length - i - 1
            if array[j] > array[j + 1]
              swap array[j] and array[j + 1]
```

- Complexity Analysis
  - Time Complexity: O(n^2)
  - Space Complexity: O(1)
- Advantages
  - Simple implementation and easy to understand
  - Stable sorting algorithm, meaning that elements with the same key value maintain their relative order in the sorted output
- Disadvantages
  - Inefficient for large datasets
  - Comparison-based sorting algorithm, which means that a comparison operator is used to determine the relative order of elements in the input data set and limits the efficiency of the algorithm in certain cases

## Selection Sort

- Pseudo Code

```
      function selectionSort(array)
        for i from 0 to array.length - 1
          minIndex = i
            for j from i + 1 to array.length
              if array[j] < array[minIndex]
                minIndex = j
              swap array[i] and array[minIndex]

```

- Complexity Analysis
  - Time Complexity: O(n^2)
  - Space Complexity: O(1)
- Advantages
  - Simple implementation and easy to understand
  - In-place sorting algorithm, meaning it doesn't require additional memory
- Disadvantages
  - Inefficient for large datasets
  - It doesn't adapt to the input, so it performs the same number of comparisons and swaps even if the array is partially sorted

## Insertion Sort

- Pseudo Code

```
      function insertionSort(array)
        for i from 1 to array.length - 1
          key = array[i]
            j = i - 1
            while j >= 0 and array[j] > key
              array[j + 1] = array[j]
              j = j - 1
            array[j + 1] = key
```

- Complexity Analysis
  - Time Complexity: O(n^2)
  - Space Complexity: O(1)
- Advantages
  - Simple implementation and easy to understand
  - Efficient for small datasets or partially sorted arrays
- Disadvantages
  - Inefficient for large datasets
  - Slower than more advanced sorting algorithms

## Merge Sort
<<<<<<< HEAD
- pseudo code
- complexity analysis
- advantages
- disadvantages
=======

- Pseudo Code

```
      function mergeSort(array):
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
```

- Complexity Analysis
  - Time Complexity: O(n log n)
  - Space Complexity: O(n)
- Advantages
  - Stable sorting, which means that it preserves the relative order of elements with equal values. This property is important in certain applications
  - Consistent O(n log n) performance
  - Suitable for linked-lists due to its divide-and-conquer nature
- Disadvantages
  - Extra memory used during the merging process when storing sorted elements

## Quick Sort

- Pseudo Code

```
    function quickSort(array, low, high):
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
```

- Complexity Analysis
  - Time Complexity: O(n log n)
  - Space Complexity: O(log n)
- Advantages
  - Efficient average case performance
  - In-place sorting, meaning it doesn't require additional memory for storing temporary arrays or data structures
  - Space/memory efficient as it has O(n) space complexity
- Disadvantages
  - Worse case time complexity is O(n^2)
  - Not stable, which means the relative order of equal elements may change during the sorting process.
>>>>>>> 025b2ed (merge sort + quick sort added, update readme)
