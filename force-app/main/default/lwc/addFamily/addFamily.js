
import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import id from '@salesforce/user/Id';
import getFamilyMembers from '@salesforce/apex/ContactHelper.getFamilyMembers';
export default class AddFamily extends LightningElement {
    
    @track firstName = '';
    @track lastName = '';
    @track phone = '';
    @track title = '';
    userId = id;

    @wire(getFamilyMembers, {userId : "$userId"})
    familyMembers;

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
