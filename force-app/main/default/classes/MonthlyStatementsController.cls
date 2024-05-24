public with sharing class MonthlyStatementsController {
    @AuraEnabled(cacheable=true)
    public static List<Monthly_Statement__c> getMonthlyStatementsByContactId(Id contactId) {
        return [SELECT Name, Monthly_Amount__c FROM Monthly_Statement__c WHERE Contact__r.Id = :contactId];
    }
}