<script>
  export let defaultDuration = 90;
  export let values;
  let intervalId;
  let endTime = new Date();
  let remainingTime = defaultDuration;

  function startTimer() {
    endTime = new Date(Date.now() + remainingTime * 1000);
    intervalId = setInterval(() => {
      remainingTime = Math.max(Math.round((endTime.getTime() - Date.now()) / 1000), 0);
      if (remainingTime === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function resetTimer() {
    stopTimer();
    remainingTime = defaultDuration;
    endTime = new Date(Date.now() + remainingTime * 1000);
  }

  function handleDurationChange(event) {
    defaultDuration = Number(event.target.value);
    resetTimer();
  }

  $: sliderValue = (remainingTime / defaultDuration) * 100;

  function getSliderThumbPosition() {
    const thumb = document.querySelector('.timer-slider::-webkit-slider-thumb');
    const track = document.querySelector('.timer-slider::-webkit-slider-runnable-track');
    const thumbWidth = parseInt(window.getComputedStyle(thumb).getPropertyValue('width'));
    const sliderWidth = parseInt(window.getComputedStyle(track).getPropertyValue('width'));
    const offset = (thumbWidth / 2) - (sliderWidth * (100 - sliderValue) / 100);
    return `${sliderValue}% { transform: translateX(${offset}px) }`;
  }

  $: sliderThumbPosition = getSliderThumbPosition();

</script>

<style>
  .timer-slider {
    display: block;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    border-radius: 5px;
    background-color: #ddd;
    outline: none;
    margin: 12px 0;
  }

  .timer-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0080ff;
    cursor: pointer;
  }

  .timer-slider::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 5px;
    background-color: #ddd;
  }

  .timer-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0080ff;
    cursor: pointer;
  }
</style>

<div>
  <p>Time remaining: {remainingTime} seconds</p>
  <input class="timer-slider" type="range" min="1" max="300" step="1" value={defaultDuration} on:input={handleDurationChange} style={$sliderThumbPosition}>
  <button on:click={startTimer}>Start</button>
  <button on:click={stopTimer}>Stop</button>
  <button on:click={resetTimer}>Reset</button>
</div>
