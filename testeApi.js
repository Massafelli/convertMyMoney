const axios = require('axios');

const url = `https://111olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='06-22-2021'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

axios.get(url).then(result => {
    console.log(result.data.value[0].cotacaoVenda);
}).catch(err => {
    console.log(err);
})