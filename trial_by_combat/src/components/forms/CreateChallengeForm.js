import React from "react";
import Challenge from "../listings/Challenge";

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ""
    };
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  handleChange(event) {
      this.setState({value: event.target.value}); 
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
                    (data.avatar.player.id===this.props.player.id) ? {avatarname:'Waiting'} : {avatarname:'Open Challenge'} }
                isOpen = {false}
                id = {data.id}
                server = {this.props.server} 
                authToken = {this.props.authToken} 
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
                            onChange = {this.handleInputchange}>
                                {this.props.avatars}
                        </select>
                    <input type="submit"  value="Create Challenge" />
                </form>
            </div>
            
        );
    }

}

export default LoginForm;