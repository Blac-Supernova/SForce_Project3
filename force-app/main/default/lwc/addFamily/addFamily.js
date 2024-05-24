
import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
export default class AddFamily extends LightningElement {
    
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track phone = '';
    @track title = '';


    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePhoneChange(event) {
        this.accRecord.Phone = event.target.value;
    }

    handleTitleChange(event) {
        this.title = event.target.value;
    }

    handleSaveClick() {
        const fields = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Phone: this.phone,
            Title: this.title
        };
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(result => {
                console.log('Contact created successfully:', result.id);
            })
        .catch(error => {
            this.error = error.message;
        });
    }
}
