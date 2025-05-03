let timerInterval, stopwatchInterval;
let timerSeconds = 0, stopwatchSeconds = 0;
const alarmSound = new Audio('./media/notification.wav');

document.addEventListener("DOMContentLoaded", () => {
  createClockNumbers();
  changeStopwachButtonType('initial');
  showClock('analog');
});

function createClockNumbers() {
    const clock = document.getElementById('clockNumbers');
    for (let i = 1; i <= 12; i++) {
      const angle = i * 30 * Math.PI / 180;
      const x = 50 + 42 * Math.sin(angle);
      const y = 50 - 42 * Math.cos(angle);
  
      const number = document.createElement('div');
      number.className = 'number';
      number.setAttribute('data-number', i);
      number.textContent = i;
      number.style.position = 'absolute';
      number.style.left = `${x}%`;
      number.style.top = `${y}%`;
      number.style.transform = 'translate(-50%, -50%)';
      clock.appendChild(number);
    }
}

function showClock(type) {
  ['analogClock', 'digitalClock', 'timer', 'stopwatch'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  
  activeTab(type);
  document.getElementById(type === 'analog' ? 'analogClock' : type === 'digital' ? 'digitalClock' : type).style.display = 'block';

  if (type === 'analog') updateAnalogClock();
  if (type === 'digital') updateDigitalClock();
}

/** Analog Clock Code Starts Here... */
function updateAnalogClock() {
  const now = new Date();
  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();

  const secondDeg = second * 6;
  const minuteDeg = minute * 6 + second * 0.1;
  const hourDeg = (hour % 12) * 30 + minute * 0.5;

  document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

  setTimeout(updateAnalogClock, 1000);
}

/** Digital Clock Code Starts Here... */
function updateDigitalClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('digitalClock').textContent = `${h}:${m}:${s}`;
  setTimeout(updateDigitalClock, 1000);
}

/** Timer Code Starts Here... */
const timers = {};

function createTimer(containerId, duration) {
  const container = document.getElementById(containerId);
  const display = container.querySelector('.timer-display');
  const progressCircle = container.querySelector('.progress');
  const fullDash = 283;

  let timeLeft = duration;
  let interval;

  function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `00:${m}:${s}`;
  }

  function updateDisplay() {
    display.textContent = formatTime(timeLeft);
    const offset = fullDash - (timeLeft / duration) * fullDash;
    progressCircle.style.strokeDashoffset = offset;
  }

  function start() {
    clearInterval(interval);
    interval = setInterval(() => {
      if (timeLeft <= 0) {
        notifyAlerm();
        clearInterval(interval);
      } else {
        timeLeft--;
        updateDisplay();
      }
    }, 1000);
  }

  function reset() {
    clearInterval(interval);
    timeLeft = duration;
    updateDisplay();
  }

  updateDisplay(); // initial call

  return { start, reset };
}

// Example usage
timers['timer1'] = createTimer('timer1', 300); 
timers['timer2'] = createTimer('timer2', 600);

/** Stopwach Code Starts Here... */
function startStopwatch() {
  clearInterval(stopwatchInterval);
  changeStopwachButtonType('start');

  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;

    const h = String(Math.floor(stopwatchSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((stopwatchSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(stopwatchSeconds % 60).padStart(2, '0');

    document.getElementById('stopwatchDisplay').textContent = `${h}:${m}:${s}`;
  }, 1000);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  changeStopwachButtonType('reset');
  stopwatchSeconds = 0;
  document.getElementById('stopwatchDisplay').textContent = '00:00:00';
}

function stopStopWatch(){
  changeStopwachButtonType('stop');
  clearInterval(stopwatchInterval);
}

function changeStopwachButtonType(btn) {
  let startBtn = document.getElementById('startStopwatch');
  let stopBtn = document.getElementById('stopStopWatch');
  let resetBtn = document.getElementById('resetBtn');

  if(btn === "initial"){
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
  }

  if (btn === "start") {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
  }

  if (btn === "stop") {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
  }

  if (btn === "reset") {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
  }
}

function activeTab(type){
  let activeLinkId = (type === "analog") 
  ? 'analogLink' 
  : ((type === "digital") 
    ? 'digitalLink' 
    : ((type === "timer") 
      ? 'timerLink' 
      : 'stopwatchLink'));

      let removeActiveClass = document.getElementById(document.querySelector('.navbar-nav .active').id);
      removeActiveClass.classList.remove('active');
  
      document.getElementById(activeLinkId).classList.add('active');
}

function notifyAlerm(){
  alarmSound.play();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your Time is Up",
    showConfirmButton: false,
    timer: 1500
  });
}