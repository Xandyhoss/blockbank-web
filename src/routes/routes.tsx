import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Panel from "../pages/Panel";
import ManagersManagement from "../pages/ManagersManagement";
import HoldersManagement from "../pages/HoldersManagement";
import HolderCreate from "../pages/HolderCreate";
import ManagerCreate from "../pages/ManagerCreate";
import CreditCard from "../pages/CreditCard";
import CreditCardCreate from "../pages/CreditCardCreate";
import MakeDeposit from "../pages/MakeDeposit";
import MakeWithdrawal from "../pages/MakeWithdrawal";
import CreateTransferency from "../pages/CreateTransferency";
import CreateCreditCardPurchase from "../pages/CreateCreditCardPurchase";

export type IRoute = RouteObject & {
  authorizedRoles?: string[];
  children?: IRoute[];
  name: string;
  hidden?: boolean;
};

export const Routes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    children: [
      {
        index: true,
        name: "Home",
        element: <Panel />,
        authorizedRoles: ["holder", "manager"],
      },
      {
        path: "/deposit",
        name: "Deposit",
        element: <MakeDeposit />,
        hidden: true,
        authorizedRoles: ["holder"],
      },
      {
        path: "/transferency",
        name: "Trasnferency",
        element: <CreateTransferency />,
        hidden: true,
        authorizedRoles: ["holder"],
      },
      {
        path: "/withdrawal",
        name: "Withdrawal",
        element: <MakeWithdrawal />,
        hidden: true,
        authorizedRoles: ["holder"],
      },
      {
        path: "/creditCard",
        name: "Credit Card",
        authorizedRoles: ["holder"],
        children: [
          {
            index: true,
            name: "Credit Card",
            element: <CreditCard />,
            authorizedRoles: ["holder"],
          },
          {
            path: "create",
            name: "Create Manager",
            element: <CreditCardCreate />,
            authorizedRoles: ["holder"],
          },
          {
            path: "create-purchase",
            name: "Create Purchase",
            element: <CreateCreditCardPurchase />,
            authorizedRoles: ["holder"],
          },
        ],
      },
      {
        name: "Managers",
        path: "/managers",
        authorizedRoles: ["manager"],
        children: [
          {
            index: true,
            name: "Managers",
            element: <ManagersManagement />,
            authorizedRoles: ["manager"],
          },
          {
            path: "create",
            name: "Create Manager",
            element: <ManagerCreate />,
            authorizedRoles: ["manager"],
          },
        ],
      },
      {
        name: "Holders",
        path: "/holders",
        authorizedRoles: ["manager"],
        children: [
          {
            index: true,
            name: "Holders",
            element: <HoldersManagement />,
            authorizedRoles: ["manager"],
          },
          {
            path: "create",
            name: "Create Holder",
            element: <HolderCreate />,
            authorizedRoles: ["manager"],
          },
        ],
      },
    ] as IRoute[],
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
];
