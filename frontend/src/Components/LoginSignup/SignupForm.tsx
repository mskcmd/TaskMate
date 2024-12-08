import { Input, Button, Link } from "@nextui-org/react";
import { FormData, ValidationErrors } from "../../utils/Types";

interface SignupFormProps {
  formData: FormData;
  onInputChange: (value: string, field: keyof FormData) => void;
  onTabChange: (tab: string) => void;
  onSubmit: () => void;
  errors: ValidationErrors;
}

export const SignupForm = ({
  formData,
  onInputChange,
  onTabChange,
  onSubmit,
  errors
}: SignupFormProps) => {
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
        label="Full Name"
        placeholder="Enter your name"
        type="text"
        value={formData.fullName}
        onValueChange={(value) => onInputChange(value, "fullName")}
        size="sm"
        variant="bordered"
        color={errors.fullName ? "danger" : "default"}
        errorMessage={errors.fullName}
        isInvalid={!!errors.fullName}
      />
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
      <Input
        isRequired
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        value={formData.confirmPassword}
        onValueChange={(value) => onInputChange(value, "confirmPassword")}
        size="sm"
        variant="bordered"
        color={errors.confirmPassword ? "danger" : "default"}
        errorMessage={errors.confirmPassword}
        isInvalid={!!errors.confirmPassword}
      />
      <Button
        fullWidth
        color="primary"
        size="lg"
        className="font-semibold"
        type="submit"
      >
        Create Account
      </Button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          className="cursor-pointer"
          onPress={() => onTabChange("login")}
        >
          Login
        </Link>
      </p>
    </form>
  );
};