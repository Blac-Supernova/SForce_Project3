import { LightningElement, wire, track } from 'lwc';
import GeniePropLogo from '@salesforce/resourceUrl/genielogo';
// import isUserLoggedin from '@salesforce/apex/sessionHelper.isUserLoggedIn';
import isGuest from '@salesforce/user/isGuest'
import basePath from "@salesforce/community/basePath";



export default class Project3Header extends LightningElement {
    companyLogo = GeniePropLogo;
    isNotGuest = !isGuest;


    get logoutUrl() {
        const sitePrefix = basePath.replace(
            /\/s$/i, ""
        );
        return sitePrefix + "/secur/logout.jsp";
    }

   //hard code
    //isLoggedin = false;

    //Attempt #2
    // @track isLoggedIn = false;

    // connectedCallback() {
    //     this.checkUserLoginStatus();
    // }


    // async checkUserLoginStatus() {
    //     try {
    //         const sessionId = await isUserLoggedin();
    //         console.log('sessionId', sessionId);
    //         this.isLoggedIn = sessionId ? true : false;
    //         console.log('isLoggedIn', this.isLoggedIn);
    //     }
    //     catch (error) {
    //         console.error('Error checking login status', error);
    //         this.isLoggedIn = false;
    //     }
    // }


    // handleClick() {
    //     if (this.isLoggedIn) {
    //         this.logoutUser();
    //     } else {
    //         this.redirectToLogin();
    //     }
    // }


    // logoutUser() {
    //     window.location.href = '/secur/logout.jsp';
    // }

    // redirectToLogin() {
    //     window.location.href = '/login';

    // }

    
}