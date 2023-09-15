const valBox = document.querySelector("#val-box");
const btn = document.querySelector("#btn-remove");
const inputContainer = document.querySelector("#input-container");
const log = document.querySelector("#log-info");
const btnClear = document.querySelector("#btn-clear");
const dmStatusUpDate = document.querySelector("#dm-status-update");
const quotes = document.querySelector("#quotes");
const selectTail = document.querySelector("#select-tail");
const btnUpdateDm = document.querySelector("#btn-update-dm");

let quotesFlaf = true;

let yourArray = [];
let newArr = [];

// Очистка полей
btnClear.onclick = () => {
  yourArray = [];
  newArr = [];
  log.innerHTML = "";
  valBox.innerHTML = "";
  inputContainer.value = "";
};
//  Кавычки
quotes.onclick = () => {
  if (quotesFlaf) {
    quotesFlaf = false;
    quotes.textContent = "Off ' > ''";
    quotes.classList.add("quotes-off");
    quotes.classList.remove("quotes-on");
  } else {
    quotesFlaf = true;
    quotes.textContent = "On ' > ''";
    quotes.classList.remove("quotes-off");
    quotes.classList.add("quotes-on");
  }
};
// Смена статуса у КМ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
btnUpdateDm.onclick = () => {
  newArr = [];
  yourArray = inputContainer.value.split("\n");
  yourArray.forEach((a) => {
    if (a !== "") {
      // Разбираем КМ на dm
      let dm;
      // Проверка на крипто-хвост обрезание
      if (selectTail.value === "Обрезать") {
        dm = a.slice(0, 24);
      } else {
        dm = a.slice(0, 31);
      }
      // Проверка на активность кнопки двойный кавычек
      if (quotesFlaf) {
        dm = dm.replace(/'/g, "''");
      }

      a = "'" + dm + "%'";
      newArr.push(a);
    }
  });
  if (dmStatusUpDate.value !== "Выбери" && selectTail.value !== "Выбери") {
    valBox.innerHTML =
      "update dm set status=" +
      dmStatusUpDate.value +
      " where dm like any (array[" +
      newArr.join("," + "\n") +
      "])" +
      "\n";
  } else {
    return alert("Выберите статус КМ и действие с крипто-хвостом");
  }
};
