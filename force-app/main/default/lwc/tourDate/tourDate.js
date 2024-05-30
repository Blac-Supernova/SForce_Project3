import { LightningElement, track } from 'lwc';

export default class TourDate extends LightningElement {
    @track name = '';
    @track email__c = '';
    @track date__c = '';
    @track time__c = '';
    @track property__c = '';

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleEmailChange(event) {
        this.email__c = event.target.value;
    }

    handleDateChange(event) {
        this.date__c = event.target.value;
    }

    handleTimeChange(event) {
        this.time__c = event.target.value;
    }

    handleTimeChange(event) {
        this.property__c = event.target.value;
    }

    handleSubmit() {
        // Implement the logic to handle the form submission
        const fields = {
            name: this.name,
            email__c: this.email__c,
            date__c: this.date__c,
            time__c: this.time__c,
            property__c: this.property__c
        };
        console.log('Form submitted with fields:', fields);

        // Add any additional logic, such as calling an Apex method to process the form data.
        // E.g., create a custom event to pass the data to a parent component.
        this.dispatchEvent(new CustomEvent('submit', { detail: fields }));
    }
}
