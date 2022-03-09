import React from "react";
import ChallengeAvatar from "../listings/ChallengeAvatar";
import Challenge from "../listings/Challenge";

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: "",
        myAvatars: []
    };
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMyAvatars = this.fetchMyAvatars.bind(this);
    this.fetchMyAvatars();
  }
  handleChange(event) {
      this.setState({value: event.target.value}); 
  }

  fetchMyAvatars() {
    let avatarArray = [];

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

  handleSubmit(event) {
    (async () => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`
            },
            body: JSON.stringify({ 
                avatar:{id:event.target.avatar_id.value}
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/challenge`, settings);
            const data = await fetchResponse.json();
            this.props.parentCallback(<Challenge 
                avatar = {(data.avatar) ? data.avatar : '' } 
                challenger = {(data.challenger) ? data.challenger : 
                    (data.avatar.player.id===this.props.player.id) ? {avatarname:'Waiting'} : {avatarname:'Accept Challenge'} }
                />);
            event.preventDefault();
        } catch (e) {
            console.log(e);
        }  
    })();  
  }
 
    render() {
        return (
            <div class="col d-flex justify-content-center">
                <p>{this.state.postId}</p>
                <form class="login_form" method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>              
                        <select
                            name = 'avatar_id'
                            onClick = {this.fetchMyAvatars}
                            onChange = {this.handleInputchange}>
                                {this.state.myAvatars}
                        </select>
                    <input type="submit"  value="Create Challenge" />
                </form>
            </div>
            
        );
    }

}

export default LoginForm;