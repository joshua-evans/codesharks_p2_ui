//import logo from './logo.svg';
//import './weapon_form.css';
import React from "react";

class HealingPotionForm extends React.Component {
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
                healingDie:event.target.healingDie.value,
                healingBonus:event.target.healingBonus.value
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/healing_potion`, settings);
            const data = await fetchResponse.json();
            let d = data.description,
                die = data.healingDie,
                b = data.healingBonus,
                p = data.price;
            alert(`Successfully created a healing potion called ${data.itemname}, described as ${d} with healing die= ${d} healing bonus= ${b} and a price of ${p} gold`);
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
                                placeholder='Enter Healing Potion Name'
                                type= 'itemname'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'description'
                                placeholder='Enter Description for Healing Potion'
                                type= 'text'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">
                        <input
                            name= 'healingDie'
                            placeholder='Healing Die'
                            type= 'number'
                            onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'healingBonus'
                                placeholder='Healing Bonus'
                                type= 'number'
                                onChange = {this.handleInputchange} />
                        </div>
                        <input type="submit"  value="HealingPotion" />
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

export default HealingPotionForm;