const inputBox = document.getElementById("input-box");
const inputTime = document.getElementById("input-time");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '' || inputTime.value === '') {
        alert("You must write a task and set a time.");
    } else {
        let li = document.createElement("li");
        // Include the task and time in the same line
        li.innerHTML = `${inputBox.value} <p class="task-time">(${new Date(inputTime.value).toLocaleString()})</p>`;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for multiplication sign
        li.appendChild(span);

        setTimer(new Date(inputTime.value), li);

        inputBox.value = "";
        inputTime.value = "";
        saveData();
    }
}

function setTimer(taskTime, taskElement) {
    const now = new Date();
    const timeDifference = taskTime - now;

    if (timeDifference > 0) {
        setTimeout(() => {
            alert(`Time is up for: ${taskElement.textContent}`);
            playSound();
        }, timeDifference);
    }
}

function playSound() {
    const audio = new Audio('../alarm.mp3');
    audio.play();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("done-task");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        if (confirm("Are you sure you want to remove this task?")) {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
