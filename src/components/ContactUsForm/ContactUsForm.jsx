import React from "react";

function ContactUsForm() {
    // template
    return (
        <div>
            <div>
                <h1>Contact</h1>
                <p>Got a question? Get in touch!</p>
            </div>
            <form action="https://formspree.io/f/xoqpwdww" method="post">
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
    );
}

export default ContactUsForm;