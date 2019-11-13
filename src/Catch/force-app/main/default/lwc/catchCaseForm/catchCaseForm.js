import formAbstract from 'c/formAbstract'
import { track } from 'lwc';

export default class CatchCaseForm extends formAbstract {

    @track getSubOptions;

    deptOptions = [
        {label: 'Sold by Catch', value: 'catch'},
        {label: 'Sold by Marketplace Seller', value: 'mp'},
        {label: 'Club Catch', value: 'club'}
    ];
    
    catchOptions = [
        {label: 'Product Enquiry', value: 'catchProdEnquiry'},
        {label: 'Update My Address', value: 'catchUpdateAddress'},
        {label: 'Return Request', value: 'catchReturnRequest'},
        {label: 'Payment Enquiry', value: 'catchPaymentEnquiry'},
        {label: 'My Account Details', value: 'catchAccDetails'},
        {label: 'Order Tracking', value: 'catchOrderTracking'},
        {label: 'Missing Item', value: 'catchMissingItem'},
        {label: 'Incorrect Item Received', value: 'catchIncorrectItem'},
        {label: 'Cancel Order', value: 'catchCancelOrder'},
        {label: 'Other', value: 'catchOther'}
    ];

    mpOptions = [
        {label: 'Product Enquiry', value: 'mpProdEnquiry'},
        {label: 'Order Tracking', value: 'mpOrderTracking'},
        {label: 'Return Request', value: 'mpReturnRequest'},
        {label: 'Incorrect Item Received', value: 'mpIncorrectItem'},
        {label: 'No Response from Seller', value: 'mpNoResponse'},
        {label: 'Cancel Order Within 20 minutes', value: 'mpCancelOrder'},
        {label: 'Update Address Within 20 minutes', value: 'mpUpdateAddress'},
        {label: 'Seller Approved Return', value: 'mpApprovedReturn'},
        {label: 'Require Assistance', value: 'mpRequireAssistance'}
    ];

    clubOptions = [
        {label: 'I wish to join Club Catch', value: 'clubJoin'},
        {label: 'I need assistance for my Kmart Club Catch membership', value: 'clubKmart'},
        {label: 'I need assistance for my Target Club Catch membership', value: 'clubTarget'},
        {label: 'I wish to cancel my Club Catch subscription', value: 'clubCancel'},
        {label: 'I received a charge on my credit card and unsure what it\'s for', value: 'clubCreditCard'},
        {label: 'I would like more information about Club Catch', value: 'clubMoreInfo'}
    ];
    
    standardCatchConfig = {
        parentName: 'department',
        showFor: ['catch'],
    }

    nameConfig = {
        parentName: 'subOption',
        showFor: ['catchProdEnquiry','catchUpdateAddress','catchReturnRequest','catchPaymentEnquiry','catchAccDetails',
                    'catchOrderTracking','catchCancelOrder','catchOther'],
    }

    phoneConfig = {
        parentName: 'subOption',
        showFor: ['catchProdEnquiry','catchUpdateAddress','catchReturnRequest','catchPaymentEnquiry','catchAccDetails',
                    'catchOrderTracking','catchCancelOrder','catchOther'],
    }

    productNameConfig = {
        parentName: 'subOption',
        showFor: ['catchProdEnquiry','catchReturnRequest'],
    }

    orderNumberConfig = {
        parentName: 'subOption',
        showFor: ['catchUpdateAddress','catchReturnRequest','catchPaymentEnquiry','catchOrderTracking','catchCancelOrder','catchOther']
    }

    otherConfig = {
        parentName: 'subOption',
        showFor: 'catchOther'
    }

    handleDeptChange(event){
        console.log('BEFORE CONSOLE!' + event.target.value);
        switch(event.target.value){
            case 'catch':
            this.getSubOptions = this.catchOptions;
            break;
            case 'mp':
            this.getSubOptions = this.mpOptions;
            break;
            case 'club':
            this.getSubOptions = this.clubOptions;
            break;
            default:          
        }
    }

    handleSubmit() {
        
    }
}