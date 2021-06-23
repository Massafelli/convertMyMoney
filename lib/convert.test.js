const convert = require("./convert");

test('convert cotation 4 to amount 4', () => {
    expect(convert.convert(4, 4)).toBe(16);
})
test('convert cotation 0 to amount 4', () => {
    expect(convert.convert(0, 4)).toBe(0);
})
test('toMoney converts floats', () => {
    expect(convert.toMoney(2)).toBe('2.00');
})