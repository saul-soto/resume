import React from 'react';
import axios from 'axios';

class SklearnUnsupervised extends React.Component{
    constructor(props){super(props);
        this.state = { 
            score:null,
            params: {
                'price':{label:'Price', value:221900},
                'bedrooms':{label:'Bedrooms', value:3},
                'bathrooms':{label:'Bathrooms', value:1},
                'sqft_living':{label:'Built (sqft)', value: 1180},
                'sqft_lot':{label:'Area (sqft)', value:5650},
                'floors':{label:'Floors', value:1},
                // 'waterfront':0,
                // 'view':0,
                // 'condition':3,
                // 'grade':7,
                // 'sqft_above':1180,
                // 'sqft_basement':0,
                'yr_built':{label:'Year Built', value: 1955},
                // 'yr_renovated':0,
                // 'zipcode':98178,
                // 'lat':47.5112,
                // 'long':-122.257,
                // 'sqft_living15':1340,
                // 'sqft_lot15':5650
            }

        }
        
    }



    render(){

        const dic_params = this.state.params;

        return(
            <div className='container'>
                <div className='userform-container'>
                    <h1>Sklearn Unsupervised</h1>
                        {Object.keys(dic_params).map(param=>{return(
                            <div>
                                <p>{dic_params[param].label}</p>
                                <input 
                                    type="number"
                                    value={dic_params[param].value}
                                    onChange={(e)=>{
                                        let new_params = dic_params;
                                        new_params[param].value = e.target.value;
                                        this.setState({ params:new_params })
                                    }} 
                                />
                            </div>

                        )})}




                        <input 
                            type="submit" 
                            value="Submit" 
                            onClick={()=>{this._get_score(dic_params)}}
                        />
                </div>


                <div>
                    <p>Score: {this.state.score}</p>
                </div>

                
            </div>
        )
    }

    _get_score(params){
        // console.log(Object.keys(params).map(p=>this.state.params[p].value))
        axios.get(
            // 'http://127.0.0.1:8000/API/score_observation', 
            'https://my-interactive-cv.herokuapp.com/API/score_observation', 
            { params: Object.keys(params).map(p=>this.state.params[p].value) }
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