import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLN = [
  { amount: 100, solution: 'PLN 100.00 = $28.57' },
  { amount: 20, solution: 'PLN 20.00 = $5.71' },
  { amount: 250, solution: 'PLN 250.00 = $71.43' },
  { amount: 345, solution: 'PLN 345.00 = $98.57' },
];

const testCasesUSD = [
  { amount: 100, solution: '$100.00 = PLN 350.00' },
  { amount: 20, solution: '$20.00 = PLN 70.00' },
  { amount: 250, solution: '$250.00 = PLN 875.00' },
  { amount: 345, solution: '$345.00 = PLN 1,207.50' },
];

const minusTest = [
  { amount: -100, solution: '$100.00 = PLN 350.00' },
  { amount: -20, solution: '$20.00 = PLN 70.00' },
  { amount: -250, solution: '$250.00 = PLN 875.00' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />)
  })
 for (const testCase of testCasesPLN) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testCase.amount} />)
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testCase.solution);
    })
    cleanup()
  }
  for (const testCase of testCasesUSD) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testCase.amount} />)
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testCase.solution);
    })
    cleanup()
  }
  it('should render proper info when having the same from and to PLN input', () => {
    render(<ResultBox from="PLN" to="PLN" amount={100} />)
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 100.00 = PLN 100.00')
  })
  it('should render proper info when having the same from and to USD input', () => {
    render(<ResultBox from="USD" to="USD" amount={342} />)
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('$342.00 = $342.00')
  })
  for (const testCase of minusTest) {
    it('should render WRONG value in case getting a negative input', () => {
      render(<ResultBox from="USD" to="PLN" amount={testCase.amount} />)
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
    })
    cleanup()
  }
});