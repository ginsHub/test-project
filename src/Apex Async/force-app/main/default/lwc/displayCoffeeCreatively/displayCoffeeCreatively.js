import { LightningElement, wire} from 'lwc';
import getAllCoffeePeople from '@salesforce/apex/DisplayCoffeePeople.getAllCoffeePeople';

export default class DisplayCoffeeCreatively extends LightningElement {


    @wire(getAllCoffeePeople) coffeePeople;
    
      /** stuff used for debugging and console logging
      logOutStuff(dataToLog, logmessage) {
        console.log(logmessage + JSON.stringify(dataToLog));
      }*/

}