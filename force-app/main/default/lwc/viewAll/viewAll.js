import { LightningElement, track } from 'lwc';

export default class AccountList extends LightningElement {
  @track accounts = [];
  @track columns = [
    { fieldname: 'Name', label: 'Account Name' },
    { fieldname: 'Rating', label: 'Rating' },
    { fieldname: 'Newbie', label: 'Newbie' },
  ];

  connectedCallback() {
    this.getAccounts();
  }

  getAccounts() {
    // Get all hot rated accounts from Salesforce
    const query = `SELECT Id, Name, Rating, Newbie FROM Account WHERE Rating = 'Hot'`;
    const accounts = this.query(query);

    this.accounts = accounts;
  }

  handleSearch(event) {
    const searchTerm = event.target.value;

    // Filter the accounts by search term
    this.accounts = this.accounts.filter(account => account.Name.includes(searchTerm));
  }

  handleRowSelection(event) {
    // Get the selected account
    const selectedAccount = event.detail.selectedRows[0];

    // End data of Account Object 
    // Retrieve other data Add new column
  }
}