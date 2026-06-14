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

  home: {
    products: {
      sectionTitle: 'Insurance Products',
      individuals: 'Individuals',
      companies: 'Companies',
      vehicleInsurance: 'Vehicle Insurance',
      medicalInsurance: 'Medical Insurance',
      otherInsurance: 'Other Insurance',
      transitInsurance: 'Transit Insurance',
      engineeringInsurance: 'Engineering Insurance',
    },
    services: {
      sectionTitle: 'Our Insurance Services',
      policies: 'Policies',
      claims: 'Claims',
      pricing: 'Pricing',
    },
    partners: {
      sectionTitle: 'Our Partners',
      viewAll: 'View All',
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

    signup: {
      title: 'Create a new account',
      phone: 'Phone Number',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      terms: 'agree to the Terms and Conditions',
      mustAcceptTerms: 'You must accept the Terms and Conditions',
      createAccount: 'Create account',
      failed: 'Failed to create account',
    },

    forgotPassword: {
      title: 'Forgot password',
      phone: 'Phone Number',
      next: 'Next',
      enterPhone: 'Please enter your phone number',
      sendFailed: 'Could not send the verification code',
    },

    otp: {
      title: 'Confirm verification code',
      subtitle:
        'A one-time verification code has been sent to this number',
      confirm: 'Confirm',
      resend: 'Resend',
      didntReceive: "If you didn't receive the code",
      enterFullCode: 'Please enter the full verification code',
      invalidCode: 'Invalid verification code',
      resendFailed: 'Could not resend the code',
    },

    createNewPassword: {
      title: 'Reset password',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      confirm: 'Confirm',
      success: 'Password reset successfully',
      failed: 'Could not reset the password',
    },

    validation: {
      fullNameRequired: 'Full name is required',
      fullNameMin: 'Name must be at least 3 characters',
      fullNameLettersOnly: 'Name must contain only letters',
      noSpaces: 'No spaces allowed',
      phoneRequired: 'Phone number is required',
      invalidPhone: 'Enter a valid Egyptian phone number',
      phoneLength: 'Phone number must be 11 digits',
      passwordRequired: 'Password is required',
      passwordMin: 'Password must be at least 8 characters',
      passwordNumber: 'Must contain at least one number',
      passwordLowercase: 'Must contain a lowercase letter',
      passwordUppercase: 'Must contain an uppercase letter',
      passwordSpecialChar: 'Must contain a special character',
      confirmPasswordRequired: 'Confirm password is required',
      passwordsMustMatch: 'Passwords must match',
    },
  },
};
