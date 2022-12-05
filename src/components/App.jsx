import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Notiflix from 'notiflix';
export default class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    ],
    filter: '',
  };

  onSubmitForm = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const findContact = this.state.contacts.find(contact =>
      contact.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
    findContact
      ? Notiflix.Notify.failure(`${name} is allready in contact-list`)
      : this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  changeFilterInput = e => {
    this.setState({ filter: e.target.value });
  };

  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitForm} />

        <h2>Contacts</h2>
        <Filter filter={filter} changeFilterInput={this.changeFilterInput} />

        <ContactList
          contacts={this.findContacts()}
          onDelContact={this.deleteContact}
        />
      </div>
    );
  }
}
