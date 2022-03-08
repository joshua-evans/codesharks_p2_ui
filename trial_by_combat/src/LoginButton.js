import React from "react";
import './header.css';

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><a class="nav-link px-2 text-white" onClick={this.props.loginCallback}>Login</a></li>);
    }
}

export default LoginButton