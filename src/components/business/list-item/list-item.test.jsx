import React from 'react';
import test from 'tape';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import Person from '../../../models/person';
import Address from '../../../models/address';

import ListItem from './list-item';

configure({ adapter: new Adapter() });

test('ListItem', (t) => {
  const item = new Person({
    id: '9999',
    name: 'aaa',
    phone: '1234-5678',
    picture: 'http://bbb.com/test.png',
    email: 'ccc@ccc.com',
    birthday: 223768800,
    address: new Address({
      city: 'ddd',
      street: 'eee',
      country: 'fff',
    }),
    birthdayString: '02/02/1977 22:00:00',
    age: 40,
  });
  const wrapper = shallow(<ListItem key={item.id} item={new Person(item)} />);

  t.ok(
    ['aaa', '40', '1234-5678', 'ddd', 'eee', 'fff']
      .every((value) => wrapper.text().indexOf(value) >= 0),
    'has all values'
  );

  t.end();
});
