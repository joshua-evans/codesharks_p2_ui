import React from "react";

import Avatar from "./listings/Avatar";

class AvatarDashboard extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
        };
    } 
  render() {
        if (this.props.visComponent === 'AvatarDashboard') {
           
            return (
                <div class="col d-flex justify-content-center">
                    <p>TEST</p>
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

export default AvatarDashboard;

