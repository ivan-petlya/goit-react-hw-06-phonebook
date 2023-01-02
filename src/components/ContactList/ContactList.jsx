import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDelContact }) => (
  <ul className={css.contactsList}>
    {contacts.map(({ id, name, number }) => {
      return (
        <li className={css.contactsList__item} key={id}>
          👤{name} : {number}
          <button
            className={css.delButton}
            type="button"
            onClick={() => onDelContact(id)}
          >
            ❌delete
          </button>
        </li>
      );
    })}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDelContact: PropTypes.func,
};

export default ContactList;
