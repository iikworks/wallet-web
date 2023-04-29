import LogoImage from '../assets/images/logo.png';

export default function Logo() {
  return (
    <div className="flex gap-3 items-center text-3xl text-gray-700 font-medium">
      <img src={LogoImage} alt="Wallet" className="w-12 h-12" />
      Кошелёк
    </div>
  );
}