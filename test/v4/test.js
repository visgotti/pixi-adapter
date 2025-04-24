// test.js
const testDiv = document.getElementById('test-div');
const canvas  = document.getElementById('canvas');

// helper: run a test and append its result to #test-div
function runTest(testName, fnToInvoke) {
  // detect if we’re already scrolled to bottom
  const atBottom =
    testDiv.scrollHeight - testDiv.scrollTop <= testDiv.clientHeight + 1;

  // create a line for this test
  const line = document.createElement('div');
  line.className = 'test-line';
  line.textContent = `Test: `+ testName + '…';
  testDiv.appendChild(line);

  // runner
  try {
    const result = fnToInvoke();
    if (result instanceof Promise) {
      // async test
      result
        .then(() => markSuccess(line))
        .catch(err => markFail(line, err));
    } else {
      // sync test
      markSuccess(line);
    }
  } catch (err) {
    markFail(line, err);
  }

  // auto-scroll if we were at bottom
  if (atBottom) {
    testDiv.scrollTop = testDiv.scrollHeight;
  }
}

function markSuccess(line) {
  line.innerHTML = `<strong>${line.textContent.replace(/…$/, '')}</strong>  
                    <span class="success">SUCCESS</span>
                    <hr class="seperator"/>
                    `;
}

function markFail(line, err) {
  line.innerHTML = `<strong>${line.textContent.replace(/…$/, '')}</strong>  
                    <span class="failed">FAILED:</span> ${err}
                    <hr class="seperator"/>
                    `;
}

// —— Example tests ——

runTest('PIXI_ADAPTER global is available', () => {
  if (!window.PIXI_ADAPTER) throw new Error('PIXI_ADAPTER is undefined');
});

runTest('ADAPTER is in global PIXI_ADAPTER contents', () => {
  if(!(window.PIXI_ADAPTER.ADAPTER)) throw new Error('ADAPTER is not an object');
});

runTest('getVersion returns 4', () => {
  const int = parseInt(window.PIXI_ADAPTER.getPixiVersion());
  if (int !== 4) throw new Error(`getPixiVersion() returns ${int}, not 4`);
});
