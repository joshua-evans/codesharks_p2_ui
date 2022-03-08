//import logo from './logo.svg';
//import './weapon_form.css';
import React from "react";

class WeaponForm extends React.Component {
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
                itemname:event.target.itemname.value,
                description:event.target.description.value,
                damageDie:event.target.damageDie.value,
                damageBonus:event.target.damageBonus.value
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/weapon`, settings);
            const data = await fetchResponse.json();
            let d = data.description,
                die = data.damageDie,
                b = data.damageBonus,
                p = data.price;
            alert(`Successfully created a weapon called ${data.itemname}, described as ${d} with damage die= ${d} damage bonus= ${b} and a price of ${p} gold`);
            event.preventDefault();
            //return data;
        } catch (e) {
            console.log(e);
            //return e;
        }  
    })();  
  }
 
    render() {
        if (true) {
            return (
                <div class="col d-flex justify-content-center">
                    <p>{this.state.postId}</p>
                    <form class="weapon_form" method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>
                        <div class="form-group">                    
                            <input
                                name= 'itemname'
                                placeholder='Enter Weapon Name'
                                type= 'itemname'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'description'
                                placeholder='Enter Description for Weapon'
                                type= 'text'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">
                        <input
                            name= 'damageDie'
                            placeholder='Damage Die'
                            type= 'number'
                            onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'damageBonus'
                                placeholder='Damage Bonus'
                                type= 'number'
                                onChange = {this.handleInputchange} />
                        </div>
                        <input type="submit"  value="Weapon" />
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

export default WeaponForm;