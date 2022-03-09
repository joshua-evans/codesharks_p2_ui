import React from "react";

import Weapon from "./listings/Weapon";

class WeaponBoard extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: "",
        weapons: []
    };
    this.fetchWeapons();
  }

  fetchWeapons() {
    let weaponArray = [];

    (async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`
            }
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/weapon/all`, settings);
            const data = await fetchResponse.json();
            let i = 0;
            data.forEach((weapon) => {
                weaponArray.push(<Weapon weapon = {weapon.avatar.avatarname} challenger = {challenge.challenger.avatarname} key = {i} /> );
                i++;
            })
            this.setState({challenges:challengeArray});
            
        } catch (e) {
            console.log(e);
        }  
    })();
  }
 
  render() {
       
        if (this.props.visibleComponent === 'ChallengeBoard') {
            return (
                <div class="col d-flex justify-content-center">
                    <table>
                        <tr><td>Champion</td><td>Versus</td><td>Challenger</td></tr>
                        {this.state.challenges}
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

export default ChallengeBoard;