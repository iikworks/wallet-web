import AuthLayout from "../../components/layouts/auth";
import SignUpForm from "../../components/auth/sign-up-form";
import {Link} from "react-router-dom";

export default function SignUp(): JSX.Element {
  return (
    <AuthLayout>
      <div className="pt-2 text-center leading-5">
        Создайте новый аккаунт, чтобы начать пользователься Кошельком.
      </div>
      <SignUpForm />
      <div className="mt-2">
        Уже есть аккаунт? <Link to="/login" className="text-blue-500 hover:text-blue-600 transition">Войти</Link>
      </div>
    </AuthLayout>
  )
}
