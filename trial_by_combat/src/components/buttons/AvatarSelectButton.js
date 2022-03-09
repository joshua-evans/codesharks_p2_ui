import React from "react";

class SelectAvatarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><a class="nav-link px-2 text-white" onClick={this.props.dashboardCallback}>Select</a></li>);
    }
}

export default SelectAvatarButton