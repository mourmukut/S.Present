import React from 'react';

export default function() {
  return (
    <div className='m-10'>
    <h1>Contact Us</h1>
    <p>
      Feel free to reach out to us for any inquiries or feedback. 
      We're here to help!
    </p>
    <h2>Contact Information</h2>
    <ul>
      <li>Email: example@example.com</li>
      <li>Phone: +123-456-7890</li>
      <li>Address: 123 Main St, City, Country</li>
    </ul>
    <h2>Send us a Message</h2>
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows={4} required></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  </div>
);
}
