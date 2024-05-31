public with sharing class MonthlyStatementsController {
    @AuraEnabled(cacheable=true)
    public static List<Monthly_Statement__c> getMonthlyStatementsByUserId(Id userId) {
        User u;
        try {
            u = [SELECT ContactId FROM User WHERE Id = :userId LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching user: ' + e.getMessage());
        }

        try {
            List<Monthly_Statement__c> statements = [SELECT Name, Monthly_Amount__c FROM Monthly_Statement__c WHERE Contact__r.Id = :u.ContactId];
            return statements;
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching monthly statements: ' + e.getMessage());
        }
    }
}