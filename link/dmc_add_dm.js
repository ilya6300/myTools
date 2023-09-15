const valBox = document.querySelector("#val-box");
const btn = document.querySelector("#btn-remove");
const inputContainer = document.querySelector("#input-container");
const log = document.querySelector("#log-info");
const btnClear = document.querySelector("#btn-clear");
const dmStatusTask = document.querySelector("#dm-status-task");
const taskInput = document.querySelector("#task-input");
const quotes = document.querySelector("#quotes");
const dmDate = document.querySelector("#dm-date");
const btnInsertDmBtn = document.querySelector("#btn-insert-dm-btn");
const dmсVersion = document.querySelector("#dmс-version");

let quotesFlaf = true;

let yourArray = [];
let newArr = [];
let dd;
let taskId;

// Добавление новых КМ скрипт \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
btnInsertDmBtn.onclick = () => {
  taskId = taskInput.value;
  newArr = [];
  yourArray = inputContainer.value.split("\n");
  yourArray.forEach((a) => {
    if (a !== "") {
      // Разбираем КМ на dm, хвост и gtin
      let dm = a.slice(0, 31);
      let tail = a.slice(32, 38);
      let gtin = a.slice(2, 16);
      // Проверка на активность кнопки двойный кавычек
      if (quotesFlaf) {
        dm = dm.replace(/'/g, "''");
        tail = tail.replace(/'/g, "''");
      }
      // Выбираем статус dmStatusTask.value
      // Дата
      if (dmDate.value !== "") {
        dd = "'" + dmDate.value + "'";
      } else {
        dd = null;
      }

      if (dmсVersion.value === "1.0.3.2") {
        a =
          "('" +
          dm +
          "','" +
          tail +
          "',null,'" +
          dmStatusTask.value +
          "','" +
          gtin +
          "', " +
          dd +
          ", '" +
          taskId +
          "',null,null)";
      } else if (dmсVersion.value === "1.0.3.0") {
        a =
          "('" +
          dm +
          "','" +
          tail +
          "','" +
          dmStatusTask.value +
          "','" +
          gtin +
          "', " +
          dd +
          ", '" +
          taskId +
          "',null,)";
      } else if (dmсVersion.value === "1.0.4") {
        a =
          "('" +
          dm +
          "','" +
          tail +
          "','" +
          dmStatusTask.value +
          "','" +
          gtin +
          "', " +
          dd +
          ", '" +
          taskId +
          "',null)";
      }
      newArr.push(a);
    }
  });
  if (taskId && dmсVersion.value !== "DMC") {
    if (dmсVersion.value === "1.0.3.2") {
      valBox.innerHTML =
        "INSERT INTO dm (dm, dm_tail, beer_volume, status, gtin, scandate, taskid, insert_by, verification_device)" +
        "\n" +
        "values" +
        "\n" +
        newArr.join("," + "\n") +
        "\n" +
        "ON CONFLICT DO NOTHING;";
    } else if (dmсVersion.value === "1.0.3.0") {
      valBox.innerHTML =
        "INSERT INTO dm (dm, dm_tail, status, gtin, scandate, taskid, insert_by)" +
        "\n" +
        "values" +
        "\n" +
        newArr.join("," + "\n") +
        "\n" +
        "ON CONFLICT DO NOTHING;";
    } else if (dmсVersion.value === "1.0.4") {
      valBox.innerHTML =
        "INSERT INTO dm (dm, dm_tail, status, gtin, scandate, taskid, insert_by)" +
        "\n" +
        "values" +
        "\n" +
        newArr.join("," + "\n") +
        "\n" +
        "ON CONFLICT DO NOTHING;";
    }
    log.innerText = "";
    dd = "";
    taskId = "";
    taskInput.value = "";
  } else {
    alert("Заполните номер задания, версию DMC и проверьте код статуса марок.");
  }
};
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
