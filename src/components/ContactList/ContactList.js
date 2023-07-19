import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { ContactListEl } from './ContactList.styled';

export function ContactList({contacts, onDeleteContact}) {
    return (
        <ContactListEl>
            {contacts.map((contact) => {
                    return (
                        <ContactItem 
                            key={contact.name}
                            name={contact.name}
                            number={contact.number}
                            onDeleteContact={onDeleteContact}
                        />
                    );
                })}                
        </ContactListEl>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    onDeleteContact: PropTypes.func,
};