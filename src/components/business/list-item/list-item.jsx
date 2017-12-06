import React from 'react';
import PropTypes from 'prop-types';

import Person from '../../../models/person';

export default function ListItem(props) {
  return (
    <div className="cui__selector--direct__item">
      <img alt="person" className="user-avatar" src={props.item.picture} />

      <div className="cui__selector--direct__label">
        {props.item.name} ({props.item.age}), {props.item.phone}
      </div>

      <p className="cui__selector--direct__description">
        {props.item.address.street}
        . {props.item.address.city}, {props.item.address.country}.
      </p>
    </div>
  );
}

ListItem.defaultProps = {
  item: null,
};

ListItem.propTypes = {
  item: PropTypes.instanceOf(Person),
};
