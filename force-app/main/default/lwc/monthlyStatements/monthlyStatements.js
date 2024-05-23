import { LightningElement, api, wire } from 'lwc';
import getMonthlyStatementsByContactId from '@salesforce/apex/MonthlyStatementsController.getMonthlyStatementsByContactId';
import isGuest from '@salesforce/user/isGuest';

const columns = [
    {label: 'Id', fieldName: 'Name'},
    {label: 'Monthly Amount', fieldName: 'Monthly_Amount__c', type: 'currency', cellAttributes: {alignment: 'left'}}
];

export default class MonthlyStatements extends LightningElement {
    @api recordId;
    monthlyStatements;
    error;
	loggedIn = !isGuest;

    columns = columns;

    @wire(getMonthlyStatementsByContactId, {contactId: '003aj000002DxPJAA0'})
    wiredStatements({error, data}) {
        if (data) {
            this.monthlyStatements = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.monthlyStatements = undefined;
        }
    }
}