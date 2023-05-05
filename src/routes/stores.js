import { writable } from "svelte/store";
import { browser } from "$app/environment";


// JSON.stringify(obj)
// export const history = writable(browser && (localStorage.getItem("history") || ""))
// history.subscribe((val) => browser && localStorage.setItem("history", val))

export let history = writable(browser && JSON.parse(localStorage.getItem("history") || "{}"));

console.log(JSON.stringify(history))

history.subscribe(val => {
  browser && localStorage.setItem("history", JSON.stringify(val));
});