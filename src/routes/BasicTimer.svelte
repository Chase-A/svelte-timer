<script>
import RangeSlider from "svelte-range-slider-pips";

    let values = [40];
    let currentInterval;
    let endTime;

    function startTimer() {
      endTime = new Date(Date.now() + values[0] * 1000);
      currentInterval = setInterval(() => {
        values[0] = Math.max(Math.round((endTime.getTime() - Date.now()) / 1000), 0);
        if (values[0] === 0) {
          clearInterval(currentInterval);
        }
        console.log(currentInterval)
        console.log(values[0])
      }, 1000);
    }
  
    function stopTimer() {
      clearInterval(currentInterval);
    }
  
    function resetTimer() {
      stopTimer();
      startTimer();
    }
  </script>
  

  

    <p>Time remaining: {values[0]} seconds</p>
    <button on:click={stopTimer}>Stop</button>


  <RangeSlider bind:values min={0} max={60} float on:change={resetTimer}/>