import { Assets } from '../../../assets';

import { OnboardingItem } from '../types/onboarding.types';

const {
  images: {
    components: { onBoarding1, onBoarding2, onBoarding3 },
  },
} = Assets;

export const onboardingData: OnboardingItem[] = [
  {
    id: 1,

    title: 'كل خدمات',

    highlightedTitle: 'التأمين...',

    secondLine: 'في مكان واحد',

    description:
      'استعرض واطلب جميع أنواع التأمين للأفراد والشركات من تطبيق واحد، بسرعة وبدون تعقيد.',

    image: onBoarding1,
  },

  {
    id: 2,

    title: 'تحكم في',

    highlightedTitle: 'وثائقك...',

    secondLine: 'بسهولة',
    
    description:
      'اطلع على وثائق التأمين الخاصة بك، حملها PDF، واستقبل تنبيهات تلقائية قبل ميعاد التجديد.',

    image: onBoarding2,
  },

  {
    id: 3,

    title: 'دعم فوري',

    highlightedTitle: 'وثقة...',

    secondLine: 'مضمونة',

    description:
      'تواصل مباشرة مع فريق كونكتك، وتابع تعويضات حقيقية مع شركة تأمين معتمدين.',

    image: onBoarding3,
  },
];
