<script>
import RangeSlider from "svelte-range-slider-pips";
import {history} from "../stores";

    const today = new Date().toLocaleDateString()
    console.log(today)
    let note = new Audio('note.wav')
    // categories
    let currentCategory = 'none';

    // console.log(localStorage.getItem("categories"))
    
    let categoryList = [
      {
        name: 'none',
        color: 'gray',
        total: 0
      },
      {
        name: 'ocho',
        color: 'blue',
        total: 0
      },
      {
        name: 'work',
        color: 'orange',
        total: 0
      },
      {
        name: 'cat3',
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
    // let history = {
    //   '4/23/2023': {
    //     'cat3': 20
    //   }
    // }
    let displayedHistory = JSON.parse(localStorage.getItem("history"))
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
      displayedHistory = nextHistory
    }
    // function addToHistory(duration) {
    //   const today = new Date().toLocaleDateString()
    //   console.log(duration, currentCategory)

    //   if (history[today]) {
    //     if (history[today][currentCategory] == undefined) {
    //       history[today][currentCategory] = 0
    //     }
    //     history[today][currentCategory] += duration
    //   }
    //   else {
    //     const nextEntry = {
    //       [currentCategory]: duration
    //     }
    //     history[today] = nextEntry
    //   }
    //   console.log(history)
    // }

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

    
    


  </script>
  
  <style>
    .current-category{
      text-decoration: underline;
    }
  </style>


      {#each categoryList as category}
        <button class="{currentCategory === category.name ? 'current-category' : ''}"
                style="color: {currentCategory === category.name ? category.color: ''}"
                on:click="{() => currentCategory = category.name}">{category.name}
        </button>
      {/each}

    <p>Time remaining: {values[0]} seconds</p>
    <p>{Math.floor(values[0] / 60)}m {Math.floor(values[0] % 60)}s</p>
    <button on:click={stopTimer}>Pause</button>
    <button on:click={startTimer}>Resume</button>


  <RangeSlider bind:values min={0} max={20} step={1} float on:change={resetTimer} />

  <!-- {#each history as entry}
        <p>{entry.duration} in {entry.category}</p>
  {/each} -->

  {#each categoryList as category}
        <p>{category.name} total time: {category.total}</p>
  {/each}


<h1>History</h1>
{#each Object.entries(displayedHistory) as [date, list]}
    <h3>{date}</h3>
    <div style="display: flex;">
      {#each Object.entries(list) as [category, time]}
      <div>
        <h4>{category}</h4>
        <p>{time}</p>
      </div>
      {/each}
    </div>
{/each}