public without sharing class CaseController {
    public CaseController() {

    }

    // Returns true if the user is currently staying at the property
    @AuraEnabled
    public static Boolean isUserRentingProperty(String contactId, String propertyId){
        try {

            Date today = System.today();

            List<Monthly_Statement__c> monthlyStatements = [ SELECT Id FROM Monthly_Statement__c WHERE
            Contact__c = :contactId AND Property__c = :propertyId
            AND Rental_Period_From__c < :today AND Rental_Period_To__c > :today ];

            if(monthlyStatements.size() > 0) {
                return true;
            } else {
                return false;
            }
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}