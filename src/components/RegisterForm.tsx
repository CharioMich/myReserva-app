import { Button, Checkbox, HelperText, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

// Custom Imports
import type { RegisterFormErrors } from "../types/types.ts";
import registerUser from "../api/register.ts";
import useAuth from "../hooks/useAuth.ts";

// Form schema and validation with Zod
const formSchema = z.object({
  username: z.string()
    .trim()
    .nonempty("Username is required.")
    .min(2, "Username must be at least 2 characters"),
  name: z.string()
    .trim()
    .nonempty("Name is required.")
    .min(2, "Name must be at least 2 characters"),
  surname: z.string()
    .trim()
    .nonempty("Surname is required.")
    .min(2, "Surname must be at least 2 characters"),
  email: z.string()
    .trim()
    .nonempty("Email is required.")
    .email("Email is invalid."),
  phone: z.string()
    .trim()
    .nonempty("Phone number required.")
    .regex(/^\d{10}$/, "Phone must be at least 10 characters"),
  password: z.string()
    .trim()
    .nonempty("Password required.")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, "Password must contain at least one uppercase, one lowercase, one number 0-9, one symbol and no spaces"),
  repeatPassword: z.string()
    .trim()
    .nonempty("Confirm password missing.")
}).refine((data) => data.password === data.repeatPassword, { // validate confirmPassword
  path: ["repeatPassword"],
  message: "Passwords do not match.",
});

export type RegisterFormValues = z.infer<typeof formSchema>;

const initialValues: RegisterFormValues = {
  username: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
  password: "",
  repeatPassword: "",
};

const RegisterForm = () => {

  const { setAccessToken, setUserDetails } = useAuth();

  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<RegisterFormErrors | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState(false); // TODO
  const navigate = useNavigate();

  /**
   * Actual validation using zod's safeParse()
   */
  const validateForm = (): boolean => {
    const result = formSchema.safeParse(values);

    // if there are errors
    if (!result.success) {
      const newErrors: RegisterFormErrors = {};

      result.error.issues.forEach((error) => {
        const fieldName = error.path[0] as keyof RegisterFormValues;  // type check
        newErrors[fieldName] = error.message; // Populate newErrors Object
      });
      setErrors(newErrors);
      return false;
    }
    // if there are no errors
    setErrors({});  // "clear" past/previous errors
    return true;
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));

    setErrors((prev) => ({
      ...prev,
      [event.target.name]: undefined
    }));

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    console.log("Registration Values: ", values);

    if (isValid) {
      try {
        // API call via registerUser function
        const result = await registerUser(values);
        toast.success("User registered successfully.");

        // console.log("Registration RESULT: ", result)

        setAccessToken(result?.data.accessToken);
        setUserDetails(result?.data.user);

        setValues(initialValues); // Clear form after submission
        navigate("/user-dashboard");
      } catch(error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );
        console.log("Error in user registration: ", error);
      }
     }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState(true);

  const handleCheck = () => {
    setChecked(!checked);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <section className="container flex flex-col items-center justify-center pt-15 mx-auto mt-10">
      <h1 className="text-8xl mb-10 font-extrabold text-gray-900">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
        >Sign In</span>
      </h1>
      <hr className="w-[50%] mb-6 border-t border-gray-300" />
      <form onSubmit={handleSubmit} className="flex md:w-md flex-col gap-3">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Username:</Label>
          </div>
          <TextInput
            ref={inputRef}
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            shadow
          />
          {errors?.name && (
            <HelperText>
              <span className="text-red-700">{errors.name}</span>
            </HelperText>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Firstname:</Label>
          </div>
          <TextInput
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            shadow
          />
          {errors?.name && (
            <HelperText>
              <span className="text-red-700">{errors.name}</span>
            </HelperText>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="surname">Lastname:</Label>
          </div>
          <TextInput
            id="surname"
            name="surname"
            value={values.surname}
            onChange={handleChange}
            type="text"
            placeholder="Surname"
            shadow
          />
          {errors?.surname && (
            <HelperText>
              <span className="text-red-700">{errors.surname}</span>
            </HelperText>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Your email:</Label>
          </div>
          <TextInput
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            type="email"
            placeholder="name@myreserva.com"
            shadow
          />
          {errors?.email && (
            <HelperText>
              <span className="text-red-700">{errors.email}</span>
            </HelperText>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone">Your phone number:</Label>
          </div>
          <TextInput
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone number"
            shadow
          />
          {errors?.phone && (
            <HelperText>
              <span className="text-red-700">{errors.phone}</span>
            </HelperText>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Your password:</Label>
          </div>
          <TextInput
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="********"
            shadow
          />
          {errors?.password && (
            <HelperText>
              <span className="text-red-700">{errors.password}</span>
            </HelperText>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password">Confirm password:</Label>
          </div>
          <TextInput
            id="repeat-password"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
            type="password"
            placeholder="********"
            shadow
          />
          {errors?.repeatPassword && (
            <HelperText>
              <span className="text-red-700">{errors.repeatPassword}</span>
            </HelperText>
          )}
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
      <div className="flex flex-col gap-3 items-center md:w-md mt-6">
        <p className="text-sm">Already have an account?</p>
        <Button color="dark" className="w-full mt-1" ><Link className="block w-full" to="/login">Log In</Link></Button>
      </div>

    </section>

  );
}

export default RegisterForm;