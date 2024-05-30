public with sharing class MonthlyStatementsController {
    @AuraEnabled(cacheable=true)
    public static List<Monthly_Statement__c> getMonthlyStatementsByUserId(Id userId) {
        User u;
        try {
            u = [SELECT ContactId FROM User WHERE Id = :userId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
        try {
            return [SELECT Name, Monthly_Amount__c FROM Monthly_Statement__c WHERE Contact__r.Id = :u.ContactId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}