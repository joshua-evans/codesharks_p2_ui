import React from "react";
import UserDashboard from "../UserDashboard";

class Weapon extends React.Component {
    constructor(props) {
        super(props);
    
        this.purchaseWeapon = this.purchaseWeapon.bind(this);
    }

    purchaseWeapon = () => {
       if(this.props.avatar.props.gold >= this.props.price){
            switch(this.props.weaponName.charAt(0)){
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
                    alert(`Successfully purchased an ${this.props.weaponName} for ${this.props.price} gold`);
                    break;
                default:
                    alert(`Successfully purchased a ${this.props.weaponName} for ${this.props.price} gold`);
            }
       }else{
            alert(`You do not have enough gold to purchase this weapon`);
       }
    }

    render() {
        return (
            <tr>
                <td>{this.props.weaponName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.damageDie}</td>
                <td>{this.props.damageBonus}</td>
                <td>{this.props.price}</td>
                <td><a class="nav-link px-2" onClick = {this.purchaseWeapon}>Purchase</a></td>
            </tr>
        )
    }
}

export default Weapon