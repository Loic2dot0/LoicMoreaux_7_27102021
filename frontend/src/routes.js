import MainView from './components/Main-view';
import Account from './components/Account';
import ProfileModify from './components/Profilemodify';
import ErrorPage from './components/Error';
import OneView from './components/One-view';
import PostCreate from './components/Post-create';
import PostModify from './components/Post-modify';  

export default [
    {path: '/', component: MainView},
    {path: '/login', component: Account},
    {path: '/profile',  component: ProfileModify},
    {path: '/error/:status', component: ErrorPage},
    {path: '/post/view/:id_post', component: OneView},
    {path: '/post/create', component: PostCreate},
    {path: '/post/modify/:id_post', component: PostModify}
];