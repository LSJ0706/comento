document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".result");
  const buttons = Array.from(document.getElementsByTagName("button"));

  let num1 = "";
  let num2 = "";
  let operator = "";
  let result = "";

  const updateDisplay = () => {
    display.value = `${num1} ${operator} ${num2}`;
  };

  const calculate = () => {
    try {
      const expression = `${num1}${operator}${num2}`
        .replace("×", "*")
        .replace("÷", "/")
        .replace("－", "-")
        .replace("＋", "+");
      const calculation = new Function(`return ${expression}`)();
      return calculation.toString();
    } catch {
      return "Error";
    }
  };

  const clearDisplay = () => {
    num1 = "";
    num2 = "";
    operator = "";
    result = "";
    updateDisplay();
  };

  const clearLastEntry = () => {
    if (num2) {
      num2 = num2.slice(0, -1);
    } else if (operator) {
      operator = "";
    } else if (num1) {
      num1 = num1.slice(0, -1);
    }
    updateDisplay();
  };

  const invertNumber = () => {
    if (num2) {
      num2 = (parseFloat(num2) * -1).toString();
    } else if (num1) {
      num1 = (parseFloat(num1) * -1).toString();
    }
    updateDisplay();
  };

  const calculateReciprocal = () => {
    if (num2) {
      num2 = (1 / parseFloat(num2)).toString();
    } else if (num1) {
      num1 = (1 / parseFloat(num1)).toString();
    }
    updateDisplay();
  };

  const calculateSquareRoot = () => {
    if (num2) {
      num2 = Math.sqrt(parseFloat(num2)).toString();
    } else if (num1) {
      num1 = Math.sqrt(parseFloat(num1)).toString();
    }
    updateDisplay();
  };

  const calculateSquare = () => {
    if (num2) {
      num2 = Math.pow(parseFloat(num2), 2).toString();
    } else if (num1) {
      num1 = Math.pow(parseFloat(num1), 2).toString();
    }
    updateDisplay();
  };

  const calculatePercentage = () => {
    if (num2) {
      num2 = (parseFloat(num2) / 100).toString();
    } else if (num1) {
      num1 = (parseFloat(num1) / 100).toString();
    }
    updateDisplay();
  };

  const handleButtonClick = (value) => {
    if (!isNaN(value) || value === ".") {
      if (operator) {
        num2 += value;
      } else {
        num1 += value;
      }
      updateDisplay();
    } else if (["＋", "－", "×", "÷"].includes(value)) {
      if (num1 && !num2) {
        operator = value;
        updateDisplay();
      }
    } else {
      switch (value) {
        case "C":
          clearDisplay();
          break;
        case "CE":
        case "≪":
          clearLastEntry();
          break;
        case "=":
          if (num1 && operator && num2) {
            result = calculate();
            display.value = result;
            num1 = result;
            num2 = "";
            operator = "";
          }
          break;
        case "1/x":
          calculateReciprocal();
          break;
        case "√x":
          calculateSquareRoot();
          break;
        case "x²":
          calculateSquare();
          break;
        case "+/-":
          invertNumber();
          break;
        case "%":
          calculatePercentage();
          break;
      }
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      handleButtonClick(button.textContent);
    });
  });
});
