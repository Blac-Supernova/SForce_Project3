public with sharing class PropertyController {
    @AuraEnabled(cacheable=true)
    public static List<Property__c> getProperties() {
        return [SELECT Id, Name, Address__c, Price__c, Description__c FROM Property__c LIMIT 10];
    }
}  