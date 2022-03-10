import React from "react";

class HealingPotion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.potionName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.healingDie}</td>
                <td>{this.props.healingBonus}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
}

export default HealingPotion