import { useState } from 'react';
import { Section } from './Section';
import { ContactForm } from './ContactForm ';
import { ContactsList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione', number: '443-89-12' },
    { id: 'id-3', name: 'Eden', number: '645-17-79' },
    { id: 'id-4', name: 'Annie', number: '227-91-26' },
  ]);

  const [filterUser, setFilter] = useState('');

  const updateContacts = ({ name, number }) => {
    const contactExists = contacts.find(contact => {
      return contact.name === name || contact.number === number;
    });

    contactExists
      ? Report.info(
          '',
          `Contact with name ${name} and number ${number} already exists`,
          'Okay'
        )
      : setContacts(prevContacts => [
          ...prevContacts,
          {
            name,
            number,
            id: nanoid(),
          },
        ]);
  };

  const filterContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContacts = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normalizedFilter = filterUser.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={updateContacts} />
      </Section>
      <Section title="Contacts">
        <Filter value={filterUser} filter={filterContacts} />
        <ContactsList
          contactList={filteredContacts}
          deleteContact={deleteContacts}
        />
      </Section>
    </>
  );
};

App.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  id: PropTypes.string,
};
