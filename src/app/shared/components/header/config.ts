import {faAddressCard, faCalculator, faCalendar, faHouse, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export const navConfig = [
    {
        name: 'Home',
        path: '/',
        activePath:'home',
        icon: faHouse,
    },
    {
        name: 'Profile',
        path: '/profile',
        activePath: 'profile',
        icon: faAddressCard,
    },
    {
        name: 'Records',
        path: '/records',
        activePath: 'records',
        icon: faCalendar,
    },
    {
        name: 'Calculator',
        path: '/calculator',
        activePath: 'profile',
        icon: faCalculator,
    },
    {
        name: 'Logout',
        activePath: 'logout',
        icon: faRightFromBracket
    }
];

export const homeConfig = [
    {
        name: 'Profile',
        path: '/profile',
        icon: faAddressCard,
    },
    {
        name: 'Records',
        path: '/records',
        icon: faCalendar,
    },
    {
        name: 'Calculator',
        path: '/calculator',
        icon: faCalculator,
    },
    {
        name: 'Logout',
        icon: faRightFromBracket
    }
];