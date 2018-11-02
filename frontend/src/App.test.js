import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import {render, fireEvent} from 'react-testing-library';

beforeEach(function() {
  global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return {}
          }
        });
      });

      return p;
  });
});

it("renders without crashing", async function() {
  const wrapper = mount(<App />);
});

it('Renders Betslip', () => {
  const {getByText} = render(<App />)
  expect(getByText('Betslip')).toBeInTheDocument()
})

it('Manages to navigate to Receipt and finds Error page', () => {
  const {getByText} = render(<App />);
  fireEvent.click(getByText('Place Bets'))
  expect(getByText('Something went wrong')).toBeInTheDocument()
})