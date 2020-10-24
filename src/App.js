import React from 'react';
import './App.scss';
import Header from './screens/header';
import ContentContainer from './screens/content_container/main';
import Footer from './screens/footer';


class App extends React.Component{

  render(){
		return(
			<>
				<Header />
				<ContentContainer />
				<Footer />
			</>
			
		)
  	}

}

export default App;
