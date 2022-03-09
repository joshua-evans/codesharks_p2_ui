import React from "react";
import ChallengeAvatar from "../listings/ChallengeAvatar";

class LoginForm extends React.Component {
  constructor(props) {
    super(props) // have to call this or this.props will be undefined in the constructor
                 //  can lead to bugs https://reactjs.org/docs/react-component.html#constructor
    this.state = {value: "",
        myAvatars: []
    };
    this.handleChange = this.handleChange.bind(this);  // binds the method to the class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMyAvatars = this.fetchMyAvatars.bind(this);
    this.fetchMyAvatars();
  }
  handleChange(event) {
      this.setState({value: event.target.value}); // I think this sets the value we grab on submit
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
        console.log(settings);
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/challenge`, settings);
            const data = await fetchResponse.json();
            this.props.parentCallback(data);
            event.preventDefault();
            //return data;
        } catch (e) {
            console.log(e);
            //return e;
        }  
    })();  
  }
 
    render() {
        return (
            <div class="col d-flex justify-content-center">
                <p>{this.state.postId}</p>
                <form class="login_form" method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>
                    <div class="form-group">                    
                        <select
                            name = 'avatar_id'
                            onClick = {this.fetchMyAvatars}
                            onChange = {this.handleInputchange}>
                                {this.state.myAvatars}
                        </select>
                    </div>
                    <input type="submit"  value="Create Challenge" />
                </form>
            </div>
            
        );
    }

}

export default LoginForm;