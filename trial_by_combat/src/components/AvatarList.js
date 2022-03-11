import React from "react";

import Avatar from "./listings/Avatar";

class AvatarList extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
            avatars: ["No avatars to display"]
        };         
    }

  render() {
        if (this.props.visComponent === 'AvatarList') {
            return (
                <div class="col d-flex justify-content-center">
                    <table class="table">
                        <thead><tr><th>Your Avatars</th></tr>
                        <tr>
                            <th>Name</th>
                            <th>Str</th>
                            <th>Dex</th>
                            <th>Con</th>
                            <th>Int</th>
                            <th>Wis</th>
                            <th>Cha</th>
                            <th>Gold</th>
                            <th>Health</th>
                            <th>Max Health</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {this.props.avatars}
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

export default AvatarList;