import React, { useState } from 'react';
import useSignUp from '../hooks/SignUp';
import { Link } from "react-router-dom";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const { signUp, loading, error, response } = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const formatPhoneToE164 = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    return `+1${digits}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp({
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formatPhoneToE164(formData.phoneNumber),
      password: formData.password,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Link
             to="/networks"
             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"

        >
          <button
          type="submit"
           disabled={loading}>
          {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </Link>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
        {response && <p className="text-green-600 mt-2">Registered successfully!</p>}
      </form>
    </div>
  );
};

export default SignUpPage;