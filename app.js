const timerEl = document.getElementById('time');
const modeEl = document.getElementById('mode');
const circle = document.getElementById('circle');
const setEl = document.getElementById('currentSet');
const btn = document.getElementById('startStop');
const closeBtn = document.getElementById('closeBtn');
const resetBtn = document.getElementById('resetBtn');
const beepSet = document.getElementById('beepSet');
const beepRest = document.getElementById('beepRest');

let running = false;
let stopRequested = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

btn.addEventListener('click', async () => {
  if (running) {
    stopRequested = true;
    running = false;
    btn.textContent = 'Start';
    return;
  }

  running = true;
  stopRequested = false;
  btn.textContent = 'Stop';

  const setTime = Number(document.getElementById('setTime').value);
  const restTime = Number(document.getElementById('restTime').value);
  const totalSets = Number(document.getElementById('totalSets').value);

  for (let currentSet = 1; currentSet <= totalSets; currentSet++) {
    if (stopRequested) break;

    // 🔴 SET
    beepSet.play();
    modeEl.textContent = 'SET';
    circle.className = 'circle set';
    setEl.textContent = currentSet;

    for (let t = 1; t <= setTime; t++) {
      if (stopRequested) break;
      timerEl.textContent = t;
      await sleep(1000);
    }

    if (stopRequested) break;

    // 1 second pause
    timerEl.textContent = '';
    await sleep(1000);

    // 🔵 REST (skip after last set)
    if (currentSet < totalSets) {
      beepRest.play();
      modeEl.textContent = 'REST';
      circle.className = 'circle rest';

      for (let r = restTime; r > 0; r--) {
        if (stopRequested) break;
        timerEl.textContent = r;
        await sleep(1000);
      }

      timerEl.textContent = '';
      await sleep(1000);
    }
  }

  running = false;
  btn.textContent = 'Start';
  timerEl.textContent = stopRequested ? 'Stopped' : 'Done';
  modeEl.textContent = '';
});

resetBtn.addEventListener('click', () => {
  // Stop everything
  stopRequested = true;
  running = false;

  // Reset UI
  btn.textContent = 'Start';
  timerEl.textContent = '0';
  modeEl.textContent = '';
  setEl.textContent = '1';

  // Reset circle appearance
  circle.className = 'circle';

  // Optional: small feedback
  console.log('Timer reset');
});



closeBtn.addEventListener('click', () => {
  stopRequested = true;
  running = false;

  btn.textContent = 'Start';
  timerEl.textContent = '';
  modeEl.textContent = 'Closed';

  circle.className = 'circle';   // reset color
});
