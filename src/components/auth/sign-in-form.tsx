import PhoneInput from "../inputs/phone-input";
import PasswordInput from "../inputs/password-input";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import Button from "../buttons/button.tsx";

type SignInFormParams = {
  phone: string;
  password: string;
}

type SignInFormErrors = {
  phone: string;
  password: string;
}

export default function SignInForm() {
  const {store} = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState<SignInFormParams>({
    phone: "+375 ",
    password: "",
  })
  const [errors, setErrors] = useState<SignInFormErrors>({
    phone: "",
    password: "",
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: SignInFormParams) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    store.login(form.phone, form.password).then(() => {
      navigate("/");
    }).catch(e => {
      setLoading(false);
      if (e.response?.data?.errors) {
        setErrors(e.response.data.errors);
        return;
      }
      else if(e.response?.data?.message) {
        setErrors({
          phone: e.response.data.message,
          password: '',
        })
        return;
      }

      setErrors({
        phone: 'Произошла какая-то ошибка. Попробуйте позже.',
        password: '',
      })
    })
  }

  return (
    <form className="mt-5 space-y-1" onSubmit={handleSubmit} method="POST">
      <PhoneInput name="phone"
                  onChange={handleChange}
                  value={form.phone}
                  error={errors.phone}
                  required={true}
                  autoFocus={true} />
      <PasswordInput name="password"
                     onChange={handleChange}
                     value={form.password}
                     error={errors.password}
                     required={true} />
      <div>
        <Button title="Войти"
                loading={loading}
                classes="mt-4" />
      </div>
    </form>
  );
}