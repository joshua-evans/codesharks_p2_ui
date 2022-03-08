import React from "react";
import './header.css';

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><a href="" class="nav-link px-2 text-white">Logout {this.props.username}</a></li>);
    }
}

export default LogoutButton