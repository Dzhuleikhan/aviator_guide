const betBox = document.querySelectorAll(".bet-box");
const betButtonMain = document.querySelectorAll(".bet-button");

betBox.forEach((box) => {
  if (box) {
    const betTabs = box.querySelectorAll(".bet-tabs button");
    const autoplayRow = box.querySelector(".bet-autoplay");

    // Tabs
    betTabs.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let tabName = e.target.getAttribute("data-tab");
        console.log(tabName);

        betTabs.forEach((el) => {
          el.classList.remove("active");
        });
        btn.classList.add("active");

        if (tabName === "auto") {
          autoplayRow.classList.remove("hidden");
        } else {
          autoplayRow.classList.add("hidden");
        }
      });
    });

    // Bet amounts
    const boxNumbers = box.querySelector(".bet-nums");
    const boxNumbersInput = boxNumbers.querySelector(".bet-number-input");
    const boxNumbersMinus = boxNumbers.querySelector(".btn-minus");
    const boxNumbersPlus = boxNumbers.querySelector(".btn-plus");

    let boxNumbersInputValue = parseFloat(boxNumbersInput.value);

    boxNumbersMinus.addEventListener("click", () => {
      boxNumbersInputValue -= 0.1;
      boxNumbersInput.value = boxNumbersInputValue.toFixed(2);
    });
    boxNumbersPlus.addEventListener("click", () => {
      boxNumbersInputValue += 0.1;
      boxNumbersInput.value = boxNumbersInputValue.toFixed(2);
    });

    const betAmountBtns = boxNumbers.querySelectorAll(
      ".bet-num-amounts button",
    );

    let firstClick = true;
    let lastClickedAmount = null;

    betAmountBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let amount = parseFloat(e.target.getAttribute("data-amount"));

        if (amount !== lastClickedAmount) {
          // If a different button is clicked, reset firstClick to true
          firstClick = true;
          lastClickedAmount = amount;
        }

        if (firstClick) {
          firstClick = false;

          let fixedInputValue = boxNumbersInputValue.toFixed(2);

          // Check if values match
          if (amount.toFixed(2) === fixedInputValue) {
            // If they match, just increment
            boxNumbersInputValue += amount;
          } else {
            // If they don't match, set input value to the button value
            boxNumbersInputValue = amount;
          }
        } else {
          // On subsequent clicks with the same button, just increment by button value
          boxNumbersInputValue += amount;
        }

        // Update the input field and display the amount
        boxNumbersInput.value = boxNumbersInputValue.toFixed(2);
      });
    });
  }
});
