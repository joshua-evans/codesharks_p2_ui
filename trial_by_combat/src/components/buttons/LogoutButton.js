import React from "react";

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><a class="nav-link px-2 text-white" onClick={this.props.logoutCallback}>Logout {this.props.username}</a></li>);
    }
}

export default LogoutButton