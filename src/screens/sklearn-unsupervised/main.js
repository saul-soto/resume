import React from 'react';
import axios from 'axios';

class SklearnUnsupervised extends React.Component{
    constructor(props){super(props);
        this.state = { 
            score:null,
            param_1:null,
            param_2:null,
        }
        
    }


    render(){
        return(
            <div>
                <div>
                    <h1>Sklearn Unsupervised</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            param 1:
                            <input type="text" onChange={(e)=>{this.setState({param_1:e.target.value})}} />
                        </label>
                        <label>
                            param 2:
                            <input type="text" onChange={(e)=>{this.setState({param_2:e.target.value})}} />
                        </label>

                        <input 
                            type="submit" 
                            value="Submit" 
                            onClick={()=>{this._get_score(this.state.param_1, this.state.param_2)}}
                        />
                    </form>
                </div>


                <div>
                    <p>Score: {this.state.score}</p>
                </div>

                
            </div>
        )
    }

    _get_score(param_1, param_2){
        axios.get(
            'https://my-interactive-cv.herokuapp.com/API/score_observation', 
            { params:{ param_1, param_2 }}
        )
            .then(resp=>{
                this.setState({score:resp.data.score});
            })
            .catch(err=>{
                console.log(err)
            })
        ;
    }
}

export default SklearnUnsupervised;