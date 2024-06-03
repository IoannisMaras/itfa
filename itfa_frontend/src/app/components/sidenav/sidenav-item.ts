import { sidenavItemsInterface } from '../../interfaces/sidenav-items';

export const sidenavItems : sidenavItemsInterface[] = [
    {
        routerLink: "dashboard",
        routerLinkActiveOptions: { exact: true },
        label: "Dashboard",
        title: "Dashboard",
        fontIcon: "dashboard",
        visibility: true,
    },
    {
        routerLink: "personal-details",
        routerLinkActiveOptions: { exact: true },
        label: "Personal Details",
        title: "Personal Details",
        fontIcon: "person",
        visibility: true,
    },
    {
        routerLink: "do not match",
        routerLinkActiveOptions: { exact: true },
        label: "Additional Info",
        title: "Additional Info",
        fontIcon: "info",
        visibility: true,
        items:[
            
            {
                routerLink: "additional-info/dependents",
                routerLinkActiveOptions: {},
                label: "Dependents",
                title: "Dependents",
                fontIcon: "family_restroom",
                visibility: true,
            },
            {
                routerLink: "additional-info/employees",
                routerLinkActiveOptions: {},
                label: "Employees",
                title: "Employees",
                fontIcon: "engineering",
                visibility: true,
            },
            {
                routerLink: "additional-info/real-estate",
                routerLinkActiveOptions: {},
                label: "Real Estate",
                title: "Real Estate",
                fontIcon: "house",
                visibility: true,
            },
            {
                routerLink: "additional-info/vehicles",
                routerLinkActiveOptions: {},
                label: "Vehicles",
                title: "Vehicles",
                fontIcon: "directions_car",
                visibility: true,
            },
          
        ]    

    }

]