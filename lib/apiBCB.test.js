const api = require('./apiBCB.js');
const axios = require('axios');

jest.mock('axios');
test('getCotationApi', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 4.95 }
            ]
        }
    }
    axios.get.mockResolvedValue(res);
    api.getCotationApi('url').then(resp => {
        expect(resp).toEqual(res);
        expect(axios.get.mock.calls[0][0]).toBe(url);
    })
})

test('extractCotation', () => {
    const cotation = api.extractCotation({
        data: {
            value: [
                { cotacaoVenda: 4.95 }
            ]
        }
    })
    expect(cotation).toBe(4.95);
})
describe('getToday', () => {
    const realDate = Date;
    function mockDate(date) {
        global.Date = class ExtendsrealDate {
            constructor() {
                return new realDate(date);
            }
        }
    }
    afterEach(() => {
        global.Date = realDate;
    })
    test('getToday', () => {
        mockDate('2021-06-23T16:14:00z');
        const today = api.getToday();
        expect(today).toBe('6-23-2021')
    })
})

test("getUrl", () => {
    const url = api.getUrl('MY-Date');
    expect(url).toBe(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MY-Date'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`)
})

test('getCotation', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 4.95 }
            ]
        }
    }
    const getToday = jest.fn();
    getToday.mockReturnValue('06-23-2021');
    const getUrl = jest.fn();
    getUrl.mockReturnValue('url');
    const getCotationApi = jest.fn();
    getCotationApi.mockResolvedValue(res);
    const extractCotation = jest.fn();
    extractCotation.mockReturnValue(4.95);

    api.pure
        .getCotation({ getToday, getUrl, getCotationApi, extractCotation })()
        .then(res => {
            expect(res).toBe(4.95);
        })

})

test('getCotation', () => {
    const res = {

    }
    const getToday = jest.fn();
    getToday.mockReturnValue('06-23-2021');
    const getUrl = jest.fn();
    getUrl.mockReturnValue('url');
    const getCotationApi = jest.fn();
    getCotationApi.mockReturnValue(Promise.reject('err'));
    const extractCotation = jest.fn();
    extractCotation.mockReturnValue(4.95);

    api.pure
        .getCotation({ getToday, getUrl, getCotationApi, extractCotation })()
        .then(res => {
            expect(res).toBe('');
        })

})