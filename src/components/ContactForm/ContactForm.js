import PropTypes from 'prop-types';
import { Component } from "react";
import { Form, Label, Input, Button } from './ContactForm.styled';

export class ContactForm extends Component {
    state = {
        name: "",
        number: "",
    };

    static propTypes = {
        handleSubmit: PropTypes.func,
    };

    handleInputChange = e => {
        const { name, value } = e.currentTarget;
        this.setState(
            {[name]: value}
        );  
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit(this.state);
        this.resetForm();
    };

    resetForm = () => {
        this.setState({
            name: "",
            number: "",
        })
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Label>
                    Name
                    <Input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                </Label>
               
                <Label>
                    Number
                    <Input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={this.state.number}
                        onChange={this.handleInputChange}
                    />
                </Label>  
    
                <Button type="submit">Add contact</Button>
            </Form>
        );
    };
};