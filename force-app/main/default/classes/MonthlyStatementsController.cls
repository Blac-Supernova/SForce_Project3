public with sharing class MonthlyStatementsController {
    @AuraEnabled(cacheable=true)
    public static List<Monthly_Statement__c> getMonthlyStatementsByUserId(Id userId) {
        List<Contact> matchingContact = [SELECT Id FROM Contact WHERE Id IN (SELECT ContactId FROM User WHERE Id = :userId)];
        Id contactId;
        if (matchingContact.size() > 0) {
            contactId = matchingContact[0].Id;
        }
        else {
            return null;
        }
        return [SELECT Name, Monthly_Amount__c FROM Monthly_Statement__c WHERE Contact__r.Id = :contactId];
    }
}