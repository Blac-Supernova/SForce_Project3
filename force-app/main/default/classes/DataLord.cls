public with sharing class DataLord {
    public static void NumAccounts(){
    //Challenge I-NumAccounts method should return the number of Accounts that exist in org 
    List<Account> accountList =[SELECT id, name FROM Account];   
    }
    //Challenge II-Write a method called NumHot. This method should return the number of Accounts with a Rating of Hot
    public static void NumHot(){
    List<Account> accountList =[SELECT id, name FROM Account WHERE Rating = 'Hot']; 
    }
    //Challenge III-Write a method called NumComplex. This method should return the number of Accounts that have an ampersand (&) in the Name
    public static void NumComplex(){
    List<Account> accountList =[SELECT id, name FROM Account WHERE Name LIKE '&%\'']; 
    //List<Account> accountList =[SELECT id, name FROM Account WHERE Name LIKE '&'];
    }
    //Challenge IV-Write a method called BigFive. This method should return the top 5 Accounts in terms of Annual Revenue.
    public static void BigFive(){
    List<Account> accountList =[SELECT id, name, AnnualRevenue FROM Account WHERE AnnualRevenue > 5000000 LIMIT 5 ];   
    // need to refactor to select the top 5
    
    }
    //Challenge V-Write a method called LastBigOpportunity. This method should return the Opportunity with the
    // most recent Close Date that had an Amount over $100,000.
    public static void  LastBigOpportunity(){
    //List<Opportunity> oppList =[SELECT id, name, FROM Opportunity WHERE CloseDate = '' AND Amount > 100000]; 
    List<Opportunity> oppList =[SELECT id, amount, closedate FROM Opportunity WHERE Amount > 100000 AND CloseDate = LAST_N_DAYS:30 ORDER BY CloseDate ASC];
    }
    //Challenge VI-Write a method called MajorPlayers. This method should return all Contacts that are 
    //associated to an Account with a Rating of Hot.
    public static void MajorPlayers(){
    List<Account> accountList = [SELECT id, Name, (SELECT LastName FROM Contacts) FROM Account WHERE Rating = 'Hot'];    
    }
}