import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/bubbleSort.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/quickSort.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/heapSort.js';

const PRIMARY_COLOR = '#778899';
const SECONDARY_COLOR = 'red';
const TERTIARY_COLOR = 'gold';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        var numBars = window.innerWidth * 0.15;
        for(let i = 0; i < numBars; i++){
            array.push(randomIntInInterval(5,850));
        }
        this.setState({array});
        this.resetColors();
    }

    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            }, i * 5);
        } 
        else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * 5);
            }
        }
    }
    quickSort(){
        const animations = getQuickSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const[firstIdx,secondIdx,desc] = animations[i];
            if(desc === 'pivotChange'){
                setTimeout(() => {
                    arrayBars[firstIdx].style.backgroundColor = TERTIARY_COLOR;
                }, i * 15);
            }
            else if(desc === 'pivotRevert'){
                setTimeout(() => {
                    arrayBars[firstIdx].style.backgroundColor = PRIMARY_COLOR;
                }, i * 15);
            }
            else if(desc === 'swapColor'){
                const barOne = arrayBars[firstIdx];
                const barTwo = arrayBars[secondIdx];
                setTimeout(() => {
                    barOne.style.backgroundColor = SECONDARY_COLOR;
                    barTwo.style.backgroundColor = SECONDARY_COLOR;
                }, i * 15);
            }
            else{
                const barOne = arrayBars[firstIdx];
                const barTwo = arrayBars[secondIdx];
                setTimeout(() => {
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                }, i * 15);

                setTimeout(() => {
                    barOne.style.backgroundColor = PRIMARY_COLOR;
                    barTwo.style.backgroundColor = PRIMARY_COLOR;
                }, i * 15);
            }
        }
    }
    heapSort(){
        const animations = getHeapSortAnimations(this.state.array);
        let counter = 1;
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const[firstIdx,secondIdx,desc] = animations[i];
            const barOne = arrayBars[firstIdx];
            const barTwo = arrayBars[secondIdx];
            if(i % 2 == 0){
                setTimeout(() => {
                    barOne.style.backgroundColor = SECONDARY_COLOR;
                    barTwo.style.backgroundColor = SECONDARY_COLOR;
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                }, i * 15);
            }
            else{
                setTimeout(() => {
                    barOne.style.backgroundColor = PRIMARY_COLOR;
                    barTwo.style.backgroundColor = PRIMARY_COLOR;
                }, i * 15);
            }

            if(desc == 'max' && i %2 == 1){
                setTimeout(() => {
                    arrayBars[arrayBars.length - counter].style.backgroundColor = 'green';
                    counter++;
                }, i * 15);
            }

        }
    }

    resetColors(){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i =0; i < arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }
    bubbleSort(){
        const animations = getBubbleSortAnimations(this.state.array);
        let counter = 1;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i =0; i < animations.length; i++){
            const [barOneIdx,desc] = animations[i];
            const barOne = arrayBars[barOneIdx];
            const barTwo = arrayBars[barOneIdx+1];
            if(desc == 'swap'){
                setTimeout(() => {
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                }, i * 5);
            }
            else{
                setTimeout(() => {
                    arrayBars[arrayBars.length - counter].style.backgroundColor = 'green';
                    counter++;
                }, i * 5);
            }
        }

        

    }

    render(){
        const {array} = this.state;

        return(
            <div className="array-container">
               {array.map((value,idx) =>(
                   <div className = "array-bar" key={idx} style={{height:`${value}px`}}>
                   </div>
               ))}
               <div>
                <button className="new-array-btn" onClick={() => this.resetArray()} >Generate New Array</button>
                <button className="merge-sort-btn" onClick={() => this.mergeSort()} >Merge Sort</button>
                <button className="quick-sort-btn" onClick={() => this.quickSort()} >Quick Sort</button>
                <button className="heap-sort-btn" onClick={() => this.heapSort()} >Heap Sort</button>
                <button className="bubble-sort-btn" onClick={() => this.bubbleSort()} >Bubble Sort</button>
               </div>
            </div>
        );
    }
}

function randomIntInInterval(min,max){
    //inclusive of max and min
    return Math.floor(Math.random() * (max - min + 1) + 1);
}