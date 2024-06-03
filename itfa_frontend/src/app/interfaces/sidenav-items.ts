export interface sidenavItemsInterface {
    routerLink: string;
    routerLinkActiveOptions : any;
    label: string;
    title: string;
    fontIcon: string;
    visibility: boolean;
    items? : sidenavItemsInterface[];
}