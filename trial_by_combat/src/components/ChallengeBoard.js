import React from "react";

import Challenge from "./listings/Challenge";
import CreateChallengeForm from "./forms/CreateChallengeForm";

class ChallengeBoard extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: "",
        challenges: []
    };
    this.fetchChallenges = this.fetchChallenges.bind(this);
    this.updateChallengeList = this.updateChallengeList.bind(this);
    this.createChallenge = this.createChallenge.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchChallenges();
  }
  handleChange(event) {
    this.setState({value: event.target.value}); 
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
                challengeArray.push( <Challenge 
                    avatar = {(challenge.avatar) ? challenge.avatar : '' } 
                    challenger = {(challenge.challenger) ? challenge.challenger : 
                        (challenge.avatar.player.id===this.props.player.id) ? {avatarname:'Waiting'} : {avatarname:'Accept Challenge'} }
                    key = {i} /> );
                i++;
            })
            this.setState({challenges:challengeArray});
            
        } catch (e) {
            console.log(e);
        }  
    })();
  }

  updateChallengeList() {
      this.fetchChallenges();
      this.forceUpdate();
  }

  createChallenge(data) {
      this.state.challenges.push(data);
      this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.visibleComponent != this.props.visibleComponent
        || nextProps.authToken != this.props.authToken
        ) {
          return true;
      }
      return false;
  }
 
  render() {
    let createForm = <></>;
    
    if (this.props.authToken) {
        createForm = <CreateChallengeForm 
            parentCallback = {this.createChallenge} 
            server = {this.props.server} 
            authToken = {this.props.authToken} 
            player = {this.props.player} 
        />;
    }
    
    this.fetchChallenges();

    if (this.props.visibleComponent === 'ChallengeBoard') {
        return (
            <div class="col d-flex justify-content-center">
                <table class="table">
                <thead onClick={this.updateChallengeList}><tr><th>Challenge Board</th></tr>
                        <tr>
                            <th>Champion</th>
                            <th>versus</th>
                            <th>Challenger</th>
                        </tr>
                        </thead>
                    <tbody>
                        <tr>{createForm}</tr>
                    {this.state.challenges}
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

export default ChallengeBoard;