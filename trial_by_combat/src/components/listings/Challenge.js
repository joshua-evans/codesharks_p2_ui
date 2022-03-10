import React from "react";

import AcceptChallengeForm from "../forms/AcceptChallengeForm";

class Challenge extends React.Component {
    constructor(props) {
        super(props);
        let c = this.props.challenger;
        this.state = {
            challenger: c,
            accepted: false
        };

    }

    parentCallback = (c) => {
        this.setState({challenger:c});
        this.setState({accepted:true});
    }

    render() {
        let acceptForm = <></>;
        if (!this.state.accepted && this.props.isOpen === true && this.props.player_id != this.props.avatar.player.id) {
            acceptForm = <AcceptChallengeForm 
                    server = {this.props.server} 
                    authToken = {this.props.authToken} 
                    id = {this.props.id}
                    avatar = {this.props.avatar}
                    avatars = {this.props.avatars}
                    key = {this.props.key}
                    player_id = {this.props.player_id}
                    parentCallback = {this.parentCallback}
                /> 
        }
        return (
            <tr>
                <td>{this.props.avatar.avatarname}</td>
                <td>{acceptForm}</td>
                <td>{this.state.challenger.avatarname}</td>
            </tr>
        )
    }
}

export default Challenge