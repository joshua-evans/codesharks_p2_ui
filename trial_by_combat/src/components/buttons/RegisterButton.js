import React from "react";
import './header.css';

class RegisterButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><a class="nav-link px-2 text-white" onClick={this.props.registerCallback}>Register</a></li>);
    }
}

export default RegisterButton