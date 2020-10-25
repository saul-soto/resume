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
                    {this.props.menudata.map( (row,i) => {
                        const ls_words = row.text.split('+');
                        const content = !(ls_words.length > 1)?<>{row.text}</>:<>{ls_words[0]}<span>+</span>{ls_words[1]}</>
                        
                        return(
                            <div key={i} className='menu-option' id={i+1 === this.props.menudata.length? 'is-last-option': null}>
                                <p 
                                    className='option'
                                    id={row.text}
                                    onClick={() => {
                                        const tag = '#nav-'+row.text.replace('+','_').toLowerCase();
                                        const top = d3.select(tag)._groups[0][0].offsetTop;
                                        window.scrollTo(0,top-60);
                                        this.setState({selected_option:row.text})
                                    }}
                                >
                                    {content}
                                </p>
                                {row.text !== this.state.selected_option?null:
                                    <div className='svg-animation'></div>
                                }
                            </div>                        
                        )
                    })}

                </div>
            </div>
        )
    }
}


Header.defaultProps = {
    menudata: [
        {text: 'About', is_selected:true},
        {text: 'Experience', is_selected:false},
        {text: 'Skills+Tools', is_selected:false},
        {text: 'Gallery+Projects', is_selected:false},
    ]
}

export default Header;