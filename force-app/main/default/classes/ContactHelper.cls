public with sharing class ContactHelper {
    public ContactHelper() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getFamilyMembers(String userId){
        try {
            //Get contact ID of current user where ID from paramter is equal to the current user. 
            user u = [SELECT ContactId 
                        FROM User
                        WHERE Id =: userId];

            List<Property__c> userInfo = [SELECT Id, (SELECT Id FROM Contacts__r WHERE Id =: u.ContactId) FROM Property__c];


            Contact con = [SELECT Id, Property__r.Id
                                    FROM Contact 
                                    WHERE Id =: u.ContactId];

            return [SELECT firstName, lastName, Property__c
                    FROM Contact 
                    WHERE Property__r.Id =: con.Property__r.Id];
                    

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}