const methods = ['Expense', 'Income','Passive'];
const accounts = ['Nubank', 'Itau', 'Picpay','Viasoftpay'];
const category = ['Food', 'Gas', 'Bills', 'Investments', 'Salary'];

const table = document.getElementById('tabela');

async function returnData() {
    try {
        const response = await fetch('http://localhost:3000/lancamentos');
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
    }
}

returnData().then((response) => {
    createTable(response)
})

function createTable(lanfin) {
    let output = `<tr>
    <th>ID</th>
    <th>Valor</th>
    <th>Método</th>
    <th>Conta</th>
    <th>Categoria</th>
    </tr>`

    for(i = 0;i < lanfin.length;i++){
        output += `<tr><td>${lanfin[i].IDLANFIN}</td>
        <td>${Number(lanfin[i].VALUE).toFixed(2)}</td><td>${methods[lanfin[i].METHOD]}</td>
        <td>${accounts[lanfin[i].ACCOUNTID]}</td><td>${category[lanfin[i].CATEGORY]}</td></tr>`
    }
    table.innerHTML = output;
}







