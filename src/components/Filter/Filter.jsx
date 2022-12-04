import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, changeFilterInput }) => (
  <label>
    <input
      type="text"
      name={filter}
      onChange={changeFilterInput}
      placeholder="🔍Find contacts by name🔎"
    />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilterInput: PropTypes.func.isRequired,
};

export default Filter;
