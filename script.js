let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
    case ".":
      handleDecimal();
      break;
  }
}
function handleDecimal() {
  if (buffer.indexOf(".") === -1) {
    buffer += ".";
  }
}
function handleMath(symbol) {
  if (buffer === "0" && runningTotal === 0) {
    return;
  }

  const intBuffer = parseFloat(buffer);
  if (!isNaN(intBuffer)) {
    if (runningTotal === 0) {
      runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
    }
  }

  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  const floatBuffer = parseFloat(buffer);
  if (!isNaN(floatBuffer)) {
    intBuffer = floatBuffer;
  }

  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    if (intBuffer !== 0) {
      runningTotal /= intBuffer;
    } else {
      // Handle division by zero error
      alert("Error: Division by zero!");
      resetCalculator();
      return;
    }
  }

  buffer = runningTotal.toFixed(2);
  previousOperator = null;
}

function handleNumber(numberString) {
  if (buffer === "0" && numberString !== ".") {
    buffer = numberString;
  } else if (numberString === "." && buffer.indexOf(".") === -1) {
    buffer += ".";
  } else if (numberString !== ".") {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calculation-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}
init();
