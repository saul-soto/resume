import React from 'react';
import './App.scss';
import Header from './screens/header';
import ContentContainer from './screens/content_container/main';


class App extends React.Component{

  render(){
		return(
			<>
				<Header />
				<ContentContainer />
			</>
			
		)
  	}

}

export default App;
