global with sharing class LeadProcessor implements Database.Batchable<sObject>, Database.Stateful {

    global Integer recordsProcessed = 0;
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT ID, Name, LeadSource FROM Lead');

    }

    global void execute(Database.BatchableContext bc, List<Lead> scope){
        List<Lead> leadList = new List<Lead>();
        for(Lead l: scope){
            l.LeadSource = 'Dreamforce';
            leadList.add(l);
            recordsProcessed = recordsProcessed + 1;
        }
        update leadList;
    }

    global void finish(Database.BatchableContext bc){
        System.assertEquals(200,recordsProcessed,'SUCCESSFULLY PROCESSED 200 RECORDS!');
    }
}
