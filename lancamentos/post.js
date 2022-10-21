const methods = ['Expense', 'Income','Passive'];
const accounts = ['Nubank', 'Itau', 'Picpay','Viasoftpay'];
const categorys = ['Food', 'Gas', 'Bills', 'Investments', 'Salary'];
console.log(category)

async function postData(data = {}) {
    const response = await fetch('http://127.0.0.1:3001/lancamentos', {
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

const button = document.getElementById('button');

button.addEventListener(('click'), () => {
    postData({
        value: valueInput.value,
        method: methodSelect.value, 
        accountid: accountSelect.value, 
        category: categorySelect.value
    })
})

const valueInput = document.getElementById('value');
const methodSelect = document.getElementById('method');
const accountSelect = document.getElementById('account');
const categorySelect = document.getElementById('category');

function methodInsert(arr, met) {
    let output = '';
    for (let i = 0; i < arr.length; i++) {
        output += `<option value="${i}">${arr[i]}</option>`
    }
    met.innerHTML = output;
}

methodInsert(methods, methodSelect)
methodInsert(accounts, accountSelect)
methodInsert(categorys, categorySelect)
