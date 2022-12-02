import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  onChangeInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Вызывается при отправке формы
  onSubmitForm = event => {
    event.preventDefault();
    const { name, number } = this.state;

    // Проп который передается форме для вызова при сабмите
    this.props.onSubmitForm({ id: nanoid(), name: name, number: number });
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    // const { name, number } = this.state;
    return (
      <form onSubmit={this.onSubmitForm}>
        <p>👤Name</p>{' '}
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.onChangeInput}
        />
        <td></td>
        <p>📞Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.onChangeInput}
        />
        <p>
          <button type="submit">Add new contact </button>
        </p>
      </form>
    );
  }
}

ContactForm.propTypes = {};
