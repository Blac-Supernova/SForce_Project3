public with sharing class ContactController {
    public ContactController() {

    }

    @AuraEnabled
    public static String getPropertyId(String contactId){
        try {
            List<Contact> contactWithProp = [SELECT Id, Property__c FROM Contact 
            WHERE Id = :contactId ];
            if(contactWithProp.size() > 0)
            {
                return contactWithProp[0].Property__c;
            }
            else {
                return '';
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}