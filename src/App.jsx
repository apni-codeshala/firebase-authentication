import { Provider } from "react-redux";
import Body from "./components/Body";

import appStore from "./utils/appStore";
import Login from "./components/Login";
import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Setting from "./components/Setting";

export default function App() {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Body />,
            children: [
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/home',
                    element: <Home />,
                    children: [
                        {
                            path: '/home',
                            element: <HomePage />
                        },
                        {
                            path: 'dashboard',
                            element: <Dashboard />
                        },
                        {
                            path: 'setting',
                            element: <Setting />
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <>
            <Provider store={appStore} >
                <RouterProvider router={appRouter} >
                    <Body />
                </RouterProvider>
            </Provider>
        </>
    )
}