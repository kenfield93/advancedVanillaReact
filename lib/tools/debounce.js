/**
 * Created by kyle on 10/1/17.
 */

export default function debounce(func, timer){
    let timeoutId;
    return function(){
         //just needed for apply since setTimeout is calling func
        let callee = this;
        let args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>{func.apply(callee, args);}, timer);
    }
}

