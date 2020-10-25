import React from 'react';
import pdf from '../../assets/cv.pdf';
import Modal from './modal';

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modal_is_visible: false
        }
    }

    render(){
        return(
            <div className='footer-contact'>
                <p className='footer-info'>made by me</p>
                
                <p 
                    className='footer-info'
                    onClick={() => {this.setState({modal_is_visible:true})}}
                >
                    <span>contact</span>
                </p>

                <a
                    className="footer-info"
                    href={pdf}
                    download='cv.pdf'
                >
                    download cvss
                </a>

                {!this.state.modal_is_visible ? null: 
                    <Modal 
                        change_modal_visibility={() => {this.setState({modal_is_visible:!this.state.modal_is_visible})}}
                    />
                }
                
            </div>
        )
    }
};

export default Footer;