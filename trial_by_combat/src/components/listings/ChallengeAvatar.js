import React from "react";

class ChallengeAvatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <option value={this.props.avatar.id}>
                {this.props.avatar.avatarname}
            </option>
        )
    }
}

export default ChallengeAvatar