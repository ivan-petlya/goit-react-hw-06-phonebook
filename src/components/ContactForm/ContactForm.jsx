// import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, getItem } from '../../redux/contactsSlice';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getItem);

  const handleChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = { id: nanoid(), name, number };

    const newName = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (newName) {
      Notiflix.Notify.failure(`${name}  is allready in contact-list`);
      return;
    }

    dispatch(addContacts(newContact));
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Name</p> 👤
        <input
          className={css.input}
          type="text"
          name="name"
          placeholder="john johnson"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <p>Number</p>
        📞
        <input
          className={css.input}
          placeholder="555-55-55"
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <p>
          <button type="submit">Add new contact </button>
        </p>
      </form>
    </>
  );
}

// ContactForm.propTypes = {
//   name: PropTypes.string,
//   number: PropTypes.string,
//   onSubmit: PropTypes.func,
// };

// export default ContactForm;
