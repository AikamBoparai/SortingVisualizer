export function getHeapSortAnimations(array){
    const animations = [];
    heapSort(array);
    console.log(array);
    return array;
}

function swap(array,firstIdx,secondIdx){
    const temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
}

function heapSort(array){
    var last = array.length;
    
    for(var i = Math.floor(array.length/2); i >= 0; i--){
        heapDown(array,array.length,i);
    }

    for(i = array.length -1; i > 0; i--){
        swap(array,0,i);
        last--;
        heapDown(array,last,0);
    }
}

function heapDown(arr, length, index){
    var largest = index;
    var left = 2 * index + 1;
    var right = 2 * index + 2;

    if(left < length && arr[left] > arr[largest]){
        largest = left;
    }

    if(right < length && arr[right] > arr[largest]){
        largest = right;
    }

    if(largest != index){
        swap(arr,largest,index);
        heapDown(arr,length,largest);
    }
}