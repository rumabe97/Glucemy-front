import {
    faAddressCard,
    faCalculator,
    faCalendar,
    faChartLine,
    faHouse,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export const navConfig = [
    {
        name: 'Home',
        path: '/',
        activePath: 'home',
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
        name: 'Statistics',
        path: '/statistics',
        activePath: 'statistics',
        icon: faChartLine,
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
        name: 'Statistics',
        path: '/statistics',
        icon: faChartLine,
    },
    {
        name: 'Logout',
        icon: faRightFromBracket
    }
];