import MainView from './components/Main-view';
import Account from './components/Account';
import ErrorPage from './components/Error'; 

export default [
    {path: '/', component: MainView},
    {path: '/login', component: Account},
    {path: '/error/:status', component: ErrorPage}
];