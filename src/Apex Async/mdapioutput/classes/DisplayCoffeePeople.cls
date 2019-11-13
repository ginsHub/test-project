public with sharing class DisplayCoffeePeople {

    @AuraEnabled(cacheable=true)
    public static List<Coffee_People__c> getAllCoffeePeople(){
        return [SELECT Id,Name__c, Attribute1__c, Coffee__c, Attribute2__c FROM Coffee_People__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Coffee_People__c> returnPersonCoffee(String search){
        String searchKey = '%'+search+'%';
        return [SELECT Id,Name__c, Attribute1__c, Coffee__c, Attribute2__c FROM Coffee_People__c WHERE Name__c LIKE :searchKey];
    }
}
