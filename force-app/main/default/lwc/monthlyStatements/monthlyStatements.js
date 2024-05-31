import { LightningElement, api, wire } from 'lwc';
import getMonthlyStatementsByUserId from '@salesforce/apex/MonthlyStatementsController.getMonthlyStatementsByUserId';
import isGuest from '@salesforce/user/isGuest';
import Id from '@salesforce/user/Id';

export default class MonthlyStatements extends LightningElement {
    @api recordId;
    loggedIn = false;
    monthlyStatements;
    error;
    usersId = Id;

    @wire(getMonthlyStatementsByUserId, {userId: Id})
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