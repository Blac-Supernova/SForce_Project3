import { LightningElement, wire } from 'lwc';
import getProperties from '@salesforce/apex/PropertyController.getProperties';
import { NavigationMixin } from 'lightning/navigation';
import isGuest from '@salesforce/user/isGuest';


export default class PropertyListView extends NavigationMixin(LightningElement) {
    @wire(getProperties)
    properties;

    
    navToResidencePage(e) {

        // the name Residence_Viewer__c needs to correspond with
        // the api name of the page made in experience builder
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Property_View__c',
            },
            state: {
                c__propertyId: e.target.dataset.id
            }
        });
    }
}