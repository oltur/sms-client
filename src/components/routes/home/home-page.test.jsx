import React from 'react';
import test from 'tape';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import HomePage from './home-page';

configure({ adapter: new Adapter() });

test('HomePage', (t) => {
  const wrapper = shallow(<HomePage />);

  t.ok(
    wrapper.text().indexOf('People Search for Klarna') >= 0,
    'has a header'
  );

  t.end();
});
