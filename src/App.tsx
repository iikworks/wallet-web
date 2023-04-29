import {FC, StrictMode, useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {RouterProvider} from "react-router-dom";
import {Context} from "./main.tsx";
import {privateAdminRouter, privateRouter, publicRouter} from "./router";
import {AlertProvider} from "./contexts/alert-context.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const App: FC = () => {
  const {store} = useContext(Context)

  useEffect(() => {
    store.CheckAuth()
  }, [])

  return (
    <StrictMode>
      <AlertProvider>
        {store.isAuth && !store.user.is_admin && !store.checkAuthLoading &&<RouterProvider router={privateRouter} />}
        {store.isAuth && store.user.is_admin && !store.checkAuthLoading &&<RouterProvider router={privateAdminRouter} />}
        {!store.isAuth && !store.checkAuthLoading &&<RouterProvider router={publicRouter} />}
      </AlertProvider>
    </StrictMode>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);
