import { LightningElement, api } from 'lwc';

export default class CoffeePerson extends LightningElement {

    @api coffeePerson;

    get CoffeeClass() {
        switch(this.coffeePerson.Coffee__c) {
            case "Flat White":
                return 'flat-white';
            case "Long Black":
                return 'long-black';
            default:
                return 'default-class';

        }
    }
}