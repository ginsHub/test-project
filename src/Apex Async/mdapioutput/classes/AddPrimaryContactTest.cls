@isTest
public with sharing class AddPrimaryContactTest {
    
    @TestSetup
    static void makeContactandAccounts(){
        List<Account> accounts = new List<Account>();
        Contact con = new Contact(Firstname='Contact Test', Lastname='Primary');
        insert con;
        for(Integer x=0; x < 50; x++){
            Account acc = new Account(Name='Test Account '+x, BillingState='NY');
            accounts.add(acc);
        }
        for(Integer x=0; x < 50; x++){
            Account acc = new Account(Name='Test Account '+x, BillingState='CA');
            accounts.add(acc);
        }
        insert accounts;
        
    }

    @isTest
    static void testQueueable(){
        Contact cont = [SELECT Id,Firstname,Lastname FROM Contact WHERE Firstname LIKE '%Contact Test%'];
        AddPrimaryContact apc = new AddPrimaryContact(cont,'CA');
        Test.startTest();
        System.enqueueJob(apc);
        Test.stopTest();
        System.assertEquals('Contact Test',[SELECT (SELECT Firstname FROM Contacts) FROM Account WHERE BillingState = 'CA'][0].Contacts[0].Firstname);
    }
}
