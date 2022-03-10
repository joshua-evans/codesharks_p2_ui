import React from "react";

class Weapon extends React.Component {
    constructor(props) {
        super(props);
    

        this.purchaseWeapon = this.purchaseWeapon.bind(this);
    }

    purchaseWeapon = () => {

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