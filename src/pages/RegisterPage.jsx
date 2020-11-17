import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm"

function RegisterPage() {
    return ( 
        <div className="mainContent">
            <h1>Register your details</h1>
            <div> 
                <RegisterForm/>
            </div> 
        </div>
      );
}

export default RegisterPage;


