
import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import id from '@salesforce/user/Id';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import getFamilyMembers from '@salesforce/apex/ContactHelper.getFamilyMembers';
export default class AddFamily extends LightningElement {
    
    @track firstName = '';
    @track lastName = '';
    @track phone = '';
    @track title = '';
    userId = id;

    @wire(getFamilyMembers, {userId : "$userId"})
    familyMembers;

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleTitleChange(event) {
        this.title = event.target.value;
    }

    handleSave() {
        const fields = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Phone: this.phone,
            Title: this.title
        };
    }

    async createContact() {
        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastName;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[TITLE_FIELD.fieldApiName] = this.title;
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        try {
            const contact = await createRecord(recordInput);
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact has been created.',
                    variant: 'success'
                })
            );
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating contact.',
                    message: reduceErrors(error).join(', '),
                    variant: 'Error'
                })
            );
        }
    }
}
