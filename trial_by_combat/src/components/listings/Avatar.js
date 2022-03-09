import React from "react";

class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.avatarName}</td>
                <td>{this.props.strength}</td>
                <td>{this.props.dexterity}</td>
                <td>{this.props.constitution}</td>
                <td>{this.props.intelligence}</td>
                <td>{this.props.wisdom}</td>
                <td>{this.props.charisma}</td>
                <td>{this.props.gold}</td>
                <td>{this.props.currentHealth}</td>
                <td>{this.props.maximumHealth}</td>
            </tr>
        )
    }
}

export default Avatar