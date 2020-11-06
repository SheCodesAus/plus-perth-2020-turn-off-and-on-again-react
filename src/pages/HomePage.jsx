import React, {useState, useEffect} from "react";

import banner from '../images/ready-to-study.jpg'

function HomePage() {
    return ( 
        <div>
            <img src={banner} alt="Banner"/>
            <div className="project-header">
                <h1> This is the HomePage </h1> 
                <div > 
                    <button>Women</button>
                
                </div> 
            </div>
            <div className="footer">This is a footer</div>
        </div>
    );
}

export default HomePage;