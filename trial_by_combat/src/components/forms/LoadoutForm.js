//import logo from './logo.svg';
//import './weapon_form.css';
import React from "react";

class LoadoutForm extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
      this.setState({value: event.target.value}); 
  }
  handleSubmit(event) {
    (async () => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`

            },
            body: JSON.stringify({ 
                name:event.target.name.value,
                description:event.target.description.value
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/loadout`, settings);
            const data = await fetchResponse.json();
            let d = data.description,
                n = data.name;
            alert(`Successfully created a loadout called ${n}, described as ${d} which includes: `);
            event.preventDefault();
            //return data;
        } catch (e) {
            console.log(e);
            //return e;
        }  
    })();  
  }
 
    render() {
        if (this.props.visibleComponent === 'LoadoutForm') {
            return (
                <div class="col d-flex justify-content-center">
                    <p>{this.state.postId}</p>
                    <form class="loadout_form" method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>
                        <div class="form-group">                    
                            <input
                                name= 'name'
                                placeholder='Enter Loadout Name'
                                type= 'name'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'description'
                                placeholder='Enter Description'
                                type= 'text'
                                onChange = {this.handleInputchange} />
                        </div>
                        <input type="submit"  value="Loadout" />
                    </form>
                </div>
                
            );
        }

        else {
            return (
                <div hidden></div>
            );
        }
    }

}

export default LoadoutForm;