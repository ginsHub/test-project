@isTest
public with sharing class AccountIdAutoGenerateHelper {
    

    public static List<Id> generateAccountId(Integer countAcc, Integer countCon) {
        List<Account> accList = new <Account>();
        List<Contact> conList = new List<Contact>();
        List<Id> listID = new List<Id>();
        for(Integer x=0; x < countAcc; x++){
            Account acc = new Account();
            acc.Name = 'Testing Account '+x;
            accList.add(acc);
        }
        insert accList;
        for(Integer z=0; z<accList.size();z++){            
            listID.add(accList.get(z).Id);
            for(Integer y=0; y < countCon; y++){
                Contact con = new Contact();
                con.Firstname = 'Firstname Account '+z+' Con '+y;
                con.Lastname  = 'Lastname Account '+z+' Con '+y;
                con.AccountId = accList.get(z).Id;   
                conList.add(con);     
            }
        }
        insert conList;
        return listID;
    }
}
