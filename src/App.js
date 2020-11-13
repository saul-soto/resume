import React from 'react';
import './styles/App.scss';
import Resume from './screens/resume/main';
import SklearnUnsupervised from './screens/sklearn-unsupervised/main';
// import SklearnSupervised from './screens/sklearn-unsupervised/main copy'
import { Route } from 'react-router-dom';

class App extends React.Component{
	render(){
		return(
			<>
				<Route exact path={'/'} component={Resume} />
				<Route path={'/sklearn-unsupervised'} component={SklearnUnsupervised} />
				{/* <Route path={'/sklearn-supervised'} component={SklearnSupervised} /> */}
			</>
		)
	}
}

export default App;
