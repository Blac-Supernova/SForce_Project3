public without sharing class ContactHelper {
    public ContactHelper() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactIdByName(String q){
        try {
            String sanitizedQuery = String.escapeSingleQuotes(q);
            String query = '%' + sanitizedQuery + '%';
            return [SELECT Id, Email, Phone, FirstName, LastName FROM Contact WHERE Name LIKE :query];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}