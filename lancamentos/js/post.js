// Arrays for diplay
const methods = ['Despesa', 'Receita','Passivo'];
const accounts = ['Nubank', 'Itau', 'Picpay','Viasoftpay'];
const categorys = ['Comida', 'Alcool', 'Contas', 'Investimentos', 'Salario'];

// Functions
async function postData(data = {}) {
    const response = await fetch('http://127.0.0.1:3000/lancamentos', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json()

}

async function returnData(){
    try {
        const response = await fetch('http://127.0.0.1:3000/lancamentos')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

function createTable(data){
    let output = tableHead;
    console.log(data[0].IDLANFIN)
    for(i = 0; i < data.length;i++){
        output += `<tr><td>${data[i].IDLANFIN}</td>
        <td>${Number(data[i].VALUE).toFixed(2)}</td><td>${methods[data[i].METHOD]}</td>
        <td>${accounts[data[i].ACCOUNTID]}</td><td>${categorys[data[i].CATEGORY]}</td></tr>`
    }
    table.innerHTML = output;
}

function selectInsert(arr, met) {
    let output = '';
    for (let i = 0; i < arr.length; i++) {
        output += `<option value="${i}">${arr[i]}</option>`
    }
    met.innerHTML = output + '</tbody>';
}

function changePage(actually){
    if(actually.id == 'list-finances'){
        buttonAdd.setAttribute('class','exit')
        actually.setAttribute('class','hide')
        pageAtual = document.querySelector('#add-finance')
        pageAtual.removeAttribute('class')
        buttonAdd.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    } else if(actually.id == 'add-finance'){
        returnData().then((response) => {
            createTable(response)
        })
        buttonAdd.setAttribute('class','add')
        actually.setAttribute('class','hide')
        pageAtual = document.querySelector('#list-finances')
        pageAtual.removeAttribute('class')
        buttonAdd.innerHTML = '<i class="fa-solid fa-circle-plus">'
    }
}

// Variables
// Post
const button = document.querySelector('#add');
const valueInput = document.querySelector('#value-input');
const methodSelect = document.querySelector('#method-select');
const accountSelect = document.querySelector('#account-select');
const categorySelect = document.querySelector('#category-select')
// Hist
var pageAtual = document.querySelector('#list-finances');
const buttonAdd = document.querySelector('#menumais');
const table = document.querySelector('#table');
const tableHead = `<thead><tr><th>ID</th><th>Valor</th><th>Método</th><th>Conta</th><th>Categoria</th></tr></thead><tbody>`

// Events
buttonAdd.addEventListener(('click'), ()=>{
    changePage(pageAtual)
})
button.addEventListener(('click'), () => {
    postData({
        value: valueInput.value,
        method: methodSelect.value, 
        accountid: accountSelect.value, 
        category: categorySelect.value
    })
    returnData().then((response) => {
        createTable(response)
    })
    changePage(pageAtual)
})

// Calls
selectInsert(methods, methodSelect)
selectInsert(accounts, accountSelect)
selectInsert(categorys, categorySelect)
returnData().then((response) => {
    createTable(response)
})
