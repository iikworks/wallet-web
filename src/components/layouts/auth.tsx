import Logo from "../logo.tsx";
import {ReactNode} from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-east-bay overflow-y-auto">
      <div className="flex flex-col lg:flex-row mt-5">
        <div className="flex bg-east-bay-dark-shade-1 justify-center w-96 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl py-3 px-7">
          <Logo />
        </div>
        <div className="bg-east-bay-light-shade text-sm w-96 rounded-b-2xl lg:rounded-b-none lg:rounded-r-2xl py-3 pb-6 px-7">
          {props.children}
        </div>
      </div>
    </div>
  );
}