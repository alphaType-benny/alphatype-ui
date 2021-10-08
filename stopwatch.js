var Stopwatch = function(elem, options) {

    var timer = createTimer(),
      startButton = createButton("start", start),
      stopButton = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      clock,
      interval;
  
    // default options
    options = options || {};
    options.delay = options.delay || 1;
  
    // append elements     
    elem.appendChild(timer);
    elem.appendChild(startButton);
    elem.appendChild(stopButton);
    elem.appendChild(resetButton);
  
    // initialize
    reset();
  
    // private functions
    function createTimer() {
      return document.createElement("span");
    }
  
    function createButton(action, handler) {
      var a = document.createElement("a");
      a.href = "#" + action;
      a.innerHTML = action;
      a.addEventListener("click", function(event) {
        handler();
        event.preventDefault();
      });
      return a;
    }
  
    function start() {
      if (!interval) {
        offset = Date.now();
        interval = setInterval(update, options.delay);
      }
    }
  
    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  
    function reset() {
      clock = 0;
      render(0);
    }
  
    function update() {
      clock += delta();
      render();
    }
  
    function render() {
      timer.innerHTML = clock / 1000;
    }
  
    function delta() {
      var now = Date.now(),
        d = now - offset;
  
      offset = now;
      return d;
    }
  
    // public API
    this.start = start;
    this.stop = stop;
    this.reset = reset;
  };
  
  
  // basic examples
  var elems = document.getElementsByClassName("basic");
  
  for (var i = 0, len = elems.length; i < len; i++) {
    new Stopwatch(elems[i]);
  }
  
  
  // programmatic examples
  var a = document.getElementById("a-timer");
  aTimer = new Stopwatch(a);
  aTimer.start();
  
{/* <h2>Basic example; update every 1 ms</h2>

<p>click <code>start</code> to start a stopwatch</p>

<pre>
var elems = document.getElementsByClassName("basic");
  
for (var i=0, len=elems.length; i&lt;len; i++) {
  new Stopwatch(elems[i]);
}
</pre>
<div class="basic stopwatch"></div>
<div class="basic stopwatch"></div>

<hr>
<h2>Programmatic example</h2>

<p><strong>Note:</strong> despite the varying <code>delay</code> settings, each stopwatch displays the correct time (in seconds)</p>

<pre>
var a = document.getElementById("a-timer");
aTimer = new Stopwatch(a);
aTimer.start();
</pre> */
/* <div class="stopwatch" id="a-timer"></div>1 ms<br>} */}