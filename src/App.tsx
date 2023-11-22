import { useRoutes } from "react-router-dom";
import { IRoute, Routes } from "./routes/routes";
import ProtectedLayout from "./components/ProtectedLayout";

const routeCreator = (routes: IRoute[]): IRoute[] => {
  if (!routes) return [];
  return routes.map((route) => ({
    ...route,
    ...(route?.element && {
      element: (
        <ProtectedLayout authorizedRoles={route.authorizedRoles}>
          {route.element}
        </ProtectedLayout>
      ),
    }),
    children: (route?.children && routeCreator(route.children)) as undefined,
  }));
};

function App() {
  const routes = useRoutes([...routeCreator(Routes)]);

  return (
    <div
      className="bg-dark-800 flex
      w-[100%] min-h-screen justify-center p-6"
    >
      <div className="lg:max-w-[1024px] w-[100%] min-h-[100%]">{routes}</div>
    </div>
  );
}

export default App;
