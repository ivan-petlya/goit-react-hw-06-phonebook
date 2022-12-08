import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Notiflix from 'notiflix';
export default class App extends React.Component {
  static defaultProps = { initContacts: [] };
  state = {
    contacts: [],
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
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    } else {
      this.setState({ contacts: this.props.initContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
