import React from 'react';
import axios from 'axios';

class SklearnUnsupervised extends React.Component{
    constructor(props){super(props);
        this.state = { 
            score:null,
            params: {
                'price':221900,
                'bedrooms':3,
                'bathrooms':1,
                'sqft_living':1180,
                'sqft_lot':5650,
                'floors':1,
                'waterfront':0,
                'view':0,
                'condition':3,
                'grade':7,
                'sqft_above':1180,
                'sqft_basement':0,
                'yr_built':1955,
                'yr_renovated':0,
                'zipcode':98178,
                'lat':47.5112,
                'long':-122.257,
                'sqft_living15':1340,
                'sqft_lot15':5650
            }

        }
        
    }



    render(){

        
        return(
            <div className='container'>
                <div>
                    <h1>Sklearn Unsupervised</h1>
                    <form onSubmit={this.handleSubmit}>
                        {Object.keys(this.state.params).map(param=>{return(
                            <label>
                                {param}:
                                <input 
                                    type="number"
                                    value={this.state.params[param]}
                                    onChange={(e)=>{
                                        let new_params = this.state.params;
                                        new_params[param] = e.target.value;
                                        this.setState({ params:new_params })
                                    }} 
                                />
                            </label>

                        )})}
                        <input 
                            type="submit" 
                            value="Submit" 
                            onClick={()=>{this._get_score(this.state.params)}}
                        />
                    </form>
                </div>


                <div>
                    <p>Score: {this.state.score}</p>
                </div>

                
            </div>
        )
    }

    _get_score(params){
        
        console.log(params)
        // axios.get(
        //     'https://my-interactive-cv.herokuapp.com/API/score_observation', 
        //     { params:{ param_1, param_2 }}
        // )
        //     .then(resp=>{
        //         this.setState({score:resp.data.score});
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // ;
    }
}

export default SklearnUnsupervised;