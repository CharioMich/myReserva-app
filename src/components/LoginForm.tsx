import { Button, Label, TextInput } from "flowbite-react";
import {Link} from "react-router";
import {useEffect, useRef} from "react";

const LoginForm = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  })

  return (
      <section className="container flex flex-col items-center justify-center pt-9 mx-auto mt-10">
        <h1 className="text-5xl py-6 font-bold bg-gradient-to-br from-cyan-500 to-blue-600 inline-block text-transparent bg-clip-text">Great Seeing you Back!</h1>
        <hr className="w-[50%] mb-6 border-t border-gray-300" />
        <form className="flex min-w-xs max-w-sm flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1">Your email:</Label>
            </div>
            <TextInput
              ref={inputRef}
              id="email1"
              type="email"
              placeholder="name@myreserva.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1">Your password:</Label>
            </div>
            <TextInput id="password1" type="password" placeholder="********" required />
          </div>
          {/*<div className="flex items-center gap-2">*/}
          {/*  <Checkbox id="remember" />*/}
          {/*  <Label htmlFor="remember">Remember me</Label>*/}
          {/*</div>*/}
          <Button className="mt-2" type="submit">Log In</Button>
        </form>
        <div className="flex flex-col items-center min-w-xs max-w-sm mt-6">
          <p className="text-sm">Don't have an account?</p>
          <Button color="dark" className="w-full mt-1" ><Link className="block w-full" to="/register">Sign In</Link></Button>
        </div>
      </section>

  );
}

export default LoginForm;