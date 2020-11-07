import React from 'react';
import pdf from '../../assets/SaulSotoCV_eng.pdf';
import {ReactComponent as SVGLanguage} from '../../assets/language.svg'
import Modal from './modal';
import * as d3 from 'd3';

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modal_is_visible: true,
            show_language_menu: false
        }
    }

    render(){
        const animation_duration = 500;

        return(
            <div className='footer-contact'>
                <p className='footer-info'>made by me</p>
                
                <p 
                    className='footer-info'
                    onClick={() =>  {this._handleModal(animation_duration)}}
                >
                    <span>contact</span>
                </p>

                <a
                    className="footer-info"
                    href={pdf}
                    download='SaulSotoCV_eng.pdf'
                >
                    download cv
                </a>

                <div className='language-selector'>
                    <SVGLanguage 
                        width='30px'
                        height='auto'
                        className='language'
                        onMouseOver={() => {d3.select('.language').attr('width',35)}}
                        onMouseLeave={() => {d3.select('.language').attr('width',30)}}
                        onClick={() => {this.setState({show_lang:!this.state.show_lang})}}
                    />

                    <div className='lang-menu-background' id={!this.state.show_lang ? 'not-visible':null}>
                        {['English', 'Spanish'].map((lan,i) => {return(
                            <p  
                                key={i}
                                className='language'
                                id={this.props.lang === lan.toLocaleLowerCase() ? 'is-selected' : null}
                                onClick={() => {
                                    this.props.choose_language(lan.toLocaleLowerCase());
                                    this.setState({show_lang:!this.state.show_lang});
                                }}
                            >
                                {lan}
                            </p>
                        )})}
                    </div>
                </div> 

                <Modal 
                    change_modal_visibility={() =>  {this._handleModal(animation_duration)}}
                />


                
            </div>
        )
    }

    _handleModal(duration){
        const $modal = d3.select('.contact-modal');
        const up_or_down = !this.state.modal_is_visible ? 1: -3;
        
        $modal
            .style('display', 'flex')
            .transition().duration(duration)
            .style('margin-bottom', (5*up_or_down)+'%')
            .transition().duration(duration)
            .style('display', up_or_down<0 ? 'none': 'flex')
        
        
        this.setState({modal_is_visible:!this.state.modal_is_visible})
    }

    componentDidMount(){
        this._handleModal(0);
    }
};

export default Footer;