import AuthLayout from "../../components/layouts/auth";
import SignUpForm from "../../components/auth/sign-up-form";
import {Link} from "react-router-dom";

export default function SignUp(): JSX.Element {
  return (
    <AuthLayout>
      <div className="pt-2 text-center leading-5 text-wild-blue-light-shade">
        Создайте новый аккаунт, чтобы начать пользователься Кошельком.
      </div>
      <SignUpForm />
      <div className="mt-2 text-wild-blue">
        Уже есть аккаунт? <Link to="/login" className="text-indigo-500 hover:text-indigo-700 transition">Войти</Link>
      </div>
    </AuthLayout>
  )
}
