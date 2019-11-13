import { LightningElement,wire,track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import getAllCoffeePeople from '@salesforce/apex/DisplayCoffeePeople.getAllCoffeePeople';
import deleteCoffeePerson from '@salesforce/apex/DisplayCoffeePeople.deleteCoffeePerson';


const actions = [
    { label: 'Record Details', name: 'record_details'}, 
    { label: 'Edit', name: 'edit'}, 
    { label: 'Delete', name: 'delete'}
];

const columns = [
    { label: 'Coffee Id', fieldName: 'Id' }, 
    { label: 'Name', fieldName: 'Name__c' },
    { label: 'Attribute 1', fieldName: 'Attribute1__c', type: 'text'}, 
    { label: 'Coffee', fieldName: 'Coffee__c', type: 'text' }, 
    { label: 'Attribute 2', fieldName: 'Attribute2__c', type: 'text' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
];

export default class UpdateDelete extends LightningElement {

    @track data;
    @track columns = columns;
    @track record = [];
    @track bShowModal = false;
    @track currentRecordId;
    @track isEditForm = false;
    @track showLoadingSpinner = false;
    selectedRecords = [];
    refreshTable;
    error;

    @wire(getAllCoffeePeople)
    coffeePeople(result) {
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    handleRowActions(event) {
        let actionName = event.detail.action.name;

        window.console.log('actionName ====> ' + actionName);

        let row = event.detail.row;

        window.console.log('row ====> ' + row);
        // eslint-disable-next-line default-case
        switch (actionName) {
            case 'record_details':
                this.viewCurrentRecord(row);
                break;
            case 'edit':
                this.editCurrentRecord(row);
                break;
            case 'delete':
                this.deleteCoffeePerson(row);
                break;
        }
    }

    viewCurrentRecord(currentRow) {
        this.bShowModal = true;
        this.isEditForm = false;
        this.record = currentRow;
    }

    closeModal() {
        this.bShowModal = false;
    }

    editCurrentRecord(currentRow) {
        // open modal box
        this.bShowModal = true;
        this.isEditForm = true;

        // assign record id to the record edit form
        this.currentRecordId = currentRow.Id;
    }

    handleSubmit(event) {
        // prevending default type sumbit of record edit form
        event.preventDefault();

        // querying the record edit form and submiting fields to form
        this.template.querySelector('lightning-record-edit-form').submit(event.detail.fields);

        // closing modal
        this.bShowModal = false;

        // showing success message
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: event.detail.fields.Name__c + ' Coffee Person updated Successfully!!.',
            variant: 'success'
        }),);

    }

    handleSuccess() {
        return refreshApex(this.refreshTable);
    }

    deleteCoffeePerson(currentRow) {
        let currentRecord = [];
        currentRecord.push(currentRow.Id);
        this.showLoadingSpinner = true;

        // calling apex class method to delete the selected contact
        deleteCoffeePerson({lstCofIds: currentRecord})
        .then(result => {
            window.console.log('result ====> ' + result);
            this.showLoadingSpinner = false;

            // showing success message
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: currentRow.Name__c +' Coffee Person deleted.',
                variant: 'success'
            }),);

            // refreshing table data using refresh apex
             return refreshApex(this.refreshTable);

        })
        .catch(error => {
            window.console.log('Error ====> '+error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!!', 
                message: error.message, 
                variant: 'error'
            }),);
        });
    }



    // @track page = 1;

    // handlePrevious() {
    //     if (this.page > 1) {
    //         this.page = this.page - 1;
    //     }
    // }

    // handleNext() {
    //     this.page = this.page + 1;
    // }
}