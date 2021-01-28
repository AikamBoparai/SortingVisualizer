export function getHeapSortAnimations(array){
    const animations = [];
    heapSort(array,animations);
    return animations;
}

function swap(array,firstIdx,secondIdx){
    const temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
}

function heapSort(array,animations){
    var last = array.length;
    
    for(var i = Math.floor(array.length/2); i >= 0; i--){
        heapDown(array,array.length,i,animations);
    }

    for(i = array.length -1; i > 0; i--){
        animations.push([0,i,'max']);
        animations.push([0,i,'max']);
        swap(array,0,i);
        last--;
        heapDown(array,last,0,animations);
    }
    animations.push([0,0,'max']);
    animations.push([0,0,'max']);
}

function heapDown(arr, length, index,animations){
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
        animations.push([index,largest,'reg']);
        animations.push([index,largest, 'reg']);
        swap(arr,largest,index);
        heapDown(arr,length,largest,animations);
    }
}