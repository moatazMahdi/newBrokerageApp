export default {
  language: 'English',

  common: {
    error: 'Error',
    success: 'Success',
    fillAllFields: 'Please fill all fields',
    confirm: 'Confirm',
    next: 'Next',
    retry: 'Retry',
  },

  tabs: {
    home: 'Home',
    products: 'Our Products',
    alerts: 'Alerts',
    more: 'More',
  },

  onboarding: {
    skip: 'Skip',
    next: 'Next',
    start: 'Get Started',
    slide1: {
      title: 'All insurance',
      highlightedTitle: 'services...',
      secondLine: 'in one place',
      description:
        'Browse and request all types of insurance for individuals and companies from a single app, quickly and without complications.',
    },
    slide2: {
      title: 'Manage your',
      highlightedTitle: 'documents...',
      secondLine: 'with ease',
      description:
        'View your insurance policies, download them as PDF, and receive automatic reminders before renewal.',
    },
    slide3: {
      title: 'Instant support',
      highlightedTitle: 'and trust...',
      secondLine: 'guaranteed',
      description:
        'Communicate directly with the Connect team and track real claims with certified insurance companies.',
    },
  },

  auth: {
    login: {
      welcome: 'Welcome back 👋',
      subtitle:
        'Enter your phone number and password to access your account.',
      phone: 'Phone Number',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      loginButton: 'Login',
      orLoginWith: 'Or log in with',
      noAccount: "Don't have an account?",
      createAccount: 'Create account',
      guestBrowse: 'Browse the app as a guest',
      success: 'Logged in successfully',
      failed: 'Login failed',
    },

    biometric: {
      title: 'Enable biometric features',
      enableNow: 'Enable now',
      later: 'Maybe later',
      notAvailable: 'Biometric authentication is not available on this device',
    },

    socialPhone: {
      screenTitle: 'Register phone number',
      title: 'Register phone number',
      phone: 'Phone Number',
      enterPhone: 'Please enter your phone number',
      invalidPhone: 'Phone number must start with 01',
      phoneDigits: 'Phone number must be 11 digits',
    },

    signup: {
      screenTitle: 'Create a new account',
      title: 'Create a new account',
      phone: 'Phone Number',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      terms: 'agree to the Terms and Conditions',
      mustAcceptTerms: 'You must accept the Terms and Conditions',
      createAccount: 'Create account',
      failed: 'Failed to create account',
      successTitle: 'Account created successfully! 🎉',
      successMessage: 'Thank you for joining, and we hope you enjoy the app.'
    },

    forgotPassword: {
      screenTitle: 'Forgot password',
      title: 'Forgot password',
      phone: 'Phone Number',
      next: 'Next',
      enterPhone: 'Please enter your phone number',
      sendFailed: 'Could not send the verification code',
      invalidPhone: 'Phone number must start with 01',
      phoneDigits: 'Phone number must be 11 digits',
    },
    
    otp: {
      screenTitle: 'Verification code',
      title: 'Confirm verification code',
      subtitle:
        'A one-time verification code has been sent to this number',
      confirm: 'Confirm',
      resend: 'Resend The Code',
      didntReceive: "If you didn't receive the code",
      enterFullCode: 'Please enter the full verification code',
      invalidCode: 'Invalid verification code',
      resendFailed: 'Could not resend the code',
    },

    createNewPassword: {
      screenTitle: 'Reset password',
      title: 'Reset password',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      confirm: 'Confirm',
      success: 'Password reset successfully',
      failed: 'Could not reset the password',
      requirementsTitle: 'The new password must contain:',
      reqMinLength: 'At least 8 characters',
      reqSpecialChar: 'Special characters such as @,#,$, etc.',
      reqUpperLower: 'Lowercase and uppercase letters',
      reqNumber: 'At least one number',
      reqHistorical: 'Must not match any historical password parameters',
      strengthLabel: 'Password strength',
      strengthWeak: 'Weak',
      strengthMedium: 'Medium',
      strengthStrong: 'Strong',
      successTitle: 'Password reset successfully! 🎉',
      successSubtitle: 'Thank you for joining and we hope you benefit from the advantages of the application available',
      login: 'Log in',
    },

    validation: {
      usernameRequired: 'Username is required',
      usernameMin: 'Username must be at least 7 characters',
      usernameMax: 'Username must not exceed 29 characters',
      usernameInvalid:
        'Username can contain only English letters, numbers, and underscores (_) with no spaces',

      phoneRequired: 'Phone number is required',
      invalidPhone: 'Please enter a valid Egyptian phone number',

      passwordRequired: 'Password is required',
      passwordMin: 'Password must be at least 8 characters',
      passwordNumber: 'Password must contain at least one number',
      passwordLowercase: 'Password must contain at least one lowercase letter',
      passwordUppercase: 'Password must contain at least one uppercase letter',
      passwordSpecialChar: 'Password must contain at least one special character',
      noSpaces: 'Spaces are not allowed',

      confirmPasswordRequired: 'Please confirm your password',
      passwordsMustMatch: 'Passwords must match',
    },
  },
};
