import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { sendContactData } from '../redux/actions/contactActions';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to send contact data
        dispatch(sendContactData({ name, email, message }));
        // Clear form fields after submission
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item label="Name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Email">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Message">
                <Input.TextArea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default ContactForm;
