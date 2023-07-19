import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Section } from './Section/section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedStorage = localStorage.getItem('contacts');
    if (savedStorage) {
      this.setState({
        contacts: JSON.parse(savedStorage),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  takeDataFromSubmitForm = data => {
    const existingContact = this.state.contacts.find(
      element => element.name === data.name
    );
    if (existingContact) {
      window.alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({ contacts: [...prevState.contacts, data] }));
    Notify.success(`${data.name} is successfully added to your contact list`);
  };

  handleFilterInputChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(element =>
      element.name.toLowerCase().includes(this.state.filter)
    );
  };

  deleteContact = name => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.name !== name),
    }));
    Notify.failure(`${name} is deleted from your contact list`);
  };

  render() {
    const visibleContacts = this.getFilteredContacts();
    return (
      <>
        <Section title="Phonebook">
          <ContactForm handleSubmit={this.takeDataFromSubmitForm} />
        </Section>

        <Section title="Contacts">
          <Container>
            <Filter
              value={this.state.filter}
              onChange={this.handleFilterInputChange}
            />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            ></ContactList>
          </Container>
        </Section>
      </>
    );
  }
}
