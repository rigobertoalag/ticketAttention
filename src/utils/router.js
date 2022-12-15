import { createBrowserRouter } from "react-router-dom";

import Home from '../components/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Home />
    },
]);

export default router