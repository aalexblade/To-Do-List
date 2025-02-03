document.addEventListener("DOMContentLoaded", function () {
  var list = document.getElementById("myUL");

  // Додаємо "✖" і Drag & Drop до існуючих елементів
  var items = document.querySelectorAll("#myUL li");
  items.forEach((item) => {
    addCloseButton(item);
    addDragAndDrop(item);
  });

  // Додає кнопку "✖" для видалення завдання
  function addCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function () {
      var div = this.parentElement;
      div.remove();
    };
  }

  // Позначення завдання як виконаного
  list.addEventListener("click", function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  });

  // Додає нове завдання
  window.newElement = function () {
    var li = document.createElement("li");
    li.draggable = true;

    var inputValue = document.getElementById("myInput").value;
    if (inputValue === "") {
      alert("You must write something!");
      return;
    }
    li.textContent = inputValue;

    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    addCloseButton(li);
    addDragAndDrop(li);
  };

  // Додає можливість перетягування
  function addDragAndDrop(item) {
    item.draggable = true;

    item.addEventListener("dragstart", function (event) {
      event.dataTransfer.effectAllowed = "move";
      event.target.classList.add("dragging");
    });

    item.addEventListener("dragend", function () {
      event.target.classList.remove("dragging");
    });
  }

  // Обробник події перетягування
  list.addEventListener("dragover", function (event) {
    event.preventDefault();
    const dragging = document.querySelector(".dragging");
    const items = [...list.querySelectorAll("li:not(.dragging)")];

    let closest = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    items.forEach((li) => {
      const box = li.getBoundingClientRect();
      const offset = event.clientY - box.top - box.height / 2;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closest = li;
      }
    });

    if (closest) {
      list.insertBefore(dragging, closest);
    } else {
      list.appendChild(dragging);
    }
  });
});
