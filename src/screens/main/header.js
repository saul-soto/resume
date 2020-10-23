import React from 'react';

class Header extends React.Component{
    render(){
        return(
            <div>
                <p><b>Saúl</b> Soto</p>

                <div>
                    {this.props.menudata.map( (row,i) => {
                        const ls_words = row.text.split('+');
                        const text_tag = ls_words.length > 1 ? 
                            <p key={i}>
                                {ls_words[0]}
                                <span>+-+-+</span>
                                {ls_words[1]}
                            </p>
                            :
                            <p key={i}>{row.text}</p>;
                        
                        const button = !row.is_selected ? text_tag:
                            <div key={i}>
                                {text_tag}
                                <p> barra de selección</p>
                            </div>
                        return(button)
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