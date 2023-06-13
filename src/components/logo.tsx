import LogoImage from '../assets/images/logo-gradient.png';

export default function Logo() {
  return (
    <div className="flex gap-3 items-center text-3xl text-wild-blue-light-shade font-medium">
      <img src={LogoImage} alt="Wallet" className="w-12 h-12" />
      Кошелёк
    </div>
  );
}