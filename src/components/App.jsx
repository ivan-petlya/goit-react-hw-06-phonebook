import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Notiflix from 'notiflix';
import useLocalStorage from './hooks/useLocalStorage';
// export default class App extends React.Component {
// static defaultProps = { initContacts: [] };
// state = {
//   contacts: [],
//   filter: '',
// };
const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useLocalStorage('filter', '');

  const addContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    const isExist = contacts.find(
      contact =>
        contact.name === newContact.name || contact.number === newContact.number
    );
    if (isExist) {
      Notiflix.Notify.failure(
        `${newContact.name} or ${newContact.number} is allready in contact-list`
      );
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilterInput = event => {
    setFilter(event.target.value);
  };

  const findContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const ondeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} changeFilterInput={changeFilterInput} />

      <ContactList contacts={findContact()} onDelContact={ondeleteContact} />
    </div>
  );
};
export default App;
