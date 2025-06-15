import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router";
import {useEffect, useRef, useState} from "react";

const RegisterForm = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState(true);

  const handleCheck = () => {
    setChecked(!checked);
  }

  useEffect(() => {
    inputRef.current?.focus();
  })

  return (
    <section className="container flex flex-col items-center justify-center pt-15 mx-auto mt-10">
      <h1 className="text-8xl mb-10 font-extrabold text-gray-900">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
        >Sign In</span>
      </h1>
      <hr className="w-[50%] mb-6 border-t border-gray-300" />
      <form className="flex min-w-sm max-w-md flex-col gap-3">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Your name:</Label>
          </div>
          <TextInput
            ref={inputRef}
            id="name"
            type="text"
            placeholder="Name"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="surname">Your surname:</Label>
          </div>
          <TextInput
            id="surname"
            type="text"
            placeholder="Surname"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2">Your email:</Label>
          </div>
          <TextInput
            id="email2"
            type="email"
            placeholder="name@myreserva.com"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone">Your phone number:</Label>
          </div>
          <TextInput
            ref={inputRef}
            id="phone"
            type="tel"
            placeholder="Phone number"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2">Your password:</Label>
          </div>
          <TextInput id="password2" type="password" placeholder="********" required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password">Confirm password:</Label>
          </div>
          <TextInput id="repeat-password" type="password" placeholder="********" required shadow />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="agree"
            onChange={handleCheck}
          />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">terms and conditions</a>
            {/*<Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">*/}
            {/*  terms and conditions*/}
            {/*</Link>*/}
          </Label>
        </div>
        <Button
          disabled={checked}
          type="submit"
        >Register new account</Button>
      </form>
      <div className="flex flex-col items-center min-w-sm max-w-md mt-6">
        <p className="text-sm">Already have an account?</p>
        <Button color="dark" className="w-full mt-1" ><Link className="block w-full" to="/login">Log In</Link></Button>
      </div>

    </section>

  );
}

export default RegisterForm;