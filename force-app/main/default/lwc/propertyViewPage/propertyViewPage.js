import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import getPropertyImages from '@salesforce/apex/PropertyController.getPropertyImages';
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
    @track propertyImages = [];
    currentSlide = 0;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }

    propertyId; 

    connectedCallback() {
        this.propertyId = this.currentPageReference?.state?.c__propertyId;
        this.fetchPropertyImages();
    }

    @wire(getRecord, { recordId: '$propertyId', fields: [address, numberOfBaths, numberOfBedrooms, description, petsAllowed, square] })
    property;

    fetchPropertyImages() {
        if (this.propertyId) {
            getPropertyImages({ propertyId: this.propertyId })
                .then(result => {
                    this.propertyImages = result.map(imageRecord => ({
                        id: imageRecord.Id,
                        imageURL: imageRecord.Image_URL__c,
                    }));
                })
                .catch(error => {
                    console.error('Error fetching property images:', error);
                });
        }
    }

    //Removes the white description space from carousel images
    renderedCallback() {
        const style = document.createElement('style');
        style.innerText = `.slds-carousel__content {
            display: none;
        }`;
        this.template.querySelector('lightning-carousel').appendChild(style);
    }
    get hasImages() {
        return this.propertyImages.length > 0;
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