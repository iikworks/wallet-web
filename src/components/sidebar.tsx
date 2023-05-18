import {SidebarMenu} from "../models/sidebar/menu.ts";
import {
  ArrowRightOnRectangleIcon,
  ArrowSmallLeftIcon, ArrowSmallRightIcon, BuildingLibraryIcon, BuildingOffice2Icon,
  ChartBarSquareIcon,
  CreditCardIcon,
  QrCodeIcon,
  WalletIcon
} from "@heroicons/react/24/outline";
import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../main.tsx";
import {currencyFormat} from "../functions.ts";
import LogoImage from "../assets/images/logo-gradient.png";

export default function Sidebar(): JSX.Element {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [opened, setOpened] = useState(window.innerWidth >= 920);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const menu: SidebarMenu[] = [
    {
      icon: <ChartBarSquareIcon className="h-5 w-5" />,
      title: 'Главная',
      link: '/',
    }, {
      icon: <QrCodeIcon className="h-5 w-5" />,
      title: 'Транзакции',
      link: '/transactions',
    }, {
      icon: <WalletIcon className="h-5 w-5" />,
      title: 'Счета',
      link: '/accounts',
    },
    {
      icon: <CreditCardIcon className="h-5 w-5" />,
      title: 'Подписки',
      link: '/subscriptions',
    },
  ];

  const adminMenu: SidebarMenu[] = [
    {
      icon: <BuildingOffice2Icon className="h-5 w-5" />,
      title: 'Организации',
      link: '/organizations',
    }, {
      icon: <BuildingLibraryIcon className="h-5 w-5" />,
      title: 'Банки',
      link: '/banks',
    },
  ];

  const handleLogout = async () => {
    await store.logout();
    navigate('/login');
  }

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth)

      if (opened && windowWidth < 920) setOpened(false);
      if (!opened && windowWidth >= 920) setOpened(true);
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
            <img src={LogoImage} className="h-12 w-12" alt="Wallet" />
            {opened &&<div>
              <div className="font-medium whitespace-nowrap">{`${store.user.first_name} ${store.user.last_name}`}</div>
              <div className="leading-3 text-gray-600 font-medium whitespace-nowrap">
                {currencyFormat(store.user.currency, store.user.balance)}
              </div>
            </div>}
          </div>}
          <button
            onClick={handleLogout}
            className={`flex items-center ${opened ? '' : 'justify-center'} whitespace-nowrap h-10 font-medium gap-2 w-full bg-orange-500 dark:bg-orange-700 bg-opacity-50 dark:bg-opacity-20 hover:bg-opacity-70 dark:hover:bg-opacity-30 text-red-800 dark:text-red-500 rounded-md px-4 transition`}>
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            {opened ? 'Выйти' : ''}
          </button>
          <div className="h-0.5 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="space-y-2 overflow-y-auto">
            {menu.map(element => {
              return (
                <Link key={element.link} to={element.link}
                      className={`flex items-center ${opened ? '' : 'justify-center'} whitespace-nowrap h-10 font-medium gap-2 w-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md px-4 hover:bg-gray-300 transition`}>
                  {element.icon}
                  {opened ? element.title : ''}
                </Link>
              );
            })}
            {store.user.is_admin &&<div className="space-y-2 pt-3">
              {adminMenu.map(element => {
                return (
                  <Link key={element.link} to={element.link}
                        className={`flex items-center ${opened ? '' : 'justify-center'} whitespace-nowrap h-10 font-medium gap-2 w-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md px-4 hover:bg-gray-300 transition`}>
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
          <button onClick={() => setOpened(!opened)} className={`flex ${opened ? 'items-center' : 'justify-center'} font-medium gap-2 w-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md py-2 px-4 hover:bg-gray-300 transition`}>
            {opened &&<ArrowSmallLeftIcon className="h-5 w-5" />}
            {!opened &&<ArrowSmallRightIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </>
  );
}