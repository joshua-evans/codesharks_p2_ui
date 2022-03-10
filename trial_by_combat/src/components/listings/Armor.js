import React from "react";

class Armor extends React.Component {
    constructor(props) {
        super(props);
    }

    purchaseArmor = () => {

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
}

    render() {
        return (
            <tr>
                <td>{this.props.armorName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.armorClass}</td>
                <td>{this.props.damageReduction}</td>
                <td>{this.props.price}</td>
                <td><a class="nav-link px-2" onClick = {this.purchaseArmor}>Purchase</a></td>
            </tr>
        )
    }
}

export default Armor