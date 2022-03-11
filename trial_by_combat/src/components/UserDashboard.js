import React from 'react';
import AvatarList from './AvatarList';
import AvatarDashboard from './AvatarDashboard';
import WeaponMarketplace from './WeaponMarketplace';
import HealingPotionList from './HealingPotionList';
import ArmorList from './ArmorList';
import ItemsList from './ItemsList'
import RandomItemsList from './RandomItemsList';
import Avatar from './listings/Avatar';


class UserDashboard extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {value: "",
                  visComponent:"AvatarList",
                  selectedAvatar:"",
                  avatars: []
                };
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPlayerAvatars = this.fetchPlayerAvatars.bind(this);
    this.updateUserDashboard = this.updateUserDashboard.bind(this);
    this.clickSelectAvatar = this.clickSelectAvatar.bind(this);
    this.returnToAvatarList = this.returnToAvatarList.bind(this);
    this.fetchPlayerAvatars();
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
            let avatarArray = this.state.avatars;
            avatarArray.push( <Avatar 
                parentCallback = {this.props.parentCallback} 
                id = {data.id} 
                avatarName = {data.avatarname} 
                strength = {data.strength} 
                dexterity = {data.dexterity} 
                constitution = {data.constitution} 
                intelligence = {data.intelligence} 
                wisdom = {data.wisdom} 
                charisma = {data.charisma} 
                gold = {data.gold} 
                currentHealth = {data.currentHealth} 
                maximumHealth = {data.maximumHealth} 
                key = {data.id} /> );
      
            this.setState({avatars:avatarArray});

            event.preventDefault();
            //return data;
        } catch (e) {
            console.log(e);
            //return e;
        }  
    })();  
    this.forceUpdate();
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

    clickSelectAvatar(childData) {
        this.setState({visComponent:"AvatarDashboard",
                    selectedAvatar:childData});
        console.log(childData);
        console.log(this.state.selectedAvatar);
    }

    returnToAvatarList() {
        this.setState({visComponent:"AvatarList"});
        this.setState({selectedAvatar:""});
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

    clickSeeItems = () => {
        this.setState({visComponent:"ItemsList"})
    }

    fetchPlayerAvatars = async () => {
        let avatarArray = [];
    
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`
            }
        };
        try {
            const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/avatar/player`, settings);
            const data = await fetchResponse.json();
            let i = 0;
            data.forEach((avatar) => {
                avatarArray.push( <Avatar parentCallback = {this.clickSelectAvatar} id = {avatar.id} avatarName = {avatar.avatarname} strength = {avatar.strength} dexterity = {avatar.dexterity} 
                    constitution = {avatar.constitution} intelligence = {avatar.intelligence} wisdom = {avatar.wisdom} charisma = {avatar.charisma} 
                    gold = {avatar.gold} currentHealth = {avatar.currentHealth} maximumHealth = {avatar.maximumHealth} key = {i} /> );
                i++;
              
            })
            this.setState({avatars:avatarArray}); 
        } catch (e) {
            console.log(e);
        }      
      }

    updateUserDashboard() {
        this.fetchPlayerAvatars();
        this.forceUpdate();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.visibleComponent != this.props.visibleComponent
            || nextProps.authToken != this.props.authToken
            ) {
            return true;
        }
        return false;
    }
    render() {

        this.fetchPlayerAvatars();

        if (this.props.visibleComponent === 'UserDashboard') {
            return (
                <div class="container" onClick={this.updateUserDashboard}>
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
                        <AvatarList avatars = {this.state.avatars} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                        <AvatarDashboard  parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} 
                        parentCallback2 = {this.clickWeaponMarketplace}
                        parentCallback3 = {this.clickHealingPotionMarketplace}
                        parentCallback4 = {this.clickArmorMarketplace}
                        parentCallback5 = {this.clickSeeItems}/>
                        <WeaponMarketplace parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                        <HealingPotionList parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                        <ArmorList parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
                        <ItemsList parentCallback = {this.returnToAvatarList} selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent}/>
                        <RandomItemsList selectedAvatar = {this.state.selectedAvatar} authToken = {this.props.authToken} server = {this.props.server} visComponent = {this.state.visComponent} />
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
