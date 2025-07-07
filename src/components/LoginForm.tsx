import { Button, HelperText, Label, TextInput } from "flowbite-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect, useRef} from "react";
import type {LoginFields, LoginFormErrors, userDetails} from "../types/types.ts";
import useAuth from "../hooks/useAuth.ts";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {

  const { loginUser, userDetails } = useAuth();

  const [values, setValues] = useState<LoginFields>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState(false); // TODO disable form button on submitting

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || userDetails?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO Improve Error handling and navigation
    try {
      const data: userDetails = await loginUser(values);

      if (data?.role === 'admin') {
        if (from) {
          navigate(from, { replace: true })
        } else {
          navigate(import.meta.env.VITE_API_URL + '/admin-dashboard')
        }
      } else if (data?.role === 'user') {
        if (from) {
          navigate(from, { replace: true })
        } else {
          navigate(import.meta.env.VITE_API_URL + '/user-dashboard')
        }
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Login failed");
    }

    setValues(initialValues);      // After submission, clear values
    setErrors(null);        // clear errors
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };


  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
      <section className="container flex flex-col items-center justify-center pt-9 mx-auto mt-10">
        <h1 className="text-5xl py-6 font-bold bg-gradient-to-br from-cyan-500 to-blue-600 inline-block text-transparent bg-clip-text">Great Seeing you Back!</h1>
        <hr className="w-[50%] mb-6 border-t border-gray-300" />
        <form onSubmit={handleSubmit} className="flex min-w-xs max-w-sm flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="login-email">Your email:</Label>
            </div>
            <TextInput
              ref={inputRef}
              id="login-email"
              name="email"
              value={values.email}
              type="text"
              onChange={handleChange}
              placeholder="name@myreserva.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="login-password">Your password:</Label>
            </div>
            <TextInput
              id="login-password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          {errors && Object.keys(errors).length > 0 && (
            <HelperText className="text-center">
              <span className="text-red-700">Oops! Invalid username or password.</span>
            </HelperText>
          )}
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