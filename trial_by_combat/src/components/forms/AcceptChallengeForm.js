import React from "react";

class AcceptChallengeForm extends React.Component {
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
      let challenge_id = this.props.id;
      let avatar = this.props.avatar;
    (async () => {
        const settings = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`
            },
            body: JSON.stringify({ 
                id: challenge_id ,
                challenger:{id:event.target.avatar_id.value},
                avatar
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/challenge`, settings);
            const data = await fetchResponse.json();
            //this.props.parentCallback(data.challenger);
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
                <form class="login_form" method="PUT" action="javascript:void(0);" onSubmit={this.handleSubmit}>              
                        <select
                            name = 'avatar_id'
                            onChange = {this.handleInputchange}>
                                {this.props.avatars}
                        </select>
                    <input type="submit"  value="Accept Challenge" />
                </form>
            </div>
            
        );
    }

}

export default AcceptChallengeForm;