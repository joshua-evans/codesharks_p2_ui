import React from "react";

import HealingPotion from "./listings/HealingPotion";

class HealingPotionList extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
        healingPotions: ["No potions to display"]
        };
        this.fetchHealingPotions = this.fetchHealingPotions.bind(this);          
        this.fetchHealingPotions();
    }

    
  fetchHealingPotions = async () => {
    let healingPotionArray = [];

    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.authToken}`
        }
    };
    try {
        const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/healing_potion/all`, settings);
        const data = await fetchResponse.json();
        let i = 0;
        data.forEach((potion) => {
            healingPotionArray.push( <HealingPotion potionName = {potion.itemname} description = {potion.description} healingDie = {potion.healingDie} 
                healingBonus = {potion.healingBonus} price = {potion.price} key = {i} /> );
            i++;
          
        })
        
        this.setState({healingPotions:healingPotionArray});
        

    } catch (e) {
        console.log(e);
    }     
  }
 
  render() {
        if (this.props.visibleComponent === 'UserDashboard') {
           
            return (
                <div class="col d-flex justify-content-center">
                    <table class='table'>
                        <thead><tr><th>Available Potions</th></tr>
                        <tr><th>Potion Name</th><th>Description</th><th>Healing Die</th><th>Healing Bonus</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {this.state.healingPotions}
                        </tbody>
                    </table>
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

export default HealingPotionList;