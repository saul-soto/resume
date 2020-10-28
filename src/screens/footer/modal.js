import React from 'react';

class Modal extends React.Component{
    render(){
        return(
            <div 
                className='contact-modal' 
                onClick={(e) => {if(e.target.className === 'contact-modal'){this.props.change_modal_visibility()} }}
            >

                <div className='modal'>
                    {this.props.contact_data.map((row,i)=>{return(
                        <div key={i} className='modal-row'>
                            {row.is_link?
                                <a 
                                    className='modal-info' 
                                    href={'https://www.'+row.contact} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >{row.contact}</a>
                                :
                                <a
                                    className='modal-info'
                                    href={'mailto:'+row.contact}
                                >
                                    {row.contact}
                                </a>
                            }
                            

                        </div>
                    )})}
                </div>

            </div>
        )
    }
};


Modal.defaultProps = {
    contact_data:[
        {
            contact:'alessaul03@hotmail.com',
            logo:null,
            is_link:false
        },
        {
            contact:'linkedin.com/in/saulsoto',
            logo:null,
            is_link:true
        },
    ]
}

export default Modal;