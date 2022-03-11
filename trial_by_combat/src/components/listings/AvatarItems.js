import React from "react";

class AvatarItems extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <><tr>
                <td>{this.props.armorName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.armorClass}</td>
                <td>{this.props.damageReduction}</td>
                <td>{this.props.price}</td>
            </tr><tr>
                    <td>{this.props.weaponName}</td>
                    <td>{this.props.description}</td>
                    <td>{this.props.damageDie}</td>
                    <td>{this.props.damageBonus}</td>
                    <td>{this.props.price}</td>
                </tr><tr>
                    <td>{this.props.potionName}</td>
                    <td>{this.props.description}</td>
                    <td>{this.props.healingDie}</td>
                    <td>{this.props.healingBonus}</td>
                    <td>{this.props.price}</td>
                </tr></>
        )
    }
}

export default AvatarItems