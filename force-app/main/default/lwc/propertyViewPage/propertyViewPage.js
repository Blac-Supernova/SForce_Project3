import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import  residenceReference from '@salesforce/schema/Property__c';
import address from '@salesforce/schema/Property__c.Location__c'
import  numberOfBaths  from '@salesforce/schema/Property__c.Number_of_Bathrooms__c';
import  numberOfBedrooms  from '@salesforce/schema/Property__c.Number_of_Bedrooms__c';
import image from '@salesforce/schema/Property__c.Image_URL__c';
import description from '@salesforce/schema/Property__c.Description__c';
import petsAllowed from '@salesforce/schema/Property__c.Are_Pets_Allowed__c';
import square from '@salesforce/schema/Property__c.sqft__c';

export default class PropertyViewPage extends NavigationMixin(LightningElement) {
    @track
    currentPageReference;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }

    propertyId; 

    connectedCallback() {
        this.propertyId = this.currentPageReference?.state?.c__propertyId;
    }

    objectApiName = residenceReference;
    
    numberOfBaths = numberOfBaths;
    numberOfBedrooms = numberOfBedrooms;
    imageURL = image;
    address=address;
    square = square;
    description = description;
    petsAllowed = petsAllowed;
}