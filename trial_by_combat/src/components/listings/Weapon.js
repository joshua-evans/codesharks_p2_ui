import React from "react";

class Weapon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.weaponName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.damageDie}</td>
                <td>{this.props.damageBonus}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
}

export default Weapon