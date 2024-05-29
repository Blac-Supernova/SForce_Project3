global with sharing class LeadHelper {
    public LeadHelper() {
    


    }

    @InvocableMethod
    public static void setUpExperienceUser(List<String> recordIds) {
        if (recordIds == null || recordIds.isEmpty()) {
            return;
        }
        
        String recordId = recordIds[0];

        // Query the lead to check if it has already been converted
        Lead leadToConvert = [SELECT Id, IsConverted FROM Lead WHERE Id = :recordId LIMIT 1];

        if (leadToConvert.IsConverted) {
            // Lead has already been converted, log a message and return
            System.debug('Lead with ID ' + recordId + ' has already been converted.');
            return;
        }


        Database.LeadConvert lc = new database.LeadConvert();
        Id accountId = [SELECT Id FROM Account WHERE Name = 'Genie Properties' LIMIT 1].Id;

        lc.setLeadId(recordId);
        lc.setAccountId(accountId);

        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        lc.setConvertedStatus(convertStatus.MasterLabel);

       Database.LeadConvertResult lcr = Database.convertLead(lc);

       //get contact Id from lead and other contact info
       Id contactId = lcr.getContactId();

       Contact newContact = [SELECT Id, FirstName, LastName, Email FROM Contact WHERE Id = :contactId];

       //profile for community user
       Id profileId = [SELECT Id FROM Profile WHERE Name = 'Customer Community User' LIMIT 1].Id;
       //Org name for usernames
       String orgName = '@empathetic-impala-qno2i4.com';

       //User Details
       User newUser = new User();
       newUser.FirstName = newContact.FirstName;
       newUser.LastName = newContact.LastName;
       newUser.Email = newContact.Email;
       newUser.Username = newContact.Email + orgName;
       newUser.Alias = newContact.FirstName.substring(0,3) + newContact.LastName.substring(0, 2);
       newUser.CommunityNickname = newContact.FirstName + newContact.LastName;
       newUser.ProfileId = profileId;
       newUser.ContactId = newContact.Id;
       newUser.TimeZoneSidKey = 'America/Los_Angeles';
       newUser.LocaleSidKey = 'en_US';
       newUser.EmailEncodingKey = 'UTF-8';
       newUser.LanguageLocaleKey = 'en_US';

       try {
        insert newUser;
        System.debug('User created with ID: ' + newUser.Id);
    } catch (DmlException e) {
        System.debug('User creation failed: ' + e.getMessage());
    }


    }
}