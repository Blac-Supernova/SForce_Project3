import { LightningElement, api, wire } from 'lwc';
import getMonthlyStatementsByUserId from '@salesforce/apex/MonthlyStatementsController.getMonthlyStatementsByUserId';
import isGuest from '@salesforce/user/isGuest';
import Id from '@salesforce/user/Id';

const columns = [
    {label: 'Id', fieldName: 'Name'},
    {label: 'Monthly Amount', fieldName: 'Monthly_Amount__c', type: 'currency', cellAttributes: {alignment: 'left'}}
];

export default class MonthlyStatements extends LightningElement {
    @api recordId;
    monthlyStatements;
    error;
	loggedIn = !isGuest;
    usersId = Id;

    columns = columns;

    @wire(getMonthlyStatementsByUserId, {userId: '$usersId'})
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