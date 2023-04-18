import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';


const testCases = [
  { amount: '100', from: 'PLN', to: 'USD' },
  { amount: '20', from: 'USD', to: 'PLN' },
  { amount: '200', from: 'PLN', to: 'USD' },
  { amount: '345', from: 'USD', to: 'PLN' },
];

for (const testObj of testCases) {


  describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
      render(<CurrencyForm action={() => { }} />);
    });

    it('should run action callback with proper data on form submit', () => {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // find “convert” button
      const submitButton = screen.getByText('Convert');

      //find input elements
      const amountInput = screen.getByTestId('amount');
      const selectFrom = screen.getByTestId('selectFrom');
      const selectTo = screen.getByTestId('selectTo')

      // set test values to inputs
      userEvent.type(amountInput, testObj.amount);
      userEvent.selectOptions(selectFrom, testObj.from);
      userEvent.selectOptions(selectTo, testObj.to);

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to });

    });
  });
  // unmount component
  cleanup()
}