import React from "react";

class Avatar extends React.Component {
    constructor(props) {
        super(props);

        this.selectAvatar = this.selectAvatar.bind(this);
    }

    selectAvatar = () => {
        this.props.parentCallback(this);
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
                <td><a class="nav-link px-2" onClick = {this.selectAvatar}>Select</a></td>
            </tr>
        )
    }
}

export default Avatar