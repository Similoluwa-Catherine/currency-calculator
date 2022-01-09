const firstCurrency = document.getElementById('first-currency');
const secondCurrency = document.getElementById('second-currency');
const amount1 = document.getElementById('amount1');
const amount2 = document.getElementById('amount2');
const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

function calculate() {
    const currencyOne = firstCurrency.value;
    const currencyTwo = secondCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/6c8ee83806ad6c8a9a8c1b1b/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
        const rate = data.conversion_rates[currencyTwo];
        rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
        amount2.value = (amount1.value * rate).toFixed(2);
    });
}

firstCurrency.addEventListener('change', calculate);
secondCurrency.addEventListener('change', calculate);
amount1.addEventListener('input', calculate);
amount2.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
    const temp = firstCurrency.value;
    firstCurrency.value = secondCurrency.value;
    secondCurrency.value = temp;
    calculate();
});

calculate();






