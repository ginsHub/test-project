public with sharing class AddPrimaryContact implements Queueable {

    private Contact contact;
    private String  state;

    public AddPrimaryContact(Contact con, String st) {
        this.contact = con;
        this.state = st;

    }

    public void execute(QueueableContext context){
        List<Account> accounts = [SELECT Id FROM Account WHERE BillingState=:state LIMIT 200];
        List<Contact> contacts = new List<Contact>();
        for(Account acc: accounts){
            Contact contactClone = new Contact();
            contactClone = contact.clone(false,false,false,false);
            contactClone.accountId = acc.Id;
            contacts.add(contactClone);
        }
        insert contacts;
    }
}
