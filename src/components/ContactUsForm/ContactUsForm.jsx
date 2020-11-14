import React from "react";

function ContactUsForm() {
    // template
    return (
        <div>
            <div className="wide-form" id="contact-form">
            <form action="https://formspree.io/f/xoqpwdww" method="post">
                <h2>Contact</h2>
                <p className="message">We're here to help. If you have a question, leave us a message and we'll get back to you as soon as we can.</p>
                <p></p>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Your name"/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Your email"/>
                </div>           
                <div>
                    <label htmlFor="message">Message:</label>
                    <input 
                        type="text"
                        name="message"
                        placeholder="Leave us a message"/>
                </div>            
                <button type="submit">Send</button>
            </form>
            </div>
        </div>
    );
}

export default ContactUsForm;