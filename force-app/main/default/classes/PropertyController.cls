public with sharing class PropertyController {
    @AuraEnabled(cacheable=true)
    public static List<Property__c> getProperties() {
        return [SELECT Id, Location__c, Price__c, Available_From__c, Number_of_Bedrooms__c, Number_of_Bathrooms__c, Image_URL__c FROM Property__c];
    }
}