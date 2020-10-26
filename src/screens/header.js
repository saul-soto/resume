import React from 'react';
import * as d3 from 'd3';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected_option: 'About'
        }
    }


    render(){
        return(
            <div className='navigation'>
                <p><b>Saúl</b> Soto</p>

                <div className='buttons-selection'>
                    {this.props.menudata.map( (button,i) => {
                        const ls_words = button.split('+');
                        const content = !(ls_words.length > 1)?<>{button}</>:<>{ls_words[0]}<span>+</span>{ls_words[1]}</>;
                        const menu_data = this.props.menudata;

                        return(
                            <div key={i} className='menu-option' id={i+1 === menu_data.length? 'is-last-option': null}>
                                <p 
                                    className='option'
                                    id={button}
                                    onClick={() => {
                                        const tag = '#nav-'+button.replace('+','_').toLowerCase();
                                        const selection = d3.select(tag)._groups[0][0];
                                        const DOM_top = i+1 === menu_data.length ? selection.offsetParent.offsetTop:selection.offsetTop;
                                        window.scrollTo(0,DOM_top-60);
                                        this.setState({selected_option:button})
                                    }}
                                >
                                    {content}
                                </p>
                                <div className='svg-animation' id={button !== this.state.selected_option?null:'is-selected'}></div>
                                
                            </div>                        
                        )
                    })}

                </div>
            </div>
        )
    }
}


Header.defaultProps = {
    menudata: ['About','Experience','Skills+Tools','Gallery+Projects']
}

export default Header;