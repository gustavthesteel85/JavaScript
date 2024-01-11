## Basic of JavaScript

### sync/async
* sync: executed in the sequence
* async: asynchronus programmes are difficult to write and difficult to debug
* concurrent: default. Main thread.
* parallel: Web Worker API. Worker thread.

* try ~ catch  
we can't catch error `throw new Error()` in async function.
Because, all sync process finish first. __Then, `setTimeout` execute later__.
  ```
  try {
    setTimeout(() => {
        throw new Error("async err");
    }, 10);
  } catch (error) {
    // not executed
  }
  console.log("executed");
  ```

  So, if we want to catch the async error, we have to use `try ~ catch` in `setTimeout` as callback function which is sync process.
  ```
  // outside of async
  setTimeout(() => {
	// inside of async
    try {
        throw new Error("error");
    } catch (error) {
        console.log("catchable error");
    }
  }, 1000);
  console.log("executed");
  ```

### Promise

### Reference
https://jsprimer.net/
https://www.w3schools.com/js/
https://javascript.info/
https://www.javascripttutorial.net/
