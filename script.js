document.getElementById("I_learn").textContent = "Я изучаю JavaScript!";

//Счетчик символов сообщения
const maxlength = document.getElementById("message").maxLength;
const messageBox = document.getElementById("message")
const charCounter = document.getElementById("charCounter");

charCounter.textContent= messageBox.value.length + "/" + maxlength;

messageBox.addEventListener("input", function(){
    var charCount = messageBox.value.length;
    charCounter.textContent = charCount + "/" + maxlength;
})

//Работа с сообщением
const messageForm = document.getElementById("messageForm");
const messageComment = document.getElementById("messageComment");
const userName = document.getElementById("name");
const phoneNumber = document.getElementById("phoneNumber");
const phoneNumberPattern = /^\+7\d{10}$/;

messageForm.addEventListener("submit", function(event){
    event.preventDefault();
    if(userName.value.trim().length == 0){
        messageComment.textContent = "Введите имя!";
    }else if(!phoneNumberPattern.test(phoneNumber.value)){
        messageComment.textContent = "Введите номер телефона в формате '+79991234567'";
    }else if(messageBox.value.trim().length == 0){
        messageComment.textContent = "Введите ваше сообщение!";
    }else{
        messageComment.textContent = "Спасибо " + userName.value + "! Ваше сообщение отправлено!";
    }
})

// Добавление целей
const targetsList = document.getElementById("targets");
const addTarget = document.getElementById("addTarget");
const newTarget = document.getElementById("newTarget");
const addTargetInfo = document.getElementById("addTargetInfo");

addTarget.addEventListener("click", function(){
    if(newTarget.value.trim().length == 0){
        addTargetInfo.textContent = "Текст цели не должен быть пустым!";
    }else{
        const targetItem = document.createElement("li");
        targetItem.textContent = newTarget.value.trim();
        targetItem.classList.add("goal-card");
        targetsList.append(targetItem);
        newTarget.value = "";
        addTargetInfo.textContent = "Цель успешно добавлена!";
    }
})

//Блок подробнее
const hiddenAboutMe = document.getElementById("hiddenAboutMe");
const openMoreInfoAboutMe = document.getElementById("openMoreInfoAboutMe");

openMoreInfoAboutMe.addEventListener("click", function(){
    hiddenAboutMe.classList.toggle("hidden");
    if(openMoreInfoAboutMe.textContent == "Подробнее"){
        openMoreInfoAboutMe.textContent = "Свернуть";
    }else{
        openMoreInfoAboutMe.textContent = "Подробнее";
    }
})

//Задачи и их добавление из API
const tasks = document.getElementById("tasks");
const loadTasks = document.getElementById("loadTasks");
const loadComment = document.getElementById("loadComment");

async function loadTasksFromApi(){
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1/todos");

        if(!response.ok){
            loadComment.textContent = "Не удалось найти задач";
            return;
        }

        const tasksData = await response.json();
        for (const task of tasksData){
            const item = document.createElement("li");
            if(task.completed){
                item.textContent = task.title + " | Completed";
            }else{
                item.textContent = task.title + " | Uncompleted";
            }
            item.classList.add("goal-card");
            tasks.append(item);
        }
    }catch(error){
        loadComment.textContent = "Не удалось загрузить данные";
    }
}

loadTasks.addEventListener("click", loadTasksFromApi);