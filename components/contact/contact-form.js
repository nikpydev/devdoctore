import { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const sendContactData = async (contactDetails) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
};

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(''); // "pending", "success", "error"
  const [error, setError] = useState({});

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus('');
        setError({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({
        email,
        name,
        message
      });

      setEmail('');
      setName('');
      setMessage('');

      setRequestStatus('success');
    } catch (error) {
      console.error('Error submitting message: ', error);
      setRequestStatus('error');
      setError(error);
    }
  };

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!!!!!'
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: error.message
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor={'email'}>Your Email</label>
            <input
              type={'email'}
              id={'email'}
              required
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor={'name'}>Your Name</label>
            <input
              type={'text'}
              id={'name'}
              required
              onChange={handleNameChange}
              value={name}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor={'message'}>Your Message</label>
          <textarea
            id={'message'}
            rows={5}
            required
            onChange={handleMessageChange}
            value={message}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
