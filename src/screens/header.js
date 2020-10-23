import React from 'react';

class Header extends React.Component{
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
                                <p className='option'>{content}</p>
                                {!row.is_selected?null:
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