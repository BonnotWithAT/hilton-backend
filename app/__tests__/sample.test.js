import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('sample test 101', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })
});