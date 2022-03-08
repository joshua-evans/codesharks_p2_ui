import React from "react";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: ""};
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email:event.target.email.value,
                username:event.target.username.value,
                password:event.target.password.value
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/player/register`, settings);
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
        if (this.props.visibleComponent === 'RegistrationForm') {
            return (
                <div class="col d-flex justify-content-center">
                    <p>{this.state.postId}</p>
                    <form class="login_form" method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>
                        <div class="form-group">                    
                            <input
                                name= 'email'
                                placeholder='Enter Email'
                                type= 'email'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'username'
                                placeholder='Enter Username'
                                type= 'text'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">
                        <input
                            name= 'password'
                            placeholder='Password'
                            type= 'password'
                            onChange = {this.handleInputchange} />
                        </div>
                        <input type="submit"  value="Register" />
                    </form>
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

export default RegistrationForm;