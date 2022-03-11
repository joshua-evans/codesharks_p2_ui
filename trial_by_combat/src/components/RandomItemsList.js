import React from "react";

import Avatar from "./listings/Avatar";
import Armor from "./listings/Armor";
import Weapon from "./listings/Weapon";
import HealingPotion from "./listings/HealingPotion";

class RandomItemsList extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {value: "",
            avatars: ["No random items to display"],
            armor: "",
            weapon:"",
            healingpotion:""
        };
        this.fetchRandomItems = this.fetchRandomItems.bind(this);
        this.refreshRandomItemList = this.refreshRandomItemList.bind(this);
    }

    fetchRandomItems = async () => {
        let itemArray = [];

        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.authToken}`
            }
        };
        try {
            const fetchResponseArmor = await fetch(`${this.props.server}/trial-by-combat/armor/randarmor?budget=${this.props.selectedAvatar.props.gold}`, settings);
            const dataArmor = await fetchResponseArmor.json();
            this.setState({armor:<Armor armorName={dataArmor.armorName}
                                        description={dataArmor.description}
                                        armorClass={dataArmor.armorClass}
                                        damageReduction={dataArmor.damageReduction}
                                        price={dataArmor.price}
                                        />});

            const fetchResponseWeapon = await fetch(`${this.props.server}/trial-by-combat/weapon/randweapon?budget=${this.props.selectedAvatar.props.gold}`, settings);
            const dataWeapon = await fetchResponseWeapon.json();
            this.setState({weapon:<Weapon weaponName={dataWeapon.weaponName}
                                        description={dataWeapon.description}
                                        armorClass={dataWeapon.damageDie}
                                        damageReduction={dataWeapon.damageBonus}
                                        price={dataWeapon.price}
                                        />});

            const fetchResponseHealingPotion = await fetch(`${this.props.server}/trial-by-combat/healing_potion/randhealingpotion?budget=${this.props.selectedAvatar.props.gold}`, settings);
            const dataHealingPotion = await fetchResponseHealingPotion.json();
            this.setState({healingpotion:<HealingPotion potionName={dataHealingPotion.potionName}
                                        description={dataHealingPotion.description}
                                        healingDie={dataHealingPotion.healingDie}
                                        healingBonus={dataHealingPotion.healingBonus}
                                        price={dataHealingPotion.price}
                                         />});
              
        } catch (e) {
            console.log(e);
        }       
      }

      refreshRandomItemList = () => {
            console.log(this.props.selectedAvatar);
            this.fetchRandomItems();
            this.forceUpdate();
      }

      render() {
        if (this.props.visComponent === 'AvatarDashboard') {
            if (!(this.state.armor && this.state.weapon && this.state.healingpotion)) {
                return(<>
                        <div>
                            <a id='RandomItemsListButton' class="nav-link px-2" onClick = {this.refreshRandomItemList}>Refresh RandomItemList</a>
                        </div>
                        </>)
            }

            return (<>
                <div>
                    <a id='RandomItemsListButton' class="nav-link px-2" onClick = {this.refreshRandomItemList}>Refresh RandomItemList</a>
                </div>
                    <div class="col d-flex justify-content-center">
                        <table class="table">
                            <thead><tr><th>Your Random Armor</th></tr>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Armor Class</th>
                                <th>Damage Reduction</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                        
                            <tbody>
                                {this.state.armor}
                            </tbody>
                        </table>
                    </div>

                    <div class="col d-flex justify-content-center">
                        <table class="table">
                            <thead><tr><th>Your Random Weapon</th></tr>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Damage Die</th>
                                <th>Damage Bonus</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                        
                            <tbody>
                                {this.state.weapon}
                            </tbody>
                        </table>
                    </div>

                    <div class="col d-flex justify-content-center">
                        <table class="table">
                            <thead><tr><th>Your Random Healing Potion</th></tr>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Healing Die</th>
                                <th>Healing Bonus</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                        
                            <tbody>
                                {this.state.healingpotion}
                            </tbody>
                        </table>
                    </div>
            </>);
        }
        return(<></>);
    }
} export default RandomItemsList;