<script>
import RangeSlider from "svelte-range-slider-pips";

    let values = [40];
    let currentInterval;
    let savedInterval;
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
      savedInterval = currentInterval;
      console.log(savedInterval)
      clearInterval(currentInterval);
    }
  
    function resetTimer() {
      stopTimer();
      startTimer();
    }
    // categories
    let currentCategory = 'none';

    let categoryList = ['none', 'cat 1', 'cat 2', 'cat3']
    let objectList = [
      {
        name: 'none',
        color: 'gray'
      },
      {
        name: 'cat1',
        color: 'blue'
      },
      {
        name: 'cat2',
        color: 'orange'
      },
      {
        name: 'cat3',
        color: 'yellow'
      }
    ]


  </script>
  
  <style>
    .current-category{
      text-decoration: underline;
    }
  </style>


      {#each objectList as category}
        <button class="{currentCategory === category.name ? 'current-category' : ''}"
                style="color: {currentCategory === category.name ? category.color: ''}"
                on:click="{() => currentCategory = category.name}">{category.name}
        </button>
      {/each}

    <p>Time remaining: {values[0]} seconds</p>
    <button on:click={stopTimer}>Pause</button>
    <button on:click={startTimer}>Resume</button>


  <RangeSlider bind:values min={0} max={60} float on:change={resetTimer}/>