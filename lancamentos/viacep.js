

async function getCep(cep){
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

async function postData(data = {}) {
    const response = await fetch('http://127.0.0.1:3001/cep', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    return response.json()

}

// inputs
const inputCEP = document.getElementById('cep');
const inputRUA = document.getElementById('rua');
const inputNUM = document.getElementById('numero');
const inputBAIRRO = document.getElementById('bairro');
const inputCOMPL = document.getElementById('complemento');
const inputCIDADE = document.getElementById('cidade');
const inputUF = document.getElementById('uf')

// buttons
const consultarBtn = document.getElementById('consultar');
const salvarBtn = document.getElementById('salvar');

function showData(response){
    inputRUA.value = response.logradouro;
    inputBAIRRO.value = response.bairro;
    inputCOMPL.value = response.complemento;
    inputCIDADE.value = response.localidade
    inputUF.value = response.uf
}

consultarBtn.addEventListener('click', ()=>{
    if(inputCEP.value.length == 8){
        getCep(inputCEP.value).then((data) => {
        if(!data.erro){
            showData(data)
        }
    })}
})

salvarBtn.addEventListener('click', () => {
    if(inputCEP.value.length == 8){
        console.log('clicou')
        getCep(inputCEP.value).then((data) =>{
            console.log('tentou dar post')
            if(!data.erro){
                postData({
                    cep: `"${inputCEP.value}"`,
                    rua: `"${inputRUA.value}"`,
                    numero: `"${inputNUM.value}"`,
                    bairro: `"${inputBAIRRO.value}"`,
                    cidade: `"${inputCIDADE.value}"`,
                    uf: `"${inputUF.value}"`,
                    complemento: `"${inputCOMPL.value}"`
                })
                console.log('')
            }
        })
    }
})