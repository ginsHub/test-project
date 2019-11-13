@isTest
public with sharing class DailyLeadProcessorTest {
    
    public static String CRON_EXP = '0 0 0 15 3 ? 2022';

    @TestSetup
    static void makeDataLeads(){
        List<Lead> insertLeads = new List<Lead>();
        for(Integer x=0; x < 200; x++){
            Lead l = new Lead(Firstname='Lead '+x, Lastname='Test '+x,Company='Company Test '+x);
            insertLeads.add(l);
        }
        insert insertLeads;
    }

    @isTest
    static void testLeadProcessor(){
        Test.startTest();
        String jobId = System.schedule('TestDailyLeadProcessor',CRON_EXP,new DailyLeadProcessor());
        Test.stopTest();
        System.assertEquals(200,[SELECT Count() FROM Lead WHERE LeadSource='Dreamforce'],'STATIC 200 AND SOQL RESULT IS NOT EQUAL');
    }
}
