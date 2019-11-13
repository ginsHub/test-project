/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, wire, track } from 'lwc';
import returnPersonCoffee from '@salesforce/apex/DisplayCoffeePeople.returnPersonCoffee';

const DELAY = 1000;

export default class SearchCoffeeUsingPerson extends LightningElement {
    @track searchKey = '';
    @wire(returnPersonCoffee,{ searchKey: '$searchKey' }) personCoffee;

    handleKeyChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {this.searchKey = searchKey;}, DELAY);
        //this.searchKey = event.target.value;
    }

}
