import React from "react";
import './header.css';

class WeaponButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><a class="nav-link px-2 text-white" onClick={this.props.weaponCallback}>Weapon</a></li>);
    }
}

export default WeaponButton