import React from "react";

const ContactForm = () => {
  return (
    <div className="w-full min-h-full flex pt-56">
      <form class="formContainer">
        <h2>Send me a message. Let's have a chat!</h2>
        <div className="formElement">
          <label className="mr-8" for="from_name">
            Name
          </label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            placeholder="Your name.."
            required
          />
        </div>

        <div class="formElement">
          <label className="mr-8">E-mail</label>
          <input
            type="email"
            id="from_email"
            name="from_email"
            placeholder="Your email.."
            required
          />
        </div>

        <div class="formElement">
          <label className="mr-8" for="message">
            Message
          </label>
          <textarea
            name="message"
            rows="8"
            cols="30"
            placeholder="Your message.."
            required
          />
        </div>
        <button type="submit" className="formButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
