import React from 'react';
import './SortingVisualizer.css';

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

        for(let i = 0; i < 400; i++){
            array.push(randomIntInInterval(5,850));
        }
        this.setState({array});
    }

    mergeSort(){

    }
    quickSort(){

    }
    heapSort(){

    }
    bubbleSort(){

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