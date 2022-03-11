import React from "react";

import AvatarItems from "./listings/AvatarItems";
import Weapon from "./listings/Weapon";
import Armor from "./listings/Armor";
import HealingPotion from "./listings/HealingPotion";

class ItemsList extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
            armor: ["No Armor to display"],
            weapon: ['No Weapons to display'],
            potion: ['No Potions to display']
        };
        this.fetchItems = this.fetchItems.bind(this);          
        this.fetchItems();
    }

    
  fetchItems = async () => {
    let armorArray = [];
    let weaponArray = [];
    let potionArray = [];

    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.authToken}`
        }
    };
    try {
        const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/avatar_item/avatar/?id=${this.props.selectedAvatar.id}`, settings);
        const data = await fetchResponse.json();
        let i = 0;
        data.forEach((item) => {
            if(item.armorClass){
                armorArray.push( <Armor itemName = {item.itemname} description = {item.description} armorClass = {item.armorClass} 
                    damageReduction = {item.damageReduction} price = {item.price} key = {i} /> );
                i++;
            } else if (item.damageDie){
                weaponArray.push( <Weapon weaponName = {item.itemname} description = {item.description} damageDie = {item.damageDie} 
                    damageBonus = {item.damageBonus} price = {item.price} key = {i} /> );
                i++;            
            } else{
                potionArray.push( <HealingPotion potionName = {item.itemname} description = {item.description} healingDie = {item.healingDie} 
                    healingBonus = {item.healingBonus} price = {item.price} key = {i} /> );
                i++;
            }
            
          
        })
        
        this.setState({armor:armorArray, weapon: weaponArray, potion:potionArray});
        

    } catch (e) {
        console.log(e);
    }     
  }

  returnToAvatarList = () => {
    this.props.parentCallback('AvatarList');
}
 
  render() {
        if (this.props.visComponent === 'ItemsList') {
           
            return (
        
                <div>
                 <div>
                    <table class='table'>
                        <thead><tr><th>Your Armor</th></tr>
                        <tr><th>Armor Name</th><th>Description</th><th>Armor Class</th><th>Damage Reduction</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {this.state.armor}
                        </tbody>
                    </table>
                </div>
                 <div>
                    <table class='table'>
                        <thead><tr><th>Available Weapons</th></tr>
                        <tr><th>Weapon Name</th><th>Description</th><th>Damage Die</th><th>Damage Bonus</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {this.state.weapon}
                        </tbody>
                    </table>
                    </div>
                    <div>
                    <table class='table'>
                        <thead><tr><th>Available Potions</th></tr>
                        <tr><th>Potion Name</th><th>Description</th><th>Healing Die</th><th>Healing Bonus</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {this.state.potion}
                        </tbody>
                    </table>
                    </div>
                    <a onClick = {this.returnToAvatarList}>Return to Avatar List</a>
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

export default ItemsList;