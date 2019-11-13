public with sharing class DisplayCoffeePeople {

    @AuraEnabled(cacheable=true)
    public static List<Coffee_People__c> getAllCoffeePeople(){
        return [SELECT Id,Name__c, Attribute1__c, Coffee__c, Attribute2__c FROM Coffee_People__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Coffee_People__c> returnPersonCoffee(String searchKey){
        String sk = '%'+searchKey+'%';
        return [SELECT Id,Name__c, Attribute1__c, Coffee__c, Attribute2__c FROM Coffee_People__c  WHERE Name__c LIKE :sk];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Coffee_People__c> returnPersonWithSameCoffeeAttribute(String attribute1, String attribute2, String coffee){
        String att1 = '\'%'+attribute1+'%\'';
        String att2 = '\'%'+attribute2+'%\'';
        String co = '\'%'+coffee+'%\'';
        String sqlString = 'SELECT Id,Name__c, Attribute1__c, Coffee__c, Attribute2__c FROM Coffee_People__c';
        System.System.debug('COFFEE '+coffee);
        System.System.debug('ATTRIBUTE1 '+attribute1);
        System.System.debug('ATTRIBUTE2 '+attribute2);

        if(String.isBlank(coffee)){
            if(String.isBlank(attribute1)){
                if(String.isBlank(attribute2)){
                    return Database.query(sqlString);
                }else{
                    sqlString = sqlString+' WHERE Attribute2__c LIKE '+att2;
                    return Database.query(sqlString);
                }
            }else{
                sqlString = sqlString+' WHERE Attribute1__c LIKE '+att1;
                if(String.isBlank(attribute2)){
                    return Database.query(sqlString);
                }else{
                    sqlString = sqlString+' AND Attribute2__c LIKE '+att2;
                    return Database.query(sqlString);
                }
            }
        }else{
            sqlString = sqlString+' WHERE Coffee__c LIKE '+co;
            if(String.isBlank(attribute1)){
                if(String.isBlank(attribute2)){
                    System.debug(sqlString);
                    return Database.query(sqlString);
                }else{
                    sqlString = sqlString+' AND Attribute2__c LIKE '+att2;
                    return Database.query(sqlString);
                }
            }else{
                sqlString = sqlString+' AND Attribute1__c LIKE '+att1;
                if(String.isBlank(attribute2)){
                    return Database.query(sqlString);
                }else{
                    sqlString = sqlString+' AND Attribute2__c LIKE '+att2;
                    return Database.query(sqlString);
                }
            }
        }
    }

    @AuraEnabled
    public static Coffee_People__c addRecords(String name, String attribute1, String coffee, String attribute2){
        System.debug('DEBUGGIN! '+name);
        Coffee_People__c cp = new Coffee_People__c(Name__c=name, Attribute1__c=attribute1, Coffee__c=coffee, Attribute2__c=attribute2);
        insert cp;
        return cp;
    }

    @AuraEnabled
    public static void deleteCoffeePerson(list<Id> lstCofIds){
        try {
            list<Coffee_People__c> cpToDelete = new list<Coffee_People__c>();
            System.debug('lstCofIds ====> '+lstCofIds);
            for(Id idCof : lstCofIds) {
                cpToDelete.add(new Coffee_People__c(Id = idCof));
            }
            if(!cpToDelete.isEmpty()) {
                delete cpToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}