import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { FormData, ValidationErrors } from "../utils/Types";
import { WelcomeBanner } from "../Components/LoginSignup/WelcomeBanner";
import { LoginForm } from "../Components/LoginSignup/LoginForm";
import { SignupForm } from "../Components/LoginSignup/SignupForm";
import { toast, Toaster } from "react-hot-toast";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateFullName,
} from "../utils/Validation";
import { login, signup } from "../Api/Taskapi";
import { useNavigate } from "react-router-dom";

const LoginSignupForm = () => {
  const [selected, setSelected] = useState<string>("login");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
    setErrors({});
  };

  const handleInputChange = (value: string, field: keyof FormData) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const handleTabChange = (tab: string) => {
    resetForm();
    setSelected(tab);
  };

  const handleLogin = async () => {
    setErrors({});

    const loginErrors: ValidationErrors = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError) loginErrors.email = emailError;
    if (passwordError) loginErrors.password = passwordError;

    if (Object.keys(loginErrors).length > 0) {
      setErrors(loginErrors);
      return;
    }

    try {
      console.log("Login attempt:", formData.email);
      const { email, password } = formData;
      console.log(email, password);

      const result = await login({ email, password });
      console.log(result);
      localStorage.setItem("userData", JSON.stringify(result));
      if (result) {
        navigate("/home");
        toast.success("Login Successful!");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  const handleSignup = async () => {
    setErrors({});
    const signupErrors: ValidationErrors = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword || ""
    );
    const fullNameError = validateFullName(formData.fullName || "");

    if (emailError) signupErrors.email = emailError;
    if (passwordError) signupErrors.password = passwordError;
    if (confirmPasswordError)
      signupErrors.confirmPassword = confirmPasswordError;
    if (fullNameError) signupErrors.fullName = fullNameError;

    if (Object.keys(signupErrors).length > 0) {
      setErrors(signupErrors);
      return;
    }

    try {
      console.log("Signup attempt:", formData);
      const { fullName, email, password } = formData;
      const result = await signup({ fullName, email, password });
      console.log(result);
      localStorage.setItem("userData", JSON.stringify(result));
      if (result) {
        navigate("/home");
        toast.success("Account Created Successfully!");
      }
    } catch (error) {
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <Toaster position="top-right" />
      <Card className="w-full max-w-5xl">
        <CardBody className="p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <WelcomeBanner />
            <div className="w-full md:w-1/2 p-6">
              <Tabs
                selectedKey={selected}
                onSelectionChange={(key) => handleTabChange(key as string)}
                variant="underlined"
                fullWidth
                size="lg"
                aria-label="Login/Signup form"
              >
                <Tab key="login" title="Login">
                  <LoginForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onTabChange={handleTabChange}
                    onSubmit={handleLogin}
                    errors={errors}
                  />
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <SignupForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onTabChange={handleTabChange}
                    onSubmit={handleSignup}
                    errors={errors}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginSignupForm;
