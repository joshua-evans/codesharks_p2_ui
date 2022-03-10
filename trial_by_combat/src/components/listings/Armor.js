import React from "react";

class Armor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.armorName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.armorClass}</td>
                <td>{this.props.damageReduction}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
}

export default Armor