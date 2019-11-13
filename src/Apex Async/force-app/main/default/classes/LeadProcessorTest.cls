@isTest
public with sharing class LeadProcessorTest {

    

    @TestSetup
    static void generateLeadRecords(){
        List<Lead> leads = new List<Lead>();
        for(Integer x=0; x < 200;x++){
            Lead l = new Lead(Firstname='Firstname '+x, Lastname='Lastname '+x, Status='Open - Not Contacted', Company='Regine Company Num '+x);
            leads.add(l);
        }
        insert leads;
    }
    @isTest
    static void testLeadBatch() {
        Test.startTest();
        LeadProcessor lp = new LeadProcessor();
        Id batchId = Database.executeBatch(lp);
        Test.stopTest();
        System.System.debug('LEAD BATCH ID IS '+batchId);
        System.assertEquals(200,[SELECT COUNT() FROM LEAD]);    }
}