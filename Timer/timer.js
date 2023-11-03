let $startbtn = document.getElementById('start');
let $pausebtn = document.getElementById('pause');
let $resetbtn = document.getElementById('reset');

let $hours = document.getElementById('hr');
let $minutes = document.getElementById('min');
let $seconds = document.getElementById('sec');
let $count = document.getElementById('count');

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let ToClear;


$startbtn.onclick = () => {
    ToClear = setInterval(startTimer,10);
    $startbtn.style.display = 'none';
    $pausebtn.style.display = 'block';
}

$pausebtn.onclick = () => {
    clearInterval(ToClear);
    $pausebtn.style.display = 'none';
    $startbtn.style.display = 'block';
}

$resetbtn.onclick = () => {
    clearInterval(ToClear);
     hour = 0;
     minute = 0;
     second = 0;
     count = 0;
     $count.textContent = '00';
     $seconds.textContent = '00';
     $minutes.textContent = '00';
     $hours.textContent =  '00';

     $pausebtn.style.display = 'none';
     $startbtn.style.display = 'block';
}

function startTimer(){
        count++;
        if(count === 100){
            second++;
            count = 0;
        }
        if(second === 60){
            minute++;
            second = 0;
        }
        if(minute === 60){
            hour++;
            minute = 0;
            second = 0;
        }


        if(count < 10){
            $count.textContent = '0' + count;
        }
        else{
            $count.textContent = count;
        }
        if(second < 10){
            $seconds.textContent = '0' + second;
        }
        else{
            $seconds.textContent = second;
        }
        if(minute < 10){
            $minutes.textContent = '0' + minute;
        }
        else{
            $minutes.textContent = minute;
        }
        if(hour < 10){
            $hours.textContent = '0' + hour;
        }
        else{
            $hours.textContent =  hour;
        }
    
    console.log(hour , minute, second, count)
}


