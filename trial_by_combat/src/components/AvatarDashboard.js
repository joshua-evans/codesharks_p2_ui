import React from "react";

import Avatar from "./listings/Avatar";

class AvatarDashboard extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
        };
    } 

    returnToAvatarList = () => {
        this.props.parentCallback('AvatarList');
    }

    clickWeaponMarketplace = () => {
        this.props.parentCallback2('WeaponMarketplace');
    }

    clickHealingPotionMarketplace = () => {
        this.props.parentCallback3('HealingPotionList');
    }

    clickArmorMarketplace = () => {
        this.props.parentCallback4('ArmorList');
    }

    clickSeeItems = () => {
        this.props.parentCallback5('ArmorList');
    }

  render() {
        if (this.props.visComponent === 'AvatarDashboard') {
           
            return (
                <div class="table-responsive justify-content-center">
                    <table class="table">


                    <thead>
                            <tr>
                                <th>Name</th><th>Str</th><th>Dex</th><th>Con</th><th>Int</th><th>Wis</th><th>Cha</th><th>Gold</th><th>Health</th><th>Max Health</th><th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.selectedAvatar.props.avatarName}</td>
                                <td>{this.props.selectedAvatar.props.strength}</td>
                                <td>{this.props.selectedAvatar.props.dexterity}</td>
                                <td>{this.props.selectedAvatar.props.constitution}</td>
                                <td>{this.props.selectedAvatar.props.intelligence}</td>
                                <td>{this.props.selectedAvatar.props.wisdom}</td>
                                <td>{this.props.selectedAvatar.props.charisma}</td>
                                <td>{this.props.selectedAvatar.props.gold}</td>
                                <td>{this.props.selectedAvatar.props.currentHealth}</td>
                                <td>{this.props.selectedAvatar.props.maximumHealth}</td>
                                <td><a id='AvatarListButton' class="nav-link px-2" onClick = {this.returnToAvatarList}>Return to AvatarList</a></td>
                                <li><a id='WeaponMarketplaceButton' class="nav-link px-2" onClick={this.clickWeaponMarketplace}>Weapon Marketplace</a></li>
                                <li><a id='HealingPotionMarketplaceButton' class="nav-link px-2" onClick={this.clickHealingPotionMarketplace}>Healing Potion Marketplace</a></li>
                                <li><a id='ArmorMarketplaceButton' class="nav-link px-2" onClick={this.clickArmorMarketplace}>Armor Marketplace</a></li>
                                <li><a id='SeeMyItemsButton' class="nav-link px-2" onClick={this.clickSeeItems}>View My Items</a></li>
                            </tr>
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

export default AvatarDashboard;

