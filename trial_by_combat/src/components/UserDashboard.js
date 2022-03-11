import React from 'react';
import AvatarList from './AvatarList';
import AvatarDashboard from './AvatarDashboard';
import WeaponMarketplace from './WeaponMarketplace';
import HealingPotionList from './HealingPotionList';
import ArmorList from './ArmorList';


class UserDashboard extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: "",
                  visComponent:"AvatarList",
                  selectedAvatar:""
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
                avatarname:event.target.avatarname.value,
            })
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/avatar`, settings);
            const data = await fetchResponse.json();
            let s = data.strength,
                d = data.dexterity,
                c = data.constitution,
                h = data.maximumHealth;
            alert(`Successfully created ${data.avatarname} with STR ${s} DEX ${d} CON ${c} HP ${h}`);
            event.preventDefault();
            //return data;
        } catch (e) {
            console.log(e);
            //return e;
        }  
    })();  
  }

    clickCreateWeapon = () => {
        this.props.parentCallback('WeaponForm');
    }

    clickCreateHealingPotion = () => {
        this.props.parentCallback('HealingPotionForm');
    }

    clickCreateLoadout = () => {
        this.props.parentCallback('LoadoutForm');
    }

    clickCreateArmor = () => {
        this.props.parentCallback('ArmorForm');
    }

    clickSelectAvater = (childData) => {
        this.setState({visComponent:"AvatarDashboard"})
        this.setState({selectedAvatar:childData})
    }

    returnToAvatarList = (childData) => {
        this.setState({visComponent:"AvatarList"})
        this.setState({selectedAvatar:childData})
    }

    clickWeaponMarketplace = () => {
        this.setState({visComponent:"WeaponMarketplace"})
    }

    clickHealingPotionMarketplace = () => {
        this.setState({visComponent:"HealingPotionList"})
    }

    clickArmorMarketplace = () => {
        this.setState({visComponent:"ArmorList"})
    }

    render() {
        if (this.props.visibleComponent === 'UserDashboard') {
            return (
                <div class="container">
                <div class="col d-flex justify-content-center">
                    <div>
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a class="nav-link px-2" onClick={this.clickCreateWeapon}>Create Weapon</a></li>
                            <li><a class="nav-link px-2" onClick={this.clickCreateArmor}>Create Armor</a></li>
                            <li><a class="nav-link px-2" onClick={this.clickCreateHealingPotion}>Create Healing Potion</a></li>
                            <li><a class="nav-link px-2" onClick={this.clickCreateLoadout}>Create Loadout</a></li>
                        </ul>
                    </div>
                    <hr/>
                    <form method="POST" action="javascript:void(0);" onSubmit={this.handleSubmit}>
                        <div class="form-group">                    
                            <input
                                name= 'avatarname'
                                placeholder='Enter Avatar Name'
                                type= 'text'
                                onChange = {this.handleInputchange} />
                        </div>
                        <input type="submit"  value="Create Avatar" />
                    </form>

                </div>
                    <div>
                        <AvatarList parentCallback = {this.clickSelectAvater} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                        <AvatarDashboard  parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} 
                        parentCallback2 = {this.clickWeaponMarketplace}
                        parentCallback3 = {this.clickHealingPotionMarketplace}
                        parentCallback4 = {this.clickArmorMarketplace}/>
                        <WeaponMarketplace parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                        <HealingPotionList parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                        <ArmorList parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                    </div>

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

export default UserDashboard;