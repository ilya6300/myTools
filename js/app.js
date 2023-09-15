const boxBox = document.querySelector("#val-box");
const btnRemove = document.querySelector(
  "#btn-remove"
);
const inputContainer = document.querySelector("#input-container");
const log = document.querySelector("#log-info");
const btnClear = document.querySelector(
  "#btn-clear"
);

btnRemove.onclick = () => {
  let yourArray = inputContainer.value.split("\n");
  yourArray.forEach((a) => {
    if (newArr.includes(a) || a === "") {
      return;
    } else {
      newArr.push(a);
      boxBox.innerHTML += a + "\n";
     }
  });

  log.innerText =
    "Всего обработано " +
    yourArray.length +
    " строк. Удалено " +
    (yourArray.length - newArr.length) +
    " элементов. На выходе " +
    newArr.length +
    " элементов.";
};

btnClear.onclick = () => {
  yourArray = [];
  newArr = [];
  log.innerHTML = "";
  boxBox.innerHTML = "";
  inputContainer.value = "";
};

let yourArray = [];
let newArr = [];
