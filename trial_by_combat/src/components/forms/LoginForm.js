import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props) // have to call this or this.props will be undefined in the constructor
                 //  can lead to bugs https://reactjs.org/docs/react-component.html#constructor
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);  // binds the method to the class
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
      this.setState({value: event.target.value}); // I think this sets the value we grab on submit
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
                username:event.target.username.value,
                password:event.target.password.value 
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/auth/login`, settings);
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
        if ( this.props.visibleComponent==="LoginForm") {
            return (
                <div class="col d-flex justify-content-center">
                    <p>{this.state.postId}</p>
                    <form class="login_form" method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>
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
                        <input type="submit"  value="Login" />
                    </form>
                </div>
                
            );
            
        }
        
        else {
            return (
                <div></div>
            );
        }
    }

}

export default LoginForm;