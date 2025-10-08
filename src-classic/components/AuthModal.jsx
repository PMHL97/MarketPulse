import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import useAuthStore from '../store/authStore';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const { login, register, isLoading, error, clearError } = useAuthStore();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Username validation (for registration)
    if (mode === 'register') {
      if (!formData.username) {
        errors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
      }
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (mode === 'register') {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
      }
    }
    
    // Confirm password validation (for registration)
    if (mode === 'register') {
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});
    
    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'login') {
        const result = await login({
          email: formData.email,
          password: formData.password
        });
        if (result.success) {
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
            setIsSuccess(false);
          }, 1000);
        }
      } else {
        const result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        if (result.success) {
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
            setIsSuccess(false);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    });
    setValidationErrors({});
    setIsSuccess(false);
    clearError();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-secondary-900">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              {mode === 'login' ? 'Successfully signed in!' : 'Account created successfully!'}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    validationErrors.username ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder="Enter username"
                  required
                />
              </div>
              {validationErrors.username && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  validationErrors.email ? 'border-red-300' : 'border-secondary-300'
                }`}
                placeholder="Enter email"
                required
              />
            </div>
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  validationErrors.password ? 'border-red-300' : 'border-secondary-300'
                }`}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    validationErrors.confirmPassword ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full py-2 px-4 rounded-md focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              isSuccess 
                ? 'bg-green-600 text-white' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : isSuccess ? (
              <div className="flex items-center justify-center space-x-2">
                <span>✓</span>
                <span>{mode === 'login' ? 'Signed In!' : 'Account Created!'}</span>
              </div>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-secondary-200 text-center">
          <p className="text-sm text-secondary-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={switchMode}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

