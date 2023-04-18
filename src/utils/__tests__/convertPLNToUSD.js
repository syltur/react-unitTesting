import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('xd')).toBeNaN();
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('-66')).toBeNaN();
  });
  it('should return NaN when no input is provided', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('should return Error when input is different than string or number', () => {
    expect(convertPLNToUSD(true)).toBe('Error');
    expect(convertPLNToUSD(() => {})).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
  });
  it('should return $0.00 when input is lower than 0', () => {
    expect(convertPLNToUSD(-5)).toBe('$0.00');
    expect(convertPLNToUSD(-0.8)).toBe('$0.00');
  });
});
