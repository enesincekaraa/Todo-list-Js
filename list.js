// HTML tanımlamaları

const INPUT = document.querySelector('#input');
const BUTTON = document.querySelector('#button');
const LIST = document.querySelector('#list');
const alertDOM = document.querySelector('#alert');

const alertFunction = (title, message, color = "warning") => `
    <div class="alert alert-${color} alert-dismissible fade show fs-5" role="alert">
      <strong style="color:orange">${title}</strong> ${message} <i style ="color: orange" class="fa-solid fa-face-smile-wink"></i>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
`
// Button eventleri
BUTTON.addEventListener('click', funcButton);
LIST.addEventListener('click', deleteCheck);

//LocalStorage eventi
document.addEventListener('DOMContentLoaded', getLocal);


function funcButton(event) {
    event.preventDefault();

    //input alanı boş eklemeye çalışırsa 
    if(INPUT.value === "" || INPUT.value === "") {
        alertDOM.innerHTML = alertFunction(
            'ALERT!',
             'You need to do something today',
             'primary'
            );    // alert ver    
    } else {                            // yoksa devam et
    

    const DIV = document.createElement('div');
    DIV.classList.add('todoDiv');
    let liDOM = document.createElement('li');
    liDOM.innerHTML = INPUT.value;
    DIV.appendChild(liDOM);

    //INPUT girdisini LOCALSTORAGE' a kaydetme
    saveLocal(INPUT.value);

    //CHECK ve DELETE butonlarını oluşturma
    const checkButton = document.createElement('button');
    checkButton.innerHTML = `<i class="fas fa-check"></i>`;
    checkButton.classList.add('check-btn', 'btn', 'btn-success');
    DIV.appendChild(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add('delete-btn', 'btn', 'btn-danger');
    DIV.appendChild(deleteButton);

    // Oluşturduğumuz DIV'i LIST'e atama
    LIST.appendChild(DIV);
    // Yazıldıktan sonra input içini boşalt
    INPUT.value = '';
}
};

// CHECK ve DELETE butonlarına fonksiyon atama
function deleteCheck(e) {
    const item = e.target;

    // item'in class listine göre
    if(item.classList[0] === 'delete-btn') {

        const todo = item.parentElement;
        todo.remove();
        //LS'ten sil
        removeLocal(todo);
    }

    if(item.classList[0] === 'check-btn') {

        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};



// ------------------- LOCAL STORAGE --------------- //

function saveLocal(todo) {

    // localstorage'da bilgi var mı kontrol ediyoruz
    let todos;
    //LS içi boşsa
    if(localStorage.getItem('todos') === null) {
        todos = [];     
    } else {            // doluysa array içine geri al
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);   //todos --->push to todo
    //LS stringify
    localStorage.setItem('todos', JSON.stringify(todos));
}


// **** Sayfa yenilenince LS bilgilerimiz geri gelsin *** //
function getLocal() {
    // localstorage'da bilgi var mı kontrol ediyoruz
    let todos;
    
    if(localStorage.getItem('todos') === null) {
        todos = [];     //yoksa içini boşalt
    } else {            // varsa array içine geri al
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.forEach(function(todo){

        const DIV = document.createElement('div');
        DIV.classList.add('todoDiv');
        let liDOM = document.createElement('li');

        //li içeriğini todo'ya eşitle
        liDOM.innerText = todo;

        DIV.appendChild(liDOM);

        const checkButton = document.createElement('button');
        checkButton.innerHTML = `<i class="fas fa-check"></i>`;
        checkButton.classList.add('check-btn', 'btn', 'btn-success');
        DIV.appendChild(checkButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.classList.add('delete-btn', 'btn', 'btn-danger');
        DIV.appendChild(deleteButton);
        
        LIST.appendChild(DIV);
    })
}


// **** Sayfa yenilenince LS bilgilerimiz geri gelsin *** //

function removeLocal(todo) {
    // localstorage'da bilgi var mı kontrol ediyoruz
    let todos;
    
    if(localStorage.getItem('todos') === null) {
        todos = [];     //yoksa içini boşalt
    } else {            // varsa array içine geri al
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}