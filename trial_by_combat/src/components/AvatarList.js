import React from "react";

import Avatar from "./listings/Avatar";

class AvatarList extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
            avatars: ["No avatars to display"]
        };
        this.fetchPlayerAvatars = this.fetchPlayerAvatars.bind(this);          
        this.fetchPlayerAvatars();
    }

    
  fetchPlayerAvatars = async () => {
    let avatarArray = [];

    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.authToken}`
        }
    };
    try {
        const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/avatar/player`, settings);
        const data = await fetchResponse.json();
        let i = 0;
        data.forEach((avatar) => {
            avatarArray.push( <Avatar avatarName = {avatar.avatarname} strength = {avatar.strength} dexterity = {avatar.dexterity} 
                constitution = {avatar.constitution} intelligence = {avatar.intelligence} wisdom = {avatar.wisdom} charisma = {avatar.charisma} 
                gold = {avatar.gold} currentHealth = {avatar.currentHealth} maximumHealth = {avatar.maximumHealth} key = {i} /> );
            i++;
          
        })
        
        this.setState({avatars:avatarArray});
        

    } catch (e) {
        console.log(e);
    }     
  }
 
  render() {
        if (this.props.visibleComponent === 'UserDashboard') {
           
            return (
                <div class="col d-flex justify-content-center">
                    <table>
                        <thead><tr><th>Your Avatars</th></tr></thead>
                        <tbody>
                            {this.state.avatars}
                        </tbody>
                    </table>
                </div>
                
            );
        }
        else {
            return (
                <div hidden></div>
            );
        }
    }

}

export default AvatarList;