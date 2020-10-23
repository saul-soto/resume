import React from 'react';

class Header extends React.Component{
    render(){
        return(
            <div className='navigation'>
                <p><b>Saúl</b> Soto</p>

                <div className='buttons-selection'>
                    {this.props.menudata.map( (row,i) => {
                        const ls_words = row.text.split('+');
                        const contains_plus = ls_words.length > 1;
                        return(
                            <div>
                                {contains_plus? 
                                    <p>
                                        {ls_words[0]}<span>+-+-+</span>{ls_words[1]}
                                    </p>
                                :   <p>{row.text}</p>
                                }
                                {row.is_selected?<p>___</p>:null}
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