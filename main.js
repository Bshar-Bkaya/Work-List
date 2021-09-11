// Global variabel
// const save = document.querySelector("button");
let save = document.getElementById("save");
let containerTask = document.getElementById("container-tasks");
const input = document.querySelector("input");

// Start work
save.addEventListener("click", (e) => {
  e.preventDefault();
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
  input.value = "";
});

containerTask.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-trash1")) {
    e.target.parentElement.parentElement.remove();
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

containerTask.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("icon-trash")) {
    e.target.classList.replace("icon-trash", "icon-trash1");
  }
});

containerTask.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("icon-trash1")) {
    e.target.classList.replace("icon-trash1", "icon-trash");
  }
});
