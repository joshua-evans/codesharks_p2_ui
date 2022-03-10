import React from "react";

import AcceptChallengeForm from "../forms/AcceptChallengeForm";

class Challenge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let acceptForm = <></>;
        if (this.props.isOpen === true && this.props.player_id != this.props.avatar.player.id) {
            acceptForm = <AcceptChallengeForm 
                    server = {this.props.server} 
                    authToken = {this.props.authToken} 
                    id = {this.props.id}
                    avatar = {this.props.avatar}
                    avatars = {this.props.avatars}
                /> 
        }
        return (
            <tr>
                <td>{this.props.avatar.avatarname}</td>
                <td>{acceptForm}</td>
                <td>{this.props.challenger.avatarname}</td>
            </tr>
        )
    }
}

export default Challenge