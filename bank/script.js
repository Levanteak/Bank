"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2022-10-02T14:43:31.074Z",
    "2022-10-29T11:24:19.761Z",
    "2022-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2022-02-12T15:14:06.486Z",
    "2022-03-09T11:42:26.371Z",
    "2022-05-21T07:43:59.331Z",
    "2023-06-20T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2022-10-02T14:43:31.074Z",
    "2022-10-29T11:24:19.761Z",
    "2022-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2023-02-12T15:14:06.486Z",
    "2023-03-09T11:42:26.371Z",
    "2022-05-21T07:43:59.331Z",
    "2022-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2022-10-02T14:43:31.074Z",
    "2022-10-29T11:24:19.761Z",
    "2022-11-15T10:45:23.907Z",
    "2023-01-22T12:17:46.255Z",
    "2023-02-12T15:14:06.486Z",
    "2023-03-09T11:42:26.371Z",
    "2022-05-21T07:43:59.331Z",
    "2022-06-22T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2022-10-02T14:43:31.074Z",
    "2022-10-29T11:24:19.761Z",
    "2022-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2022-02-12T15:14:06.486Z",
    "2022-03-09T11:42:26.371Z",
    "2022-05-21T07:43:59.331Z",
    "2022-06-22T15:21:20.814Z",
  ],
  currency: "EUR",
  locale: "fr-CA",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2022-10-02T14:43:31.074Z",
    "2022-10-29T11:24:19.761Z",
    "2022-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2022-02-12T15:14:06.486Z",
    "2022-03-09T11:42:26.371Z",
    "2022-05-21T07:43:59.331Z",
    "2022-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatTransactionDate = function (date) {
  const getDaysBerween2Days = (date1, date2) =>
    Math.round((date1 - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = getDaysBerween2Days(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return "Сегодня";
  if (daysPassed === 1) return "Вчера";
  if (daysPassed <= 7) return `${daysPassed} назад`;
  else {
    //   const day = `${date.getDay()}`.padStart(2, "0");
    //   const month = `${date.getMonth() + 1}`.padStart(2, "0");
    //   const year = date.getFullYear();
    return new Intl.DateTimeFormat(account2.locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = "";

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);

    // labelDate.textContent = formatTransactionDate(new Date(2023, 0, 23));

    // const day = `${now.getDay()}`.padStart(2, "0");
    // const month = `${now.getMonth() + 1}`.padStart(2, "0");
    // const year = now.getFullYear();
    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    //`${day}/${month}/${year}`
    const transactionRow = `
      <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${formattedTrans}</div>
        </div>
      `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
  });
};

// console.log(containerTransactions.innerHTML);

const createsNicknames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createsNicknames(accounts);
// console.log(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

const displayTotal = function (account) {
  const depositTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, item) => acc + item, 0);

  const withdrawalTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, item) => acc + item, 0);

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((deposit) => Math.floor((deposit * account.interest) / 100))
    .filter((inters, inedx, arr) => inters >= 5)
    .reduce((acc, item) => acc + item, 0);

  labelSumInterest.textContent = `${interestTotal}%`;
  labelSumOut.textContent = formatCurrency(
    withdrawalTotal,
    account.locale,
    account.currency
  );
  labelSumIn.textContent = formatCurrency(
    depositTotal,
    account.locale,
    account.currency
  );
};

const updateUi = function (account) {
  //display total
  displayTotal(account);

  //display balance
  displayBalance(account);

  //display transactions
  displayTransactions(account);
};

let currentAccount, currentLogOutTimer;

const startLogoutTimer = function () {
  let time = 10;
  const timerOut = function () {
    const minute = String(Math.trunc(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    labelTimer.textContent = `${minute}:${seconds}`;

    if (time === 0) {
      clearInterval(logOutTimeOut);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Войдите в свой аккаунт`;
    }
    time--;
  };

  timerOut();
  const logOutTimeOut = setInterval(timerOut, 1000);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui
    labelWelcome.textContent = `Рады, что вы снова с нами, ${
      currentAccount.userName.split(" ")[0]
    }!`;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Clear inputs
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    containerApp.style.opacity = 100;

    if (currentLogOutTimer) clearInterval(currentLogOutTimer);

    currentLogOutTimer = startLogoutTimer();

    updateUi(currentAccount);
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    (account) => account.nickname === recipientNickname
  );

  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount);
    inputTransferAmount.value = "";
    inputTransferTo.value = "";
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.nickname &&
    Number(inputClosePin?.value) === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      (account) => account.nickname === currentAccount.nickname
    );
    console.log(currentAccountIndex);
    accounts.splice(currentAccountIndex, 1);
    inputClosePin.value = "";
    inputCloseUsername.value = "";
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Войдите в свой аккаунт";
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      (trans) => trans >= (loanAmount * 10) / 100
    )
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = "";
});

let transactionsSorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});

const logoImage = document.querySelector(".logo");
logoImage.addEventListener("click", function () {
  [...document.querySelectorAll(".transactions__row")].forEach(function (
    row,
    i
  ) {
    if (i % 2 == 0) {
      row.style.backgroundColor = "grey";
    }
  });
});

// const bankSepositTotal = accounts
//   .flatMap((account) => account.transactions)
//   .filter((account) => account > 0)
//   .reduce((dep, acc) => dep + acc, 0);
// console.log(bankSepositTotal);

// const withdrawalOver300 = accounts
//   .flatMap((account) => account.transactions)
//   .filter((account) => account <= -300)
//   .reduce((dep, acc) => dep + acc, 0);
// console.log(bankSepositTotal);
// const someArray = [
//   [1, 2, [34, 34], 3],
//   [6, 3, 1, [4, 2, 4]],
//   [0, 9, 3, [232, 3, 4]],
// ];
// console.log(someArray.flat());

// const allTransactionArray = accounts.map((account) => account.transactions);
// console.log(allTransactionArray);
// const all = allTransactionArray.flat();
// console.log(all);
// const balanceBank = all.reduce((acc, all) => acc + all, 0);
// console.log(balanceBank);

// const name = accounts.map((names) => names.userName);
// console.log(name.sort());
// const bal = accounts.flatMap((trans) => trans.transactions);
// bal.sort(function (x, y) {
//   if (x < y) {
//     return 1;
//   }
//   if (x > y) {
//     return -1;
//   }
// });
// console.log(bal);
// const col = accounts.find((accounts) => accounts.userName === "Corey Martinez");
// console.log(col);

// const username = "Oliver Avila";
// const nickname = username
//   .toLowerCase()
//   .split(" ")
//   .map((word) => word[0])
//   .join("");

// console.log(nickname);
