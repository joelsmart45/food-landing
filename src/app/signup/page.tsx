"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/supabase/actions";

export default function Signup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setIsLoading(false);
      setError("Passwords do not match");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);
    formDataObj.append("password", formData.password);
    formDataObj.append("full_name", formData.full_name);
    formDataObj.append("phone", formData.phone);

    const result = await signUp(formDataObj);

    setIsLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex items-center justify-center">
            <span className="text-3xl text-green-600">🥗</span>
            <h1 className="text-2xl font-bold text-gray-900">FreshBites</h1>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join FreshBites today
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow sm:rounded-lg sm:p-4">
              <div>
                <label htmlFor="full_name" className="sr-only">
                  Full name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="+234 800 123 4567"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mt-4">
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="currentColor"
                          d="M1 5.055A5 5 0 014.982 1.842L9.316 6.186a5 5 0 011.668 3.342L12.666 15a5 5 0 01-4.516 2.884L1.896 12.837C1.258 11.984 1 11.029 1 10c0-2.121 1.412-3.807 3.297-4.245L7.584 1.455A6 6 0 0110 2c1.105 0 2.16.23 3.112.648L12.293 4.803A4 4 0 0111 10c0 1.029-.258 1.984-.896 2.837L2.896 12.837c-1.885-.437-3.297-2.124-3.297-4.245A4 4 0 011 6.055z"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 6c2.21 0 4-1.79 4-4S14.21 2 12 2 8 3.79 8 6s1.79 4 4 4zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path fillRule="evenodd" d="M18 10c0 3.31-4 6-6 6S6 13.31 6 10c0-1.11.38-2.08 1-2.86V8c0-2.21 1.79-4 4-4s4 1.79 4 4v.14c.62-.78 1-1.75 1-2.86z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <label htmlFor="confirm_password" className="sr-only">
                    Confirm password
                  </label>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="currentColor"
                          d="M1 5.055A5 5 0 014.982 1.842L9.316 6.186a5 5 0 011.668 3.342L12.666 15a5 5 0 01-4.516 2.884L1.896 12.837C1.258 11.984 1 11.029 1 10c0-2.121 1.412-3.807 3.297-4.245L7.584 1.455A6 6 0 0110 2c1.105 0 2.16.23 3.112.648L12.293 4.803A4 4 0 0111 10c0 1.029-.258 1.984-.896 2.837L2.896 12.837c-1.885-.437-3.297-2.124-3.297-4.245A4 4 0 011 6.055z"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 6c2.21 0 4-1.79 4-4S14.21 2 12 2 8 3.79 8 6s1.79 4 4 4zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path fillRule="evenodd" d="M18 10c0 3.31-4 6-6 6S6 13.31 6 10c0-1.11.38-2.08 1-2.86V8c0-2.21 1.79-4 4-4s4 1.79 4 4v.14c.62-.78 1-1.75 1-2.86z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">
                By creating an account, you agree to our{" "}
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Terms of Service
                </a>
                &{" "}
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
