<script>
import RangeSlider from "svelte-range-slider-pips";
import {history} from "../stores";
import RoundRange from "./RoundRange.svelte";
const { AudioContext } = window;



    const today = new Date().toLocaleDateString()
    let note;
    
    
    let currentCategory = 'none';

    let categoryList = [
      {
        name: 'none',
        color: 'gray',
        total: 0
      },
      {
        name: 'work',
        color: 'blue',
        total: 0
      },
      {
        name: 'side proj',
        color: 'red',
        total: 0
      },
      {
        name: 'reflection',
        color: 'pink',
        total: 0
      },
      {
        name: 'organize',
        color: 'orange',
        total: 0
      },
      {
        name: 'literature',
        color: 'salmon',
        total: 0
      },
      {
        name: 'literature review',
        color: 'fuchsia',
        total: 0
      },
      {
        name: 'meditation',
        color: 'goldenrod',
        total: 0
      },
      {
        name: 'gaming',
        color: 'salmon',
        total: 0
      },
      {
        name: 'dance',
        color: 'salmon',
        total: 0
      },
      {
        name: 'renoise',
        color: 'orange',
        total: 0
      },
      {
        name: 'guitar',
        color: 'yellow',
        total: 0
      }
    ]
    // localStorage: https://www.reddit.com/r/sveltejs/comments/p438og/how_to_access_localstorage_via_store_in_sveltekit/
    // https://www.youtube.com/watch?v=jOOrWeYfmlQ

    let values = [5];
    let currentInterval;
    let savedInterval;
    let endTime;
    let finishedDuration;
    // thanks chatgpt
    function orderObjectsByLatestDate(obj) {
      const sortedKeys = Object.keys(obj).sort((a, b) => new Date(b) - new Date(a));
      const sortedObj = {};
      
      for (const key of sortedKeys) {
        sortedObj[key] = obj[key];
      }
      
      return sortedObj;
    }
    function secondsToMinutesAndSeconds(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const minutesString = String(minutes).padStart(2, '0');
      const secondsString = String(remainingSeconds).padStart(2, '0');
      return `${minutesString}:${secondsString}`;
    }

    let displayedHistory = orderObjectsByLatestDate(JSON.parse(localStorage.getItem("history")))
    function addToHistory(duration) {
      const today = new Date().toLocaleDateString()
      let nextHistory = JSON.parse(localStorage.getItem("history"))

      if (nextHistory[today]) {
        if (nextHistory[today][currentCategory] == undefined) {
          nextHistory[today][currentCategory] = 0
        }
        nextHistory[today][currentCategory] += duration
      }
      else {
        const nextEntry = {
          [currentCategory]: duration
        }
        nextHistory[today] = nextEntry
      }
      console.log(nextHistory)
      history.set(nextHistory)
      displayedHistory = orderObjectsByLatestDate(nextHistory)
      note.play()
    }

    function startTimer() {
      endTime = new Date(Date.now() + values[0] * 1000);
      finishedDuration = values[0]
      let nextPush = {
        duration: finishedDuration,
        category: currentCategory
      }
      currentInterval = setInterval(() => {
        values[0] = Math.max(Math.round((endTime.getTime() - Date.now()) / 1000), 0);
        if (values[0] === 0) {
          // note.play()
          for (let i in categoryList) {
            if (categoryList[i].name === currentCategory){
              categoryList[i].total += finishedDuration
            }
          }
          addToHistory(finishedDuration)
          clearInterval(currentInterval)
          

        }
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


    // clear local storage button
  </script>
  
  <style>
    .current-category{
      text-decoration: underline;
    }
  </style>


<RoundRange />
<hr>
<hr>
<hr>    
<hr>
<hr>
<hr>
    <p>Time remaining: {values[0]} seconds</p>
    <p>{secondsToMinutesAndSeconds(values[0])}</p>
    <button on:click={stopTimer}>Pause</button>
    <button on:click={startTimer}>Resume</button>
    <hr>
    <hr>
    <hr>
    {#each categoryList as category}
    <button class="{currentCategory === category.name ? 'current-category' : ''}"
            style="color: {currentCategory === category.name ? category.color: ''}"
            on:click="{() => currentCategory = category.name}">{category.name}
    </button>
  {/each}
    <hr>
    <hr>
    <hr>
  <RangeSlider bind:values min={0} max={1800} step={10} on:change={resetTimer} />



<h1>History</h1>
{#each Object.entries(displayedHistory) as [date, list]}
    <h3>{date}</h3>
    <div style="display: flex;">
      {#each Object.entries(list) as [category, time]}
      <div>
        <h4>{category}</h4>
        <p>{secondsToMinutesAndSeconds(time)}</p>
      </div>
      {/each}
    </div>
{/each}

<!-- change volume -->
<audio src="note.wav" bind:this={note}></audio>
<button on:click={() => localStorage.clear()}>clear history</button>