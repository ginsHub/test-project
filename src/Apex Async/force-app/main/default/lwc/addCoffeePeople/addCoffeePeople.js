import { LightningElement,wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import addRecords from '@salesforce/apex/DisplayCoffeePeople.addRecords';
import coffeePicklist from '@salesforce/schema/Coffee_People__c.Coffee__c';
import coffeeObject from '@salesforce/schema/Coffee_People__c';

export default class AddCoffeePeople extends LightningElement {

    @track name;
    @track attribute1;
    @track attribute2;
    @track coffee;

    @wire(getObjectInfo, { objectApiName: coffeeObject })
    objectInfo;
    @wire(addRecords,{name: '$name', attribute1: '$attribute1', coffee: '$coffee', attribute2: '$attribute2'}) 
    personCoffee;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: coffeePicklist})
    coffeePicklistValue;

    handleSubmit() {
        addRecords({name: this.name, attribute1: this.attribute1, coffee: this.coffee, attribute2: this.attribute2})
        .then(result => {
            this.personCoffee = result;
            const evt = new ShowToastEvent({
                title: "Person's coffee created",
                message: "Record ID: "+this.personCoffee.Id,
                variant: "success"
            });
            this.name = '';
            this.attribute1 = '';
            this.attribute2 = '';
            this.coffee = '';

            this.dispatchEvent(evt);
        })
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
    handleName(event){
        this.name = event.target.value;
    }

}