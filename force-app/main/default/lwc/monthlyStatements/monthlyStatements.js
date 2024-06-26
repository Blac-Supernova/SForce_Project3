import { LightningElement, api, wire, track } from 'lwc';
import getMonthlyStatementsByUserId from '@salesforce/apex/MonthlyStatementsController.getMonthlyStatementsByUserId';
import isGuest from '@salesforce/user/isGuest';
import Id from '@salesforce/user/Id';

const columns = [
    {label: 'Id', fieldName: 'Name'},
    {label: 'Monthly Amount', fieldName: 'Monthly_Amount__c', type: 'currency', cellAttributes: {alignment: 'left'}}
];

export default class MonthlyStatements extends LightningElement {
    @api recordId;
    loggedIn = !isGuest;
    monthlyStatements;
    error;
    usersId = Id;

    columns = columns;

    @wire(getMonthlyStatementsByUserId, {userId: '$usersId'})
    wiredStatements({error, data}) {
        if (data) {
            this.monthlyStatements = data;
            this.loggedIn = (!isGuest && this.monthlyStatements.length > 0);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.monthlyStatements = undefined;
        }
    }
}