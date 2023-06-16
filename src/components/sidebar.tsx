import {SidebarMenu} from "../models/sidebar/menu.ts";
import {
  ArrowSmallLeftIcon, ArrowSmallRightIcon, BuildingLibraryIcon, BuildingOffice2Icon,
  ChartBarSquareIcon,
  CreditCardIcon,
  QrCodeIcon,
  WalletIcon
} from "@heroicons/react/24/outline";
import {useContext, useEffect, useState} from "react";
import {Link, matchPath, useLocation} from "react-router-dom";
import {Context} from "../main.tsx";
import {currencyFormat} from "../functions.ts";

export default function Sidebar(): JSX.Element {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const { store } = useContext(Context);

  const menu: SidebarMenu[] = [
    {
      icon: <ChartBarSquareIcon className="h-5 w-5" />,
      title: 'Главная',
      link: '/',
      activePaths: ['/'],
    }, {
      icon: <QrCodeIcon className="h-5 w-5" />,
      title: 'Транзакции',
      link: '/transactions',
      activePaths: ['/transactions', '/transactions/add']
    }, {
      icon: <WalletIcon className="h-5 w-5" />,
      title: 'Счета',
      link: '/accounts',
      activePaths: ['/accounts', '/accounts/add']
    },
    {
      icon: <CreditCardIcon className="h-5 w-5" />,
      title: 'Подписки',
      link: '/subscriptions',
      activePaths: ['/subscriptions', '/subscriptions/add']
    },
  ];

  const adminMenu: SidebarMenu[] = [
    {
      icon: <BuildingOffice2Icon className="h-5 w-5" />,
      title: 'Организации',
      link: '/organizations',
      activePaths: ['/organizations', '/organizations/add']
    }, {
      icon: <BuildingLibraryIcon className="h-5 w-5" />,
      title: 'Банки',
      link: '/banks',
      activePaths: ['/banks', '/banks/add']
    },
  ];

  const isActive = (activePaths: string[]) => {
    for (const activePath of activePaths) {
      if (matchPath(activePath, location.pathname)) return true;
    }
    return false;
  }

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth)

      if (opened && windowWidth < 920) setOpened(false);
    }
    window.addEventListener('resize', updateWindowWidth);

    return(() => {
      window.removeEventListener('resize', updateWindowWidth);
    })
  }, [opened, windowWidth])

  return (
    <>
      <nav className={`flex flex-col justify-between bg-white ${opened ? 'w-72' : 'w-16 sm:w-24'} h-max min-h-screen transition-all`}>
        <div className="space-y-3 px-2 v sm:px-5 py-4">
          {store.user &&<div className={`flex gap-3 ${opened ? 'items-center' : 'justify-center'} overflow-hidden`}>
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            {opened &&<div>
              <div className="font-medium whitespace-nowrap">{`${store.user.first_name} ${store.user.last_name}`}</div>
              <div className="leading-3 text-gray-600 font-medium whitespace-nowrap">
                {currencyFormat(store.user.currency, store.user.balance)}
              </div>
            </div>}
          </div>}
          <div className="h-0.5 bg-gray-200 rounded-xl"></div>
          <div className="space-y-2 overflow-y-auto">
            {menu.map(element => {
              return (
                <Link key={element.link} to={element.link} onClick={() => setOpened(false)}
                      className={`flex items-center ${opened ? '' : 'justify-center'} whitespace-nowrap h-10 font-medium gap-2 w-full rounded-md px-4 border border-gray-200 ${isActive(element.activePaths) ? 'bg-gray-200' : 'transition hover:bg-gray-200'}`}>
                  {element.icon}
                  {opened ? element.title : ''}
                </Link>
              );
            })}
            {store.user.is_admin &&<div className="space-y-2 pt-3">
              {adminMenu.map(element => {
                return (
                  <Link key={element.link} to={element.link} onClick={() => setOpened(false)}
                        className={`flex items-center ${opened ? '' : 'justify-center'} whitespace-nowrap h-10 font-medium gap-2 w-full rounded-md px-4 border border-gray-200 ${isActive(element.activePaths) ? 'bg-gray-200' : 'transition hover:bg-gray-200'}`}>
                    {element.icon}
                    {opened ? element.title : ''}
                  </Link>
                );
              })}
            </div>}
          </div>
        </div>
        <div className="px-5 pb-5">
          {opened &&<div className="text-center whitespace-nowrap mb-4 font-extralight">
              © 2023, <span className="font-medium">Наликбай</span>
          </div>}
          <button onClick={() => setOpened(!opened)} className={`flex ${opened ? 'items-center' : 'justify-center'} font-medium gap-2 w-full rounded-md py-2 px-4 hover:bg-gray-200 border border-gray-200 transition`}>
            {opened &&<ArrowSmallLeftIcon className="h-5 w-5" />}
            {!opened &&<ArrowSmallRightIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </>
  );
}