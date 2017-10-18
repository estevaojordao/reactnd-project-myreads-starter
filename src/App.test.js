import React from 'react'
import App from './App'
import { shallow } from 'enzyme';

global.localStorage = {
    getItem: () => {}
}

it('renders without crashing', () => {
  shallow(<App />);
})


