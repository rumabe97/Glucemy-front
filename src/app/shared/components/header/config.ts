import {faCalculator, faCalendar, faHouse, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export const navConfig = [
    {
        name: 'Home',
        path: '/',
        icon: faHouse,
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