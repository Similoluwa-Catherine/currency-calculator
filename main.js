const firstCurrency = document.getElementById("first-currency");
const secondCurrency = document.getElementById("second-currency");
const amount1 = document.getElementById("amount1");
const amount2 = document.getElementById("amount2");
const rateEl = document.getElementById("rate");
const swapBtn = document.getElementById("swap");

let conversionRate;

let currencyOne = firstCurrency.value;
let currencyTwo = secondCurrency.value;

function getConversionRate() {
  currencyOne = firstCurrency.value;
  currencyTwo = secondCurrency.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/6c8ee83806ad6c8a9a8c1b1b/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      conversionRate = data.conversion_rates[currencyTwo];
      calculate();
    });
}

function calculate() {
  rateEl.innerText = `1 ${currencyOne} = ${conversionRate} ${currencyTwo}`;

  amount2.value = (amount1.value * conversionRate).toFixed(2);
}

firstCurrency.addEventListener("change", getConversionRate);
secondCurrency.addEventListener("change", getConversionRate);

amount1.addEventListener("input", calculate);
amount2.addEventListener("input", calculate);

swapBtn.addEventListener("click", () => {
  const temp = firstCurrency.value;
  firstCurrency.value = secondCurrency.value;
  secondCurrency.value = temp;
  getConversionRate();
});

getConversionRate();

