import {createBrowserRouter} from "react-router-dom";
import Dashboard from "../routes/dashboard.tsx";
import SignIn from "../routes/auth/sign-in.tsx";
import SignUp from "../routes/auth/sign-up.tsx";
import Root from "../routes/root.tsx";
import TransactionsList from "../routes/transactions/list.tsx";
import SubscriptionsList from "../routes/subscriptions/list.tsx";
import AccountsList from "../routes/accounts/list.tsx";
import TransactionsAdd from "../routes/transactions/add.tsx";
import OrganizationsAdd from "../routes/organizations/add.tsx";
import OrganizationsList from "../routes/organizations/list.tsx";
import OrganizationsEdit from "../routes/organizations/edit.tsx";
import BanksList from "../routes/banks/list.tsx";
import BanksAdd from "../routes/banks/add.tsx";
import BanksEdit from "../routes/banks/edit.tsx";
import SubscriptionsAdd from "../routes/subscriptions/add.tsx";
import AccountsAdd from "../routes/accounts/add.tsx";

export const publicRouter = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  }, {
    path: "/register",
    element: <SignUp />,
  },
]);

const privateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  }, {
    path: "/transactions",
    element: <TransactionsList />,
  }, {
    path: "/transactions/add",
    element: <TransactionsAdd />,
  }, {
    path: "/subscriptions",
    element: <SubscriptionsList />,
  }, {
    path: "/subscriptions/add",
    element: <SubscriptionsAdd />,
  }, {
    path: "/accounts",
    element: <AccountsList />,
  }, {
    path: "/accounts/add",
    element: <AccountsAdd />,
  },
];

export const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: privateRoutes
  },
]);

export const privateAdminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      ...privateRoutes,
      {
        path: "/organizations",
        element: <OrganizationsList />,
      }, {
        path: "/organizations/add",
        element: <OrganizationsAdd />,
      }, {
        path: "/organizations/:id",
        element: <OrganizationsEdit />,
      }, {
        path: "/banks",
        element: <BanksList />,
      }, {
        path: "/banks/add",
        element: <BanksAdd />,
      }, {
        path: "/banks/:id",
        element: <BanksEdit />,
      },
    ]
  },
]);
