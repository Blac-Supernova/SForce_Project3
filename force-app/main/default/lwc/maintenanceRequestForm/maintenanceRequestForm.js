import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import isUserRentingProperty from '@salesforce/apex/CaseController.isUserRentingProperty'
import getPropertyId from '@salesforce/apex/ContactController.getPropertyId';

import CONTACT_ID from "@salesforce/schema/User.ContactId";
import USER_ID from "@salesforce/user/Id";
import REASON_FIELD from '@salesforce/schema/Case.Reason';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';
import CASE_OBJECT from "@salesforce/schema/Case";

export default class MaintenanceRequestForm extends LightningElement {

    // Expose fields to make it available in the template
    reasonField = REASON_FIELD;
    subjectField = SUBJECT_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    // Success/Error messages
    @api messageBackground;
    @api messageTitle;
    @api messageBody;

    @api contactId;
    @api propertyId;
    @api maintenanceRecordTypeId;

    // Gets current user's contact id
    @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] })
    getContactId({ error, data }) {
        if(data) {
            this.contactId = getFieldValue(data, CONTACT_ID);
            console.log(this.contactId);

            // Get's property id where user is staying at
            getPropertyId({contactId: this.contactId})
            .then(result => {
                this.propertyId = result;
            }).
            catch(error => {
                console.log('Error: ' + JSON.stringify(error));
            });
            
        }
    }

    // Sets Maintenance record type for lightning-record-edit-form
    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    getMaintenanceRecordTypeId({error,data}){
       if(data){
        let recordTypes  = data.recordTypeInfos;
        for (let i in recordTypes){
            if(recordTypes[i].name =="Maintenance")
            this.maintenanceRecordTypeId = recordTypes[i].recordTypeId;
        }
       }else if(error){
        console.log(JSON.stringify(error));
           // perform your logic related to error 
        }
     };

    // When user clicks on submit button
    async handleSubmit(event)
    {
        // do this so that you can modify the form values
        event.preventDefault(); 
        let fields = event.detail.fields; 
        // Adds contact Id to maintenance request
        fields.ContactId = this.contactId;
        console.log(this.propertyId);
        let isUserRentingProp = await isUserRentingProperty({contactId: this.contactId, propertyId: this.propertyId });
        
        // Makes sure user requesting maintenance is currently renting the property
        if(isUserRentingProp) {
            // need to submit form again because we have fired preventDefault before
            this.template.querySelector('lightning-record-edit-form').submit(fields); 
        } else {
            this.messageBackground = 'slds-grid slds-grid_vertical slds-p-vertical_medium slds-m-bottom_medium slds-theme_error';
            this.messageTitle = 'Error!';
            this.messageBody = 'User is not currently staying at this property';
        }
        
        
    }

    // When lightning-record-edit-form could submit request
    handleSuccess(event)
    {
        this.template.querySelectorAll('lightning-input-field').forEach(field => field.reset());
        this.messageBackground = 'slds-grid slds-grid_vertical slds-p-vertical_medium slds-m-bottom_medium slds-theme_success';
        this.messageTitle = 'Maintenance Requested!';
        this.messageBody = 'We received your request and it is being processed. We will contact you as soon as possible.';
    }

}