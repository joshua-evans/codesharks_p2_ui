import React from "react";

class DashboardButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><a class="nav-link px-2 text-white" onClick={this.props.dashboardCallback}>Dashboard</a></li>);
    }
}

export default DashboardButton