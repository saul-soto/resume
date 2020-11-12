import React from 'react';
import './styles/App.scss';
import Header from './screens/resume/header/header';
import ContentContainer from './screens/resume/content_container/main';
import Footer from './screens/resume/footer/footer';


class App extends React.Component{
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
				<Footer 
					lang={this.state.language}
					choose_language={(language) => {this.setState({language})}}
				/>
			</>		
		)
	}
}

export default App;
