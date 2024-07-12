import { Dashboard, Login } from "../pages"

export const appRoutes = [
    {
        id: 1,
        path: '/',
        component: Login
    },
    {
        id: 2,
        path: '/dashboard',
        component: Dashboard
    }
]