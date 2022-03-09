import React from "react";

import Challenge from "./listings/Challenge";

class ChallengeBoard extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: "",
        challenges: []
    };
    this.fetchChallenges();
  }

  fetchChallenges() {
    let challengeArray = [];

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
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/challenge/all`, settings);
            const data = await fetchResponse.json();
            let i = 0;
            data.forEach((challenge) => {
                challengeArray.push( <Challenge avatar = {challenge.avatar.avatarname} key = {i} /> ); // took out this.fetchChallenges();
                i++;
            })
            this.state.challenges = challengeArray;
            
            
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
                        <thead><tr><th>Champion</th><th>Versus</th><th>Challenger</th></tr></thead>
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