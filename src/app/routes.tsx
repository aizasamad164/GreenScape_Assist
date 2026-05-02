import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Welcome from "./pages/Welcome";
import MyGarden from "./pages/MyGarden";
import PlantDetail from "./pages/PlantDetail";
import Tasks from "./pages/Tasks";
import Journal from "./pages/Journal";
import AddPlant from "./pages/AddPlant";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Welcome },
      { path: "home", Component: MyGarden },
      { path: "plant/:id", Component: PlantDetail },
      { path: "tasks", Component: Tasks },
      { path: "journal", Component: Journal },
      { path: "add-plant", Component: AddPlant },
    ],
  },
]);