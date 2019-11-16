import Events from './components/Events/Index';
import OtherPage from './components/OtherPage/Index';

export const routes = [
    {
        path:'/',
        component: Events,
        name: 'home'
    },
    {
        path:'/other',
        component: OtherPage,
        name: 'home'
    }
]
