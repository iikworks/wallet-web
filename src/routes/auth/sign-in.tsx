import AuthLayout from "../../components/layouts/auth";
import SignInForm from "../../components/auth/sign-in-form";
import {Link} from "react-router-dom";

export default function SignIn(): JSX.Element {
  return (
    <AuthLayout>
      <div className="pt-2 text-center leading-5 text-sapling-dark-shade-2">
        Войдите в свой аккаунт, чтобы продолжить.
      </div>
      <SignInForm />
      <div className="mt-2">
        Ещё нет аккаунта? <Link to="/register" className="text-sapling-dark-shade-2 hover:text-sapling-dark-shade-1 transition">Зарегистрироваться</Link>
      </div>
    </AuthLayout>
  )
}
