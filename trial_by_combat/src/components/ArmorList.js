import React from "react";

import Armor from "./listings/Armor";

class ArmorList extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
            armor: ["No Armor to display"]
        };
        this.fetchArmor = this.fetchArmor.bind(this);          
        this.fetchArmor();
    }

    
  fetchArmor = async () => {
    let armorArray = [];

    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.authToken}`
        }
    };
    try {
        const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/armor/all`, settings);
        const data = await fetchResponse.json();
        let i = 0;
        data.forEach((armor) => {
            armorArray.push( <Armor armorName = {armor.itemname} description = {armor.description} armorClass = {armor.armorClass} 
                damageReduction = {armor.damageReduction} price = {armor.price} key = {i} /> );
            i++;
          
        })
        
        this.setState({armor:armorArray});
        

    } catch (e) {
        console.log(e);
    }     
  }

  returnToAvatarList = () => {
    this.props.parentCallback('AvatarList');
}
 
  render() {
        if (this.props.visComponent === 'ArmorList') {
           
            return (
                <div class="col d-flex justify-content-center">
                    <table class='table'>
                        <thead><tr><th>Available Armor</th></tr>
                        <tr><th>Armor Name</th><th>Description</th><th>Armor Class</th><th>Damage Reduction</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {this.state.armor}
                        </tbody>
                    </table>
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

export default ArmorList;