import React from 'react';
import './styles/App.scss';
import Header from './screens/header';
import ContentContainer from './screens/content_container/main';
import Footer from './screens/footer/footer';


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
				<Header />
				<ContentContainer />
				<Footer choose_language={(language) => {console.log(language); this.setState({language})}}/>
			</>		
		)
	}
}

export default App;
