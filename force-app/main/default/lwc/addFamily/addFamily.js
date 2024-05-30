import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PROPERTY_FIELD from '@salesforce/schema/Contact.Property__c';
import getFamilyMembers from '@salesforce/apex/ContactHelper.getFamilyMembers';
import Id from '@salesforce/user/Id';

export default class LdsCreateRecord extends LightningElement {
    
    firstName = '';
    lastName = '';
    phone = '';
    title = '';
    userId = Id;


    @wire(getFamilyMembers, {userId : "$userId"})
    familyMembers;

   
    /*async createContact() {
        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.template.refs.firstName.value;
        fields[LASTNAME_FIELD.fieldApiName] = this.template.refs.lastName.value;
        fields[PHONE_FIELD.fieldApiName] = this.template.refs.phone.value;
        fields[TITLE_FIELD.fieldApiName] = this.template.refs.title.value;
        //fields[PROPERTY_FIELD.fieldApiName] = familyMembers.Data[0].Property__c;
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        try {
            const contact = await createRecord(recordInput);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact created.',
                    variant: 'success'
                })
            );
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Error in creating contact.',
                    variant: 'error'
                })
            );
        }
    } */
}