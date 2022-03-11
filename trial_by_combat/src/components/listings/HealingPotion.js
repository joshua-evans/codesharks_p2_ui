import React from "react";

class HealingPotion extends React.Component {
    constructor(props) {
        super(props);
    }

    purchasePotion = () => {

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
            
        switch(this.props.potionName.charAt(0)){
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
                alert(`Successfully purchased an ${this.props.potionName} for ${this.props.price} gold`);
                break;
            default:
                alert(`Successfully purchased a ${this.props.potionName} for ${this.props.price} gold`);
        }
    } else{
        alert(`You do not have enough gold to purchase this Healing Potion`);
   }
}

    render() {
        return (
            <tr>
                <td>{this.props.potionName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.healingDie}</td>
                <td>{this.props.healingBonus}</td>
                <td>{this.props.price}</td>
                {(this.props.displayOnly) ?
                   <></> : <td><a class="nav-link px-2" onClick = {this.purchasePotion}>Purchase</a></td>}
            </tr>
        )
    }
}

export default HealingPotion