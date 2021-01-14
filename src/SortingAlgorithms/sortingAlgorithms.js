export function getMergeSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;
    const helper = array.slice();
    mergeSort(array,helper,0,array.length-1,animations);
    return animations;
}

function mergeSort(array,helper,start,end,animations){
    if(start < end){
        const middle = Math.floor((start+end)/2);
        mergeSort(helper,array,start,middle,animations);
        mergeSort(helper,array,middle+1,end,animations);
        merge(array,helper,start,middle,end,animations);
    }
    else{
        return;
    }
}

function merge(array,helper,start,middle,end,animations){
    
    let current = start;
    let helperLeft = start;
    let helperRight = middle + 1;
    while (helperLeft <= middle && helperRight <= end) {
        animations.push([helperLeft, helperRight]);
        animations.push([helperLeft, helperRight]);
        if (helper[helperLeft] <= helper[helperRight]) {
        animations.push([current, helper[helperLeft]]);
        array[current++] = helper[helperLeft++];
        } else {
        animations.push([current, helper[helperRight]]);
        array[current++] = helper[helperRight++];
        }
    }
    while (helperLeft <= middle) {
        animations.push([helperLeft, helperLeft]);
        animations.push([helperLeft, helperLeft]);
        animations.push([current, helper[helperLeft]]);
        array[current++] = helper[helperLeft++];
    }
    while (helperRight <= end) {
        animations.push([helperRight, helperRight]);
        animations.push([helperRight, helperRight]);
        animations.push([current, helper[helperRight]]);
        array[current++] = helper[helperRight++];
    }
}

export function getBubbleSortAnimations(array){
    const animations = [];
    let numSwaps;
    let numRuns = 1;
    do{
        numSwaps = 0;
        for(let i = 0; i < array.length -1; i++){
            if(array[i] > array[i+1]){
                animations.push([i,'swap']);
                let temp = array[i+1];
                array[i+1] = array[i];
                array[i] = temp;
                numSwaps++;
            }
        }
        animations.push([0,'last']);
        numRuns++;
    }while(numSwaps != 0);

    while(numRuns <= array.length){
        animations.push([array.length-numRuns,'last']);
        numRuns++;
    }

    return animations;
}