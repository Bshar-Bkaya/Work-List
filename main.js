// Global variabel
// const save = document.querySelector("button");
let save = document.getElementById("save");
let containerTask = document.getElementById("container-tasks");
const input = document.querySelector("input");
let i = Number(localStorage.getItem("i"));

//Focus on input field
window.onload = function () {
  input.focus();
};

// Add New Task
save.addEventListener("click", (e) => {
  e.preventDefault();
  let p = false;
  if (input.value === "") {
    p = true;
    input.focus();
    Swal.fire({
      title: "error",
      text: "The input is empty!!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    if (containerTask.children[0].classList.contains("Exa")) {
      containerTask.innerHTML = "";
    } else {
      // check If Task Found Befor Creat It
      for (let i = 0; i < containerTask.children.length; i++) {
        if (containerTask.children[i].children[1].textContent == input.value) {
          p = true;
          input.value = "";
          input.focus();
          Swal.fire({
            title: "warning",
            text: "This Task Is Found",
            icon: "warning",
            confirmButtonText: "OK",
          });
          break;
        }
      }
    }
  }
  if (p == false) {
    const newTask = ` 
        <div class="task">
          <span class="icon-star icon" title="تثبيت في الاعلى"></span>
          <p class="task-text" lang="ar">${input.value}</p>
          <div>
            <span id="delet" class="icon-trash icon" title="حذف"></span>
            <span class="icon-angry2 icon" title="انهاء"></span>
          </div>
        </div>`;
    containerTask.innerHTML += newTask;

    // Add class (i) to delete button
    containerTask.lastChild.classList.add(i);

    // Add Text To LocalStorage
    localStorage.setItem(containerTask.lastChild.className, input.value);

    i++;
    // Add last i to localstorage
    localStorage.setItem("i", i);
    input.value = "";
    input.focus();
  }
});

containerTask.addEventListener("click", (e) => {
  // if click on delete button
  if (e.target.classList.contains("icon-trash1")) {
    // Delete task from containerTask
    e.target.parentElement.parentElement.remove();

    // Delete Task From LocalStorage
    localStorage.removeItem(e.target.parentElement.parentElement.className);

    // Delete Task From LocalStorage
    localStorage.removeItem(e.target.className);

    if (containerTask.childElementCount == 0) {
      containerTask.innerHTML = `
        <div class="task Exa">
          <p class="task-text" style="margin-left: auto; margin-right: auto">
            No Tasks To Shwo!!
          </p>
        </div>`;
    }
  } else if (e.target.classList.contains("icon-angry2")) {
    e.target.classList.remove("icon-angry2");
    e.target.classList.add("icon-heart");
    e.target.parentElement.parentElement
      .getElementsByClassName("task-text")[0]
      .classList.add("finished");
  } else if (e.target.classList.contains("icon-heart")) {
    e.target.classList.remove("icon-heart");
    e.target.classList.add("icon-angry2");
    e.target.parentElement.parentElement
      .getElementsByClassName("task-text")[0]
      .classList.remove("finished");
  } else if (e.target.classList.contains("icon-star")) {
    e.target.classList.toggle("star");
    if (e.target.classList.contains("star")) {
      containerTask.prepend(e.target.parentElement);
    } else {
      containerTask.append(e.target.parentElement);
    }
  }
});

// replace class icon-trash to icon-trash (to change icon)
containerTask.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("icon-trash")) {
    e.target.classList.replace("icon-trash", "icon-trash1");
  }
});

// replace class icon-trash to icon-trash (to change icon)
containerTask.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("icon-trash1")) {
    e.target.classList.replace("icon-trash1", "icon-trash");
  }
});

(function () {
  console.log(localStorage.length);
})();

// Function to creat old tasks
(function creatOldTasks() {
  if (localStorage.length != 1) {
    // remove the Ex tasks
    containerTask.innerHTML = "";

    // For to print the old tasks
    for (let [key, value] of Object.entries(localStorage)) {
      if (key == "i") continue;

      const oldTask = ` 
      <div class="${key}">
        <span class="icon-star icon" title="تثبيت في الاعلى"></span>
        <p class="task-text" lang="ar">${value}</p>
        <div>
          <span id="delet" class="icon-trash icon" title="حذف"></span>
          <span class="icon-angry2 icon" title="انهاء"></span>
        </div>
      </div>`;
      containerTask.innerHTML += oldTask;

      // Focus on field
      input.focus();
    }
  }
})();
