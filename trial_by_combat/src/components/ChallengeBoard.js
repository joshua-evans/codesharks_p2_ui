import React from "react";

import Challenge from "./listings/Challenge";
import CreateChallengeForm from "./forms/CreateChallengeForm";
import ChallengeAvatar from "./listings/ChallengeAvatar";

class ChallengeBoard extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: "",
        challenges: [],
        myAvatars: []
    };
    this.fetchChallenges = this.fetchChallenges.bind(this);
    this.updateChallengeList = this.updateChallengeList.bind(this);
    this.updateAvatars = this.updateAvatars.bind(this);
    this.createChallenge = this.createChallenge.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchChallenges();
    this.fetchMyAvatars = this.fetchMyAvatars.bind(this);
    this.fetchMyAvatars();
  }
  handleChange(event) {
    this.setState({value: event.target.value}); 
}

fetchMyAvatars() {
    let avatarArray = [];

    if (!this.props.authToken)
        return;

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
            let url = `${this.props.server}/trial-by-combat/avatar/player/?id=${this.props.player.id}`;
            console.log(url);
            const fetchResponse = await fetch(url, settings);
            const data = await fetchResponse.json();
            let i = 0;
            data.forEach((avatar) => {
                avatarArray.push( <ChallengeAvatar 
                    avatar = {avatar}
                    key = {i} /> );
                i++;
            })
            this.setState({myAvatars:avatarArray});
            
        } catch (e) {
            console.log(e);
        }  
    })();
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
            data.forEach((challenge) => {
                console.log(challenge);
                challengeArray.push( <Challenge 
                    avatar = {(challenge.avatar) ? challenge.avatar : '' } 
                    challenger = {(challenge.challenger) ? challenge.challenger : 
                        (challenge.avatar.player.id===this.props.player.id) ? {avatarname:'Waiting'} : {avatarname:'Open Challenge'} }
                    key = {challenge.id} 
                    isOpen = {(challenge.challenger) ? false : true}
                    id = {challenge.id} 
                    server = {this.props.server} 
                    authToken = {this.props.authToken}  
                    player_id = {this.props.player.id}
                    avatars = {this.state.myAvatars}
                /> );
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

  updateAvatars() {
    this.fetchMyAvatars();
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
            avatars = {this.state.myAvatars}
        />;
    }
    
    this.fetchChallenges();
    this.fetchMyAvatars();

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
                        <tr onClick = {this.updateAvatars}>{createForm}</tr>
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