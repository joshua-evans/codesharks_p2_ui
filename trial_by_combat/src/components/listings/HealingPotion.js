import React from "react";

class HealingPotion extends React.Component {
    constructor(props) {
        super(props);
    }

    purchasePotion = () => {

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
}

    render() {
        return (
            <tr>
                <td>{this.props.potionName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.healingDie}</td>
                <td>{this.props.healingBonus}</td>
                <td>{this.props.price}</td>
                <td><a class="nav-link px-2" onClick = {this.purchasePotion}>Purchase</a></td>
            </tr>
        )
    }
}

export default HealingPotion