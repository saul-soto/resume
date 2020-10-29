import React from 'react';
import pdf from '../../assets/cv.pdf';
import Modal from './modal';
import * as d3 from 'd3';

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modal_is_visible: true
        }
    }

    render(){
        return(
            <div className='footer-contact'>
                <p className='footer-info'>made by me</p>
                
                <p 
                    className='footer-info'
                    onClick={this._handleModal.bind(this)}
                >
                    <span>contact</span>
                </p>

                <a
                    className="footer-info"
                    href={pdf}
                    download='cv.pdf'
                >
                    download cv
                </a>

                <Modal 
                    change_modal_visibility={this._handleModal.bind(this)}
                />                
                
            </div>
        )
    }

    async _handleModal(){
        const $modal = d3.select('.contact-modal');
        const up_or_down = !this.state.modal_is_visible ? 1: -3;

        const do_animation = () => {
            $modal
                .transition().duration(500)
                .style('margin-bottom', (5*up_or_down)+'%')
            this.setState({modal_is_visible:!this.state.modal_is_visible})
        }

        await do_animation();
        $modal.style('display', up_or_down === 1 ? 'flex':'none')
    }

    componentDidMount(){
        this._handleModal();
    }
};

export default Footer;