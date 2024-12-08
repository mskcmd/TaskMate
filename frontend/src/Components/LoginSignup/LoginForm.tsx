import { Input, Button, Link } from "@nextui-org/react";
import { FormData, ValidationErrors } from "../../utils/Types";

interface LoginFormProps {
  formData: FormData;
  onInputChange: (value: string, field: keyof FormData) => void;
  onTabChange: (tab: string) => void;
  onSubmit: () => void;
  errors: ValidationErrors;
}

export const LoginForm = ({ 
  formData, 
  onInputChange, 
  onTabChange, 
  onSubmit,
  errors 
}: LoginFormProps) => {
  return (
    <form 
      className="flex flex-col gap-4 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Input
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={formData.email}
        onValueChange={(value) => onInputChange(value, "email")}
        size="sm"
        variant="bordered"
        color={errors.email ? "danger" : "default"}
        errorMessage={errors.email}
        isInvalid={!!errors.email}
      />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={formData.password}
        onValueChange={(value) => onInputChange(value, "password")}
        size="sm"
        variant="bordered"
        color={errors.password ? "danger" : "default"}
        errorMessage={errors.password}
        isInvalid={!!errors.password}
      />
      <Button
        fullWidth
        color="primary"
        size="lg"
        className="font-semibold"
        type="submit"
      >
        Login
      </Button>
      <p className="text-center text-sm">
        Need an account?{" "}
        <Link
          className="cursor-pointer"
          onPress={() => onTabChange("sign-up")}
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};