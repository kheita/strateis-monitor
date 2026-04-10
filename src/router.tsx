import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { DashboardPage } from "./pages/DashboardPage";
import { FeedsPage } from "./pages/FeedsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ConsultingPage } from "./pages/ConsultingPage";
import { OperationsPage } from "./pages/OperationsPage";
import { ContentPage } from "./pages/ContentPage";
import { FrameworksPage } from "./pages/FrameworksPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "feeds", element: <FeedsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "consulting", element: <ConsultingPage /> },
      { path: "ops", element: <OperationsPage /> },
      { path: "content", element: <ContentPage /> },
      { path: "frameworks", element: <FrameworksPage /> },
    ],
  },
]);
