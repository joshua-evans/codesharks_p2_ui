import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './login_form.css';

import Header from './Header';
import Footer from './Footer';

import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import UserDashboard from './components/UserDashboard';
import ChallengeBoard from './components/ChallengeBoard';
import WeaponForm from './components/forms/WeaponForm';
import ArmorForm from './components/forms/ArmorForm';
import HealingPotionForm from './components/forms/HealingPotionForm';
import LoadoutForm from './components/forms/LoadoutForm';


class TokenLayer extends React.Component {
    
    state = {
        player:{username:""},
        userid:"",
        token:"",
        visibleComponent:"LoginForm",
        server:"http://localhost:3000"    
    }

    handleLogin = (childData) => {
        this.setState({token: childData.token});
        this.getUsername();
        this.setState({visibleComponent:"UserDashboard"});
    }

    handleRegistration = (childData) => {
        this.setState({visibleComponent:"LoginForm"});
        alert(`Successfully registered ${childData.email} as ${childData.username}`);
    }

    clickRegister = () => {
        this.setState({visibleComponent:"RegistrationForm"});
    }

    clickLogin = () => {
        this.setState({visibleComponent:"LoginForm"});
    }

    clickLogout = () => {
        this.setState({visibleComponent:"LoginForm"});
        this.setState({token:""});
        this.setState({player:{username:""}});
    }

    clickDashboard = () => {
        this.setState({visibleComponent:"UserDashboard"});
    }

    clickChallengeBoard = () => {
        this.setState({visibleComponent:"ChallengeBoard"});
    }

    dashboardRedirect = (childData) => {
        this.setState({visibleComponent:childData});
    }

    getUsername() {
        (async () => {
            const settings = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.state.token}`
                }
            };
            try {
                const fetchResponse = await fetch(`${this.state.server}/trial-by-combat/player/me`, settings);
                const data = await fetchResponse.json();
                this.setState({player:data});
            } catch (e) {
                console.log(e);
                //return e;
            }  
        })();  
    }
    
    render() {
        const {name} = this.state;
        return (
            <>
                <Header username = {this.state.player.username} 
                    loginCallback = {this.clickLogin} 
                    registerCallback = {this.clickRegister}    
                    logoutCallback = {this.clickLogout}
                    dashboardCallback = {this.clickDashboard}
                    challengeCallback = {this.clickChallengeBoard}
                /> 
                <ChallengeBoard player= {this.state.player} authToken = {this.state.token} server = {this.state.server} visibleComponent = {this.state.visibleComponent}/>
                <LoginForm server = {this.state.server} parentCallback = {this.handleLogin} visibleComponent = {this.state.visibleComponent} />  
                <RegistrationForm server = {this.state.server} parentCallback = {this.handleRegistration} visibleComponent = {this.state.visibleComponent} />
                <UserDashboard authToken = {this.state.token} server = {this.state.server} parentCallback = {this.dashboardRedirect} visibleComponent = {this.state.visibleComponent} />
                <WeaponForm authToken = {this.state.token} server = {this.state.server} visibleComponent = {this.state.visibleComponent} />
                <HealingPotionForm authToken = {this.state.token} server = {this.state.server} visibleComponent = {this.state.visibleComponent} />
                <LoadoutForm authToken = {this.state.token} server = {this.state.server} visibleComponent = {this.state.visibleComponent} />
                <ArmorForm authToken = {this.state.token} server = {this.state.server} visibleComponent = {this.state.visibleComponent} />
                <Footer />
            </>
        );
    }


}

export default TokenLayer;
