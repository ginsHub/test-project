import { LightningElement, track, wire } from 'lwc';
import returnPersonWithSameCoffeeAttribute from '@salesforce/apex/DisplayCoffeePeople.returnPersonWithSameCoffeeAttribute';

export default class SearchPersonWithSameCoffeeAndAttribute extends LightningElement {
    @track personCoffee;
    @track error;
    @track attribute1='';
    @track attribute2='';
    @track coffee='';

    @wire(returnPersonWithSameCoffeeAttribute,{ attribute1: '$attribute1', attribute2: '$attribute2', coffee: '$coffee' }) 
    personCoffee;

    handlePeopleWithSameCoffeeAttribute() {
    returnPersonWithSameCoffeeAttribute({attribute1: this.attribute1, attribute2: this.attribute2, coffee: this.coffee})
        .then(result => {this.personCoffee = result;})
        .catch(error => {this.error = error;});
    }

    handleCoffee(event){
        this.coffee = event.target.value;
    }
    handleAtt1(event){
        this.attribute1 = event.target.value;
    }
    handleAtt2(event){
        this.attribute2 = event.target.value;
    }
}