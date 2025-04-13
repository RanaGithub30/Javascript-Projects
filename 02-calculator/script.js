function clearDisplay(){
    document.getElementById('display').value = "";
}

function appendValue(value){
    document.getElementById('display').value += value;
}

function calculate(){
    let display = document.getElementById('display');
    try{
        display.value = eval(display.value);
    }catch(e){
        display.value = "Error";
    }
}

function deleteLast(){
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}