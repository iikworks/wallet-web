import AuthLayout from "../../components/layouts/auth";
import SignInForm from "../../components/auth/sign-in-form";
import {Link} from "react-router-dom";

export default function SignIn(): JSX.Element {
  return (
    <AuthLayout>
      <div className="pt-2 text-center leading-5 text-wild-blue-light-shade">
        Войдите в свой аккаунт, чтобы продолжить.
      </div>
      <SignInForm />
      <div className="mt-2 text-wild-blue">
        Ещё нет аккаунта? <Link to="/register" className="text-indigo-500 hover:text-indigo-700 transition">Зарегистрироваться</Link>
      </div>
    </AuthLayout>
  )
}
