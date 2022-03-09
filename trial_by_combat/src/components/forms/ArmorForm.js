import React from "react";

class ArmorForm extends React.Component {
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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`

            },
            body: JSON.stringify({ 
                itemname:event.target.itemname.value,
                description:event.target.description.value,
                armorClass:event.target.armorClass.value,
                damageReduction:event.target.damageReduction.value
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/armor`, settings);
            const data = await fetchResponse.json();
            let d = data.description,
                c = data.armorClass,
                r = data.damageReduction,
                p = data.price;
            alert(`Successfully created an armor called ${data.itemname}, described as ${d} with armor class= ${c} damage reduction= ${r} and a price of ${p} gold`);
            event.preventDefault();
            //return data;
        } catch (e) {
            console.log(e);
            //return e;
        }  
    })();  
  }
 
    render() {
        if (this.props.visibleComponent === 'ArmorForm') {
            return (
                <div class="col d-flex justify-content-center">
                    <p>{this.state.postId}</p>
                    <form class="armor_form" method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>
                        <div class="form-group">                    
                            <input
                                name= 'itemname'
                                placeholder='Enter Armor Name'
                                type= 'itemname'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'description'
                                placeholder='Enter Description for Armor'
                                type= 'text'
                                onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">
                        <input
                            name= 'armorClass'
                            placeholder='Armor Class'
                            type= 'number'
                            onChange = {this.handleInputchange} />
                        </div>
                        <div class="form-group">                    
                            <input
                                name= 'damageReduction'
                                placeholder='Damage Reduction'
                                type= 'number'
                                onChange = {this.handleInputchange} />
                        </div>
                        <input type="submit"  value="Armor" />
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

export default ArmorForm;