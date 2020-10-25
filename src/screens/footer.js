import React from 'react';
import pdf from '../assets/cv.pdf';

class Footer extends React.Component{
    render(){
        return(
            <div className='footer-contact'>
                <p className='footer-info'>made by me</p>
                <p className='footer-info'><span>contact</span></p>
                <a
                    className="footer-info"
                    href={pdf}
                    download='cv.pdf'
                >
                    download cv
                </a>
            </div>
        )
    }
};

export default Footer;