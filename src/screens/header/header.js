import React from 'react';
import * as d3 from 'd3';
import debounce from 'debounce';
import content from './languages.jsx';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected_option: 'About'
        }
    }

    render(){
        const lang = this.props.lang;
        const menu_data = content.menu_data[lang];

        return(
            <div className='navigation'>
                <p><b>{content.first_name[lang]}</b> Soto</p>

                <div className='buttons-selection'>
                    {menu_data.map( (button,i) => {
                        const ls_words = button.text.split('+');
                        const _content = !(ls_words.length > 1)?<>{button.text}</>:<>{ls_words[0]}<span>+</span>{ls_words[1]}</>;
                        

                        return(
                            <div key={i} className='menu-option' id={i+1 === menu_data.length? 'is-last-option': null}>
                                <p 
                                    className='option'
                                    
                                    id={button.tag}
                                    onClick={() => {
                                        const tag = '#nav-'+button.tag.replace('+','_').toLowerCase();
                                        const selection = d3.select(tag)._groups[0][0];
                                        const DOM_top = i+1 === menu_data.length ? selection.offsetParent.offsetTop:selection.offsetTop;
                                        window.scrollTo(0,DOM_top-60);
                                        this.setState({selected_option:button.tag});
                                    }}
                                >
                                    {_content}
                                </p>
                                <div className='svg-animation' id={button.tag !== this.state.selected_option?null:'is-selected'}></div>
                                
                            </div>                        
                        )
                    })}

                </div>
            </div>
        )
    }

    async _make_most_visible_screen_selected_option(){

        const get_screen = () => {
            // motivation: extract scroll position and screen top positions, then identify which 
            // screen you are on, and then calculate if you are before/after half of the next screen
            // if so, select next screen else stay where you are
            // a + (b-a)/2 == (a+b)/2
            const scroll_pos = window.scrollY;
            const $ls_nodes = d3.selectAll('.content-container').nodes()[0].childNodes;
            const ls_screens = d3.range($ls_nodes.length).map(i => $ls_nodes[i].offsetTop);

            const after_which_screen = d3.sum(ls_screens.map(screen_pos => 
                screen_pos <= scroll_pos + d3.min(ls_screens) ? 1: 0
            )) - 1
            ;

            const select_next_screen = 
                scroll_pos >
                (ls_screens[after_which_screen]+ls_screens[after_which_screen + 1])/2
            ;

            return content.menu_data[this.props.lang][select_next_screen ? after_which_screen + 1: after_which_screen].tag;
        }

        const screen = await get_screen();
        this.setState({selected_option: screen});
        // console.log(Math.random())
    }


    componentDidMount(){
		window.addEventListener(
            'scroll', 
            debounce(this._make_most_visible_screen_selected_option.bind(this) ,200)
        )
	}
}


export default Header;