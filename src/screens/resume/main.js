import React from 'react';
import Header from './header/header';
import ContentContainer from './content_container/main';
import Footer from './footer/footer';


class Resume extends React.Component{
    constructor(props){
		super(props);
		this.state = {
			language: 'english'
		}
    }
    
    render(){
        return(
			<>
				<Header lang={this.state.language}/>
				<ContentContainer lang={this.state.language}/>
				<Footer c
				lang={this.state.language}
				choose_language={(language) => {this.setState({language})}}
				/>
			</>
        )
    }
}

export default Resume;