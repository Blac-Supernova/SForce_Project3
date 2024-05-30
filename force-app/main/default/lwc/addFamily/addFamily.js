import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import getFamilyMembers from '@salesforce/apex/ContactHelper.getFamilyMembers';
import id from '@salesforce/user/Id';
export default class AddFamily extends LightningElement {
    
    @track firstName = FIRSTNAME_FIELD;
    @track lastName = LASTNAME_FIELD;
    @track phone = PHONE_FIELD;
    @track title = TITLE_FIELD;
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
