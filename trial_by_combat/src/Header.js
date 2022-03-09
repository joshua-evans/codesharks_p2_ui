import React from "react";
import './header.css';
import LogoutButton from './components/buttons/LogoutButton';
import LoginButton from './components/buttons/LoginButton';
import RegisterButton from './components/buttons/RegisterButton';
import DashboardButton from './components/buttons/DashboardButton';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let auth;

        if (this.props.username.length > 0) {
            auth = [<DashboardButton dashboardCallback = {this.props.dashboardCallback}/>, <LogoutButton logoutCallback = {this.props.logoutCallback} username={this.props.username}/>];
        }
        else {
            auth = [<LoginButton loginCallback = {this.props.loginCallback}/>, <RegisterButton registerCallback = {this.props.registerCallback}/>];
        }

        return (
            <header id="custom_header" class="p-1 bg-dark text-white">
                <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <h1>Trial By Combat</h1>
                    </a>
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a class="nav-link px-2 text-white" onClick={this.props.challengeCallback}>Challenge Board</a></li>
                    <li><a class="nav-link px-2 text-white">About</a></li>
                    {auth}
                    </ul>
                </div>
                </div>
            </header>
        ); 
    }
}

export default Header;
