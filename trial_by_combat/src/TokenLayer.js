import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import LoginForm from './LoginForm';
import Header from './Header';

class TokenLayer extends React.Component {
    
    state = {name:""}

    handleCallback = (childData) => {
        this.setState({name: childData.token})
    }
    
    render() {
        const {name} = this.state;
        return (
            <>
                <Header /> 
                <LoginForm parentCallback = {this.handleCallback}/>
                {name}    
            </>
        );
    }


}



export default TokenLayer;