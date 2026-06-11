export default {
  language: 'العربية',

  common: {
    error: 'خطأ',
    success: 'نجح',
    fillAllFields: 'الرجاء ملء جميع الحقول',
    confirm: 'تأكيد',
    next: 'التالي',
    retry: 'إعادة المحاولة',
  },

  tabs: {
    home: 'الرئيسية',
    products: 'منتجاتنا',
    alerts: 'التنبيهات',
    more: 'المزيد',
  },

  onboarding: {
    skip: 'تخطي',
    next: 'التالي',
    start: 'ابدأ الان',
    slide1: {
      title: 'كل خدمات',
      highlightedTitle: 'التأمين...',
      secondLine: 'في مكان واحد',
      description:
        'استعرض واطلب جميع أنواع التأمين للأفراد والشركات من تطبيق واحد، بسرعة وبدون تعقيد.',
    },
    slide2: {
      title: 'تحكم في',
      highlightedTitle: 'وثائقك...',
      secondLine: 'بسهولة',
      description:
        'اطلع على وثائق التأمين الخاصة بك، حملها PDF، واستقبل تنبيهات تلقائية قبل ميعاد التجديد.',
    },
    slide3: {
      title: 'دعم فوري',
      highlightedTitle: 'وثقة...',
      secondLine: 'مضمونة',
      description:
        'تواصل مباشرة مع فريق كونكتك، وتابع تعويضات حقيقية مع شركة تأمين معتمدين.',
    },
  },

  auth: {
    login: {
      welcome: 'مرحبا بعودتك 👋',
      subtitle: 'ادخل رقم الهاتف وكلمة المرور للدخول الي حسابك.',
      phone: 'رقم الهاتف  ',
      password: 'كلمة المرور',
      forgotPassword: 'نسيت كلمة السر؟',
      loginButton: 'تسجيل الدخول',
      orLoginWith: 'أو سجل الدخول باستخدام',
      noAccount: 'ليس لديك حساب؟',
      createAccount: 'إنشاء حساب',
      guestBrowse: 'تصفح التطبيق كضيف',
      success: 'تم تسجيل الدخول بنجاح',
      failed: 'فشل تسجيل الدخول',
    },

    biometric: {
      title: 'تفعيل الخصائص البيومترية',
      enableNow: 'فعل الان',
      later: 'ربما في وقت لاحق',
      notAvailable: 'المصادقة البيومترية غير متاحة على هذا الجهاز',
    },
    socialPhone: {
      screenTitle: 'تسجيل رقم الهاتف',
      title: 'تسجيل رقم الهاتف',
      phone: 'رقم الهاتف',
      enterPhone: 'من فضلك أدخل رقم هاتفك',
      invalidPhone: 'يجب أن يبدأ رقم الهاتف بـ 01',
      phoneDigits: 'يجب أن يتكون رقم الهاتف من 11 رقمًا',
    },

    signup: {
      screenTitle: 'إنشاء حساب جديد',
      title: 'تفاصيل إنشاء حساب',
      phone: 'رقم الهاتف',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      terms: 'بالضغط فأنك توافق على الشروط والأحكام',
      mustAcceptTerms: 'يجب الموافقة على الشروط والأحكام',
      createAccount: 'إنشاء حساب',
      failed: 'فشل إنشاء الحساب',
      successTitle: 'تم إنشاء الحساب بنجاح! 🎉',
      successMessage: 'نشكرك علي الانضمام ونتمني لك الاستمتاع بكافة مزايا التطبيق الموجودة'
    },

    forgotPassword: {
      screenTitle: 'نسيت  كلمة المرور',
      title: 'نسيت كلمة المرور',
      phone: 'رقم الهاتف',
      next: 'التالي',
      enterPhone: 'من فضلك أدخل رقم الهاتف',
      sendFailed: 'لم نتمكن من إرسال رمز التحقق',
      invalidPhone: 'يجب أن يبدأ رقم الهاتف بـ 01',
      phoneDigits: 'يجب أن يتكون رقم الهاتف من 11 رقمًا',
    },

    otp: {
      screenTitle: 'كود التحقق',
      title: 'تأكيد كود التحقق',
      subtitle: 'تم ارسال رقم التحقق لمرة واحدة علي هذا الرقم',
      confirm: 'تأكيد',
      resend: 'إعادة إرسال الرمز',
      didntReceive: 'في حالة عدم وصول الكود',
      enterFullCode: 'الرجاء إدخال كود التحقق كاملاً',
      invalidCode: 'كود التحقق غير صحيح',
      resendFailed: 'تعذر إعادة إرسال الكود',
    },

    createNewPassword: {
      screenTitle: 'إعادة تعين  كلمة المرور',
      title: 'إعادة تعين كلمة المرور',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      confirm: 'تأكيد',
      success: 'تم إعادة تعيين كلمة المرور بنجاح',
      failed: 'تعذر إعادة تعيين كلمة المرور',
      requirementsTitle: 'كلمة المرور الجديدة يجب ان تحتوي علي :',
      reqMinLength: '8 احرف علي الأقل',
      reqSpecialChar: 'رموز خاصة مثل @,#,$,الخ',
      reqUpperLower: 'حروف صغيرة وكبيرة',
      reqNumber: 'رقم واحد علي الأقل',
      reqHistorical: 'أن لا تتطابق مع كلمة المرور القديمة',
      strengthLabel: 'قوة كلمة المرور',
      strengthWeak: 'ضعيف',
      strengthMedium: 'متوسط',
      strengthStrong: 'قوي',
      successTitle: 'تم إعادة تعين كلمة المرور بنجاح! 🎉',
      successSubtitle: 'نشكرك علي الانضمام ونتمني لك الاستمتاع بكافة مزايا التطبيق الموجودة',
      login: 'تسجيل الدخول',
    },

    validation: {
      usernameRequired: 'اسم المستخدم مطلوب',
      usernameMin: 'يجب ألا يقل اسم المستخدم عن 7 أحرف',
      usernameMax: 'يجب ألا يزيد اسم المستخدم عن 29 حرفًا',
      usernameInvalid: 'اسم المستخدم يجب أن يحتوي على حروف إنجليزية أو أرقام أو _ فقط بدون مسافات',
        
      phoneRequired: 'رقم الهاتف مطلوب',
      invalidPhone: 'أدخل رقم هاتف مصري صحيح',
        
      passwordRequired: 'كلمة المرور مطلوبة',
      passwordMin: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
      passwordNumber: 'يجب أن تحتوي على رقم واحد على الأقل',
      passwordLowercase: 'يجب أن تحتوي على حرف صغير',
      passwordUppercase: 'يجب أن تحتوي على حرف كبير',
      passwordSpecialChar: 'يجب أن تحتوي على رمز خاص',
      noSpaces: 'غير مسموح بالمسافات',
        
      confirmPasswordRequired: 'تأكيد كلمة المرور مطلوب',
      passwordsMustMatch: 'يجب أن تتطابق كلمتا المرور',
    }
  },
};
