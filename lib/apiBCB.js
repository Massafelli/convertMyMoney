const axios = require('axios');
const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

const getCotationApi = url => axios.get(url)
const extractCotation = res => res.data.value[0].cotacaoVenda;
const getToday = () => {
    const today = new Date();
    return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
}
const getCotation = ({ getToday, getUrl, getCotationApi, extractCotation }) => async () => {
    try {
        const today = getToday();
        const url = getUrl(today);
        const res = await getCotationApi(url);
        const cotation = extractCotation(res);
        return cotation;
    } catch (err) {
        return '';
    }
}

module.exports = {
    getCotationApi,
    extractCotation,
    getCotation: getCotation({ getToday, getUrl, getCotationApi, extractCotation }),
    getToday,
    getUrl,
    pure: { getCotation }
}
