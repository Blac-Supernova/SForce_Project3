public without sharing class ContactHelper {
    public ContactHelper() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getFamilyMembers(String userId){
        try {
            user u = [SELECT Id, ContactId FROM User];
            Contact con = [SELECT Id, property__c.Id FROM Contact];
            return [SELECT firstName, lastName FROM Contact WHERE property__c.Id = con.property__c.Id ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}