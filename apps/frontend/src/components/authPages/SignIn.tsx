import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; 
import { useTranslation } from 'react-i18next'; 

const farmImage = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000";

interface SignInData {
  phoneNumber: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignInData>({
    phoneNumber: '',
    password: '',
  });
  const [otp, setOtp] = useState<string>('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp' | 'otpInput'>('password');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSuccess = (data: any) => {
    setSuccessMessage(t('signIn.loginSuccess') as string);
    localStorage.setItem('authToken', data.token);
    setAuth(data.token, data.userId);
    localStorage.setItem('role', data.role);
    if (data.role === 'super_admin') {
      navigate('/admin-dashboard'); 
    } else if (data.role === 'farmer') {
      navigate('/dashboard'); 
    } else if (data.role === 'admin') {
      navigate('/weather-detector');
    } else {
      navigate('/products'); 
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const payload = {
      phone: formData.phoneNumber,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        handleLoginSuccess(data);
      } else {
        setError(data.error || (t('signIn.loginFailed') as string));
      }
    } catch (err) {
      console.error('Error during password login:', err);
      setError(t('signIn.networkError') as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const payload = {
      phone: formData.phoneNumber,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login-with-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setLoginMethod('otpInput');
      } else {
        setError(data.error || (t('signIn.loginFailed') as string));
      }
    } catch (err) {
      console.error('Error requesting OTP:', err);
      setError(t('signIn.networkError') as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const payload = {
      phone: formData.phoneNumber,
      otp,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        handleLoginSuccess(data);
      } else {
        setError(data.error || (t('signIn.loginFailed') as string));
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError(t('signIn.networkError') as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-green-50">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Section with Green Gradient Overlay */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${farmImage})` }}
          />
          {/* Green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/80 to-green-600/60"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white w-full p-12">
            <h1 className="text-4xl font-bold mb-4 text-center">
              {t('signIn.bannerTitle')}
            </h1>
            <p className="text-xl text-center max-w-md">
              {t('signIn.bannerDescription')}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-green-700">{t('signIn.appTitle')}</h1>
              <p className="text-gray-600 mt-2 text-sm">
                {t('signIn.formDescription')}
              </p>
            </div>

            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
                role="alert"
              >
                {error}
              </div>
            )}
            {successMessage && (
              <div
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm"
                role="alert"
              >
                {successMessage}
              </div>
            )}

            {loginMethod === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('signIn.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder={t('signIn.phonePlaceholder') as string}
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('signIn.passwordLabel')}
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-green-600 hover:text-green-800 transition-colors"
                    >
                      {t('auth.forgotPassword')}
                    </Link>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder={t('signIn.passwordPlaceholder') as string}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t('signIn.processing')}
                    </span>
                  ) : (
                    t('signIn.signInButton')
                  )}
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('otp')}
                    className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
                  >
                    {t('signIn.loginWithOtp')}
                  </button>
                </div>
              </form>
            )}

            {loginMethod === 'otp' && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('signIn.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder={t('signIn.phonePlaceholder') as string}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t('signIn.processing')}
                    </span>
                  ) : (
                    t('signIn.sendOtpButton')
                  )}
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('password')}
                    className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
                  >
                    {t('signIn.loginWithPassword')}
                  </button>
                </div>
              </form>
            )}

            {loginMethod === 'otpInput' && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="mt-3 text-xl font-medium text-gray-900">
                    {t('signIn.verifyPhoneTitle')}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {t('signIn.sentOtpMessage')} <span className="font-medium">{formData.phoneNumber}</span>
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-1 text-center"
                  >
                    {t('signIn.enterOtpLabel')}
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center tracking-widest text-xl font-semibold"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t('signIn.verifying')}
                    </span>
                  ) : (
                    t('signIn.verifyButton')
                  )}
                </button>

                <div className="text-center text-sm text-gray-600">
                  {t('signIn.didntReceive')}{' '}
                  <button
                    type="button"
                    className="font-medium text-green-600 hover:text-green-800"
                  >
                    {t('signIn.resend')}
                  </button>
                </div>
              </form>
            )}

            <div className="text-center mt-6 text-sm text-gray-600">
              {t('signIn.noAccount')}{' '}
              <Link
                to="/sign-up"
                className="font-medium text-green-600 hover:text-green-800 transition-colors"
              >
                {t('signIn.signUpNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;