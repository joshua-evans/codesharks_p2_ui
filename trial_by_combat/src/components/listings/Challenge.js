import React from "react";

class Challenge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                {console.log('ok')}
                <td>{this.props.avatar}</td>
                <td></td>
                <td>{this.props.challenger}</td>
            </tr>
        )
    }
}

export default Challenge