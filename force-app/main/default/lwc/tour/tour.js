import { LightningElement, track, wire } from 'lwc';
import getProperties from '@salesforce/apex/PropertyController.getProperties';

export default class Tour extends LightningElement {
    @track properties;
    @track error;

    @wire(getProperties)
    wiredProperties({ error, data }) {
        if (data) {
            this.properties = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.properties = undefined;
        }
    }

    handleViewDetails(event) {
        const propertyId = event.target.dataset.id;
        // Logic to handle viewing details of the property
        console.log('View details for property:', propertyId);
    }
}
