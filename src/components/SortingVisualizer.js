import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlgorithmInfo from './AlgorithmInfo';

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            isSorting: false,
            delaySpeed: 10,
            selectedAlgorithm: null,
        };
    }

    componentDidMount() {
        this.generateArray();
    }

    generateArray() {
        this.setState({ selectedAlgorithm: null })
        const array = [];
        for (let i = 0; i < 50; i++) {
            array.push(randomIntFromInterval(5, 400));
        }
        // console.log(array)
        this.setState({ array });
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
            toast.success('Already sorted! Generate a new array to visualize another sorting algorithm.')
            return true;
        }
        return false;
    }


    bubbleSort() {
        if (this.isSortingOrSorted())
            return
        // Set isSorting to true to disable other buttons
        this.setState({ isSorting: true });
        this.setState({ selectedAlgorithm: 'Bubble Sort' });
        const { array } = this.state
        const sortedArray = array.slice();
        const animations = [];

        // bubble sort algorithm
        for (let i = 0; i < sortedArray.length - 1; i++) {
            for (let j = 0; j < sortedArray.length - i - 1; j++) {
                // Add animation for comparing two elements
                animations.push([j, j + 1, 'compare']);
                if (sortedArray[j] > sortedArray[j + 1]) {
                    // Swap the elements
                    animations.push([j, j + 1, 'swap']);
                    const temp = sortedArray[j];
                    sortedArray[j] = sortedArray[j + 1];
                    sortedArray[j + 1] = temp;
                }
            }
        }

        this.animateSorting(animations, sortedArray);
    }

    selectionSort() {
        if (this.isSortingOrSorted())
            return
        // Set isSorting to true to disable other buttons
        this.setState({ isSorting: true });
        this.setState({ selectedAlgorithm: 'Selection Sort' });
        const { array } = this.state
        const sortedArray = array.slice();
        const animations = [];

        // selection sort algorithm
        for (let i = 0; i < sortedArray.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < sortedArray.length; j++) {
                // Add animation for comparing two elements
                animations.push([j, minIndex, 'compare']);
                if (sortedArray[j] < sortedArray[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                // Swap the elements
                animations.push([minIndex, i, 'swap']);
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
        this.setState({ selectedAlgorithm: 'Insertion Sort' })
        const { array } = this.state;
        const sortedArray = array.slice();
        const animations = [];

        // insertion sort algorithm
        for (let i = 1; i < sortedArray.length; i++) {
            const key = sortedArray[i];
            let j = i - 1;

            // Add animation for comparing key with previous element
            animations.push([i, j, 'compare']);

            while (j >= 0 && sortedArray[j] > key) {
                // Add animation for swapping elements
                animations.push([j, j + 1, 'swap']);
                sortedArray[j + 1] = sortedArray[j];
                j--;
            }

            // Place the key at its correct position
            sortedArray[j + 1] = key;
        }

        this.animateSorting(animations, sortedArray);
    }

    mergeSort() {
        if (this.isSortingOrSorted())
            return
        toast.warning('Merge Sort Coming Soon...')
        return
    }

    quickSort() {
        if (this.isSortingOrSorted())
            return
        toast.warning('Quick Sort Coming Soon...')
        return
    }

    heapSort() {
        if (this.isSortingOrSorted())
            return
        toast.warning('Heap Sort Coming Soon...')
        return
    }

    animateSorting(animations, sortedArray) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const animationSpeed = this.state.delaySpeed; // Adjust the animation speed as needed
        const resetDelay = animations.length * animationSpeed + 400;

        for (let i = 0; i < animations.length; i++) {
            const [barOneIdx, barTwoIdx, animationType] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const delay = i * animationSpeed;

            setTimeout(() => {
                if (animationType === 'compare') {
                    // Apply animation for comparing two elements
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'red';

                    // Reset the colors after the comparison
                    setTimeout(() => {
                        barOneStyle.backgroundColor = '#007bff';
                        barTwoStyle.backgroundColor = '#007bff';
                    }, delay + animationSpeed);
                } else if (animationType === 'swap') {
                    // Apply animation for swapping two elements
                    barOneStyle.backgroundColor = 'green';
                    barTwoStyle.backgroundColor = 'green';

                    // Swap the heights of the bars
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;

                    // Reset the colors after the swap
                    setTimeout(() => {
                        barOneStyle.backgroundColor = '#007bff';
                        barTwoStyle.backgroundColor = '#007bff';
                    }, delay + animationSpeed);
                }
            }, delay);
        }

        // Reset the colors of all bars and show the notification
        setTimeout(() => {
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = '#007bff';
            }
            // Update the state with the sorted array
            this.setState({ array: sortedArray });
            this.setState({ isSorting: false })
            toast.success('Congratulations! The array is now sorted!');
        }, resetDelay);
    }

    handleDelaySpeedChange = (event) => {
        this.setState({ delaySpeed: parseInt(event.target.value) });
        console.log(this.state.delaySpeed)
    }

    render() {
        const { array, isSorting, delaySpeed, selectedAlgorithm } = this.state;
        // console.log(array)
        return (
            <div className='sorting-visualizer'>
                <ToastContainer position="top-center" />
                <h1>Sorting Algorithm Visualizer</h1>
                <div className='array-container'>
                    {array.map((value, index) => (
                        <div
                            className='array-bar'
                            key={index}
                            style={{ height: `${value}px` }}>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={() => this.bubbleSort()} disabled={isSorting}>Bubble Sort</button>
                    <button onClick={() => this.selectionSort()} disabled={isSorting}>Selection Sort</button>
                    <button onClick={() => this.insertionSort()} disabled={isSorting}>Insertion Sort</button>
                    <button onClick={() => this.mergeSort()} disabled={isSorting}>Merge Sort</button>
                    <button onClick={() => this.quickSort()} disabled={isSorting}>Quick Sort</button>
                    <button onClick={() => this.heapSort()} disabled={isSorting}>Heap Sort</button>
                </div>
                <div className="slider-container">
                    <label htmlFor="delay-slider">Delay Speed: {this.state.delaySpeed}</label>
                    <input
                        type="range"
                        id="delay-slider"
                        min="1"
                        max="100"
                        value={delaySpeed}
                        onChange={this.handleDelaySpeedChange}
                        disabled={isSorting}
                    />
                </div>
                <button onClick={() => this.generateArray()} disabled={isSorting}>Generate New Array</button>
                {selectedAlgorithm && (
                    <AlgorithmInfo algorithm={selectedAlgorithm} />
                )}
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
