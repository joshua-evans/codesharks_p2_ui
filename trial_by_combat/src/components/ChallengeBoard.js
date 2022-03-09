import React from "react";

import Challenge from "./listings/Challenge";

class ChallengeBoard extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: ""};
  }
 
    render() {
        if (this.props.visibleComponent === 'ChallengeBoard') {
            let challenges = [];

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
                        challenges.push( <Challenge avatar = {challenge.avatar.avatarname} challenger = {challenge.challenger.avatarname} key = {i} /> );
                        i++;
                    })
                } catch (e) {
                    console.log(e);
                }  
            })();

            console.log(challenges);

            return (

                <div class="col d-flex justify-content-center">
                    {challenges}
                    <table>
                        <th><td>Champion</td><td>versus</td><td>Challenger</td></th>
                        {challenges}
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