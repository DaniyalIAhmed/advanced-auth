import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import Input from "../components/Input";
import { signUpSchema, type SignUpSchema } from "../lib/zod";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import { RiLoader5Fill } from "react-icons/ri";

const SignUpPage = () => {
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const onSubmit = async (data: SignUpSchema) => {
    try {
      await signup(data.name, data.email, data.password);
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
    } finally {
      reset({ name: "", email: "", password: "" });
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <Input
            {...register("name")}
            icon={CiUser}
            type={"text"}
            placeholder="Full Name"
            error={errors.name?.message}
          />
          <Input
            {...register("email")}
            icon={CiMail}
            type={"email"}
            placeholder="Email Address"
            error={errors.email?.message}
          />
          <Input
            {...register("password")}
            icon={CiLock}
            type={"password"}
            placeholder="Password"
            error={errors.password?.message}
          />
          <PasswordStrengthMeter password={watch("password")} />
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <RiLoader5Fill className="size-5 animate-spin mx-auto" />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
