@isTest
private class AccountProcessorTest {
    static List<Id> listID = new List<Id>();
    
    @TestSetup
    static void makeData(){
        listID = AccountIdAutoGenerateHelper.generateAccountId(2,3);
    }

    @isTest
    static void testDynamicAccountAndContactCreation() {
        Test.startTest();
        AccountProcessor.countContacts(listID);
        Test.stopTest();
        System.System.debug('MAY LAMAN BA YUN AUTO GENERATE? '+ accountIds.size());
    }

    @isTest
    static void testError() {
        List<Id> nullIds = new List<Id>();
        AccountProcessor.countContacts(nullIds);
    }
}
