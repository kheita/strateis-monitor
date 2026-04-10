import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { DashboardPage } from "./pages/DashboardPage";
import { FeedsPage } from "./pages/FeedsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "feeds", element: <FeedsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
    ],
  },
]);
