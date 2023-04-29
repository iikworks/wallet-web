import PhoneInput from "../inputs/phone-input";
import TextInput from "../inputs/text-input";
import PasswordInput from "../inputs/password-input";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import Button from "../buttons/button.tsx";

type SignUpFormParams = {
  phone: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
}

type SignUpFormErrors = {
  phone: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
}

export default function SignUpForm() {
  const {store} = useContext(Context);
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpFormParams>({
    phone: "+375 ",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  })
  const [errors, setErrors] = useState<SignUpFormErrors>({
    phone: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  })
  const [loading, setLoading] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: SignUpFormParams) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password != form.password_confirmation) {
      setErrors({
        phone: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: 'Неверно повторён пароль.',
      })
      return;
    }

    setLoading(true);

    store.register({
      phone: form.phone,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password,
    }).then(() => {
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
          first_name: '',
          last_name: '',
          password: '',
          password_confirmation: '',
        })
        return;
      }

      setErrors({
        phone: 'Произошла какая-то ошибка. Попробуйте позже.',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
      })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-2" method="POST">
      <PhoneInput name="phone"
                  title="Номер телефона"
                  onChange={handleChange}
                  value={form.phone}
                  required={true}
                  error={errors.phone}
                  autoFocus={true} />
      <TextInput name="first_name"
                 title="Имя"
                 type="text"
                 placeholder="Иван"
                 value={form.first_name}
                 onChange={handleChange}
                 error={errors.first_name}
                 required={true} />
      <TextInput name="last_name"
                 title="Фамилия"
                 type="text"
                 placeholder="Иванов"
                 value={form.last_name}
                 error={errors.last_name}
                 onChange={handleChange}
                 required={true} />
      <PasswordInput name="password"
                     title="Пароль"
                     onChange={handleChange}
                     value={form.password}
                     error={errors.password}
                     required={true} />
      <PasswordInput name="password_confirmation"
                     title="Подтверждение пароля"
                     value={form.password_confirmation}
                     onChange={handleChange}
                     error={errors.password_confirmation}
                     required={true} />
      <div>
        <Button title="Зарегистрироваться"
                loading={loading}
                classes="mt-4" />
      </div>
    </form>
  );
}