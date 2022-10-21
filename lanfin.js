
class Lancamentos {
    constructor( value, method, accountid, category){
        this.value = value;
        this.method = method;
        this.accountid = accountid;
        this.category = category;
    }
}

class Account {
    constructor(number, agency, name, type){
            this.number = number;
            this.agency = agency;
            this.name = name;
            this.type = type;
    }
}

class Cep {
    constructor(cep,rua,numero,bairro,cidade,uf,complemento){
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.complemento = complemento;
    }
}

module.exports.convertLancamentos = function (req){
    return new Lancamentos(req.body.value.substring(),req.body.method.substring(),req.body.accountid.substring(),req.body.category.substring());
}

module.exports.convertAccount = function(req) {
    return new Account (req.body.number.substring(), req.body.agency.substring(), req.body.name.substring(), req.body.type.substring());
}

module.exports.convertCep = function(req){
    return new Cep (req.body.cep.substring(), req.body.rua.substring(), req.body.numero.substring(),
    req.body.bairro.substring(), req.body.cidade.substring(), req.body.uf.substring(), req.body.complemento.substring())
}
