const users = [
    {
        id: 1,
        name: "Богдан",
        tel: "+380935302553",
    },
    {
        id: 2,
        name: "Иван",
        tel: "+380935302552",
    },
    {
        id: 3,
        name: "Петр",
        tel: "+380935302551",
    },
    {
        id: 4,
        name: "Александр",
        tel: "+380935302550",
    },
    {
        id: 5,
        name: "Владимир",
        tel: "+380935302554",
    }
]
const userList = document.querySelector(".user__list");
const createUserForm = document.querySelector(".form__new-user");
const inputName = createUserForm.querySelector("#name");
const inputTel = createUserForm.querySelector("#tel");
let count = users.length + 1;
function toggleLoader() {
    const loaderHTML = document.querySelector('#loader');
    const isHidden = loaderHTML.hasAttribute('hidden');
    if (isHidden) {
        loaderHTML.removeAttribute('hidden');
    } else {
        loaderHTML.setAttribute('hidden', '');
    }
}
/* Функция отправки данных об users 
function sendToServer() {
    const data = new FormData();
    data.append("json", JSON.stringify(users));
    fetch(url, {
        method: "POST",
        body: data
    }).then(function (response) {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.statusText + ')'
            ));
        }
        return response.json();
    }).then(function (data) {
       console.log("Данные отправились")
    }).catch(function (error) {
        console.log("Ошибка оброботки")
    });
} */
function firstLoad() {
    setTimeout(() => {
        users.forEach((element) => {
            const userItem = document.createElement("div")
            userItem.className = "user__item"
            userItem.dataset.userId = element.id
            userItem.innerHTML =
                `
                    <p class="user__name">${element.name}</p>
                    <p class="user__tel">${element.tel}</p>
                    <button type="button" class="btn btn__edit-user">Редактировать</button>
                    <button type="button" class="btn btn__delete-user">Удалить</button>
                `
            userList.append(userItem)
        })
        toggleLoader()
    }, 2000)
}
function createUser() {
    users.forEach((element) => {
        const userItem = document.createElement("div")
        userItem.className = "user__item"
        userItem.dataset.userId = element.id
        userItem.innerHTML =
            `
                    <p class="user__name">${element.name}</p>
                    <p class="user__tel">${element.tel}</p>
                    <button type="button" class="btn btn__edit-user">Редактировать</button>
                    <button type="button" class="btn btn__delete-user">Удалить</button>
                `
        userList.append(userItem)
        //sendToServer() отправляем данные
    })

    /*  Получаем users с сервера
    const result = fetch(url, {
        method: 'GET'
    })
    result
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }
            return response.json();
        })
        .then((users) => {
            users.forEach((element) => {
                const userItem = document.createElement("div")
                userItem.className = "user__item"
                userItem.dataset.userId = element.id
                userItem.innerHTML =
                    `
                            <p class="user__name">${element.name}</p>
                            <p class="user__tel">${element.tel}</p>
                            <button type="button" class="btn__edit-user">Редактировать</button>
                            <button type="button" class="btn__delete-user">Удалить</button>
                        `
                userList.append(userItem)
            })
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            toggleLoader()
        }) */
}
function clearCurrent() {
    const allUsers = document.querySelectorAll(".user__item");
    allUsers.forEach((element) => {
        element.removeAttribute("data-action");
        element.style.opacity = 0.2;
        const userDelete = element.querySelector(".btn__delete-user");
        const userEdit = element.querySelector(".btn__edit-user");
        userEdit.textContent = "Редактировать";
        userEdit.removeAttribute("data-action");
        userDelete.textContent = "Удалить";
        userDelete.removeAttribute("data-action");
    })
}
createUserForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let userNameValue = inputName.value.trim();
    let userTelValue = inputTel.value.trim();
    const newUser = {
        id: count++,
        name: userNameValue,
        tel: userTelValue,
    }
    users.unshift(newUser)
    userList.innerHTML = "";
    inputName.value = "";
    inputTel.value = "";
    createUser()
    //sendToServer() отправляем данные
})
userList.addEventListener("click", (e) => {
    const { target } = e
    const currentItem = target.parentElement;
    const btnDeleteUser = target.closest(".btn__delete-user");
    const btnEditUser = target.closest(".btn__edit-user");
    let userId = Number(currentItem.dataset.userId);
    const index = users.findIndex(item => item.id === userId);
    if (btnDeleteUser) {
        if (!btnDeleteUser.dataset.action) {
            if (index !== -1) {
                users.splice(index, 1);
            }
            currentItem.remove()
            //sendToServer() отправляем данные
        } else {
            inputName.value = "";
            inputTel.value = "";
        }
    }
    if (btnEditUser) {
        if (!btnEditUser.dataset.action) {
            inputName.value = users[index].name;
            inputTel.value = users[index].tel;
            clearCurrent()
            btnEditUser.textContent = "Сохранить"
            btnEditUser.dataset.action = "save";
            currentItem.dataset.action = "edit";
            currentItem.style.opacity = 1
            currentItem.querySelector(".btn__delete-user").textContent = "Очистить";
            currentItem.querySelector(".btn__delete-user").dataset.action = "clear"
        }
        else {
            let userNameValue = inputName.value.trim();
            let userTelValue = inputTel.value.trim();
            users[index].name = userNameValue;
            users[index].tel = userTelValue;
            if ((userNameValue && userTelValue) !== "") {
                userList.innerHTML = "";
                inputName.value = "";
                inputTel.value = "";
                createUser()
                //sendToServer() отправляем данные
            } else {
                alert("Введите данные")
                inputName.focus();
            }
        }
    }
})
firstLoad()