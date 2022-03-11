import React from "react";

class Armor extends React.Component {
    constructor(props) {
        super(props);
    }

    purchaseArmor = () => {

    if(this.props.avatar.props.gold >= this.props.price){
            let avatar_id = this.props.avatar.props.id;
            let item_id = this.props.id;
            (async () => {
                const settings = {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${this.props.authToken}`
              },
              body: JSON.stringify({ 
                  avatar: {id: avatar_id} ,
                  item: {id: item_id}
              })
            }
              try {
                const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/avatar_item`, settings);
                const data = await fetchResponse.json();
            } catch (e) {
                console.log(e);
            }  
            })();  
        switch(this.props.armorName.charAt(0)){
            case 'A':
            case 'a':
            case 'E':
            case 'e':
            case 'I':
            case 'i':
            case 'O':
            case 'o':
            case 'U':
            case 'u':
                alert(`Successfully purchased an ${this.props.armorName} for ${this.props.price} gold`);
                break;
            default:
                alert(`Successfully purchased a ${this.props.armorName} for ${this.props.price} gold`);
        }
    } else{
        alert(`You do not have enough gold to purchase this Armor`);
   }
}

    render() {
        return (
            <tr>
                <td>{this.props.armorName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.armorClass}</td>
                <td>{this.props.damageReduction}</td>
                <td>{this.props.price}</td>
                {(this.props.displayOnly) ?
                   <></> : <td><a class="nav-link px-2" onClick = {this.purchaseArmor}>Purchase</a></td>}
            </tr>
        )
    }
}

export default Armor