import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';

const PRIMARY_COLOR = '#778899';
const SECONDARY_COLOR = 'red';

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

        for(let i = 0; i < 200; i++){
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
            }, i * 1);
        } 
        else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * 1);
            }
        }
    }
    quickSort(){
        const animations = getQuickSortAnimations(this.state.array);
        this.setState({animations});
    }
    heapSort(){

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
                }, i * 1);
            }
            else{
                setTimeout(() => {
                    arrayBars[arrayBars.length - counter].style.backgroundColor = 'green';
                    counter++;
                }, i * 1);
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