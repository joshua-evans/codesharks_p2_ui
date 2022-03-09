import React from "react";

class Challenge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.avatar.avatarname}</td>
                <td></td>
                <td>{this.props.challenger.avatarname}</td>
            </tr>
        )
    }
}

export default Challenge