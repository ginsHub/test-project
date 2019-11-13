global with sharing class DailyLeadProcessor implements Schedulable{
    global void execute(SchedulableContext ctx) {
        List<Lead> leads = [SELECT Id,Name FROM Lead WHERE LeadSource = null LIMIT 200];
        List<Lead> leadsUpdate = new List<Lead>();
        for(Lead l: leads){
            l.LeadSource = 'Dreamforce';
            leadsUpdate.add(l);
        }
        update leadsUpdate;
    }
}
