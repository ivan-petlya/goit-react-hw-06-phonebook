import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, getItem, getFilter } from '../../redux/contactsSlice';
import css from './ContactList.module.css';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getItem);
  const filter = useSelector(getFilter);
  console.log(contacts);
  const deteteContact = id => {
    dispatch(deleteContacts(id));
  };

  const filteredContacts = () => {
    if (filter === '') {
      return false;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const singleFilter = filteredContacts();
  const listContacts = singleFilter ? singleFilter : contacts;

  return listContacts.length !== 0 ? (
    <>
      <ul className={css.contactList}>
        {listContacts.map(({ id, name, number }) => (
          <li className={css.contactsList__item} key={id}>
            👤{name} : {number}
            <button className={css.delButton} onClick={() => deteteContact(id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <p>contacts list empty</p>
  );
};

export default ContactsList;
