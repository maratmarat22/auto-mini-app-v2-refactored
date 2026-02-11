import {
  CarFront,
  ChessKnight,
  MailCheck,
  MailQuestionMark,
  MailX,
  MessageSquareMore,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export const WIZARD_STEP = {
  HERO: 'hero',
  AUTO: 'auto',
  COMMENT: 'comment',
  BUDGETCITY: 'budgetcity',
  SUBMIT: 'submit',
  STATUS: 'status',
} as const;

export type WizardStepId = (typeof WIZARD_STEP)[keyof typeof WIZARD_STEP];

export type PrevButtonAction =
  | 'prev'
  | 'reset'
  | 'retry'
  | 'exitSubstep'
  | null;
export type NextButtonAction = 'next' | 'submit' | 'exit';

interface StepSchema {
  id: WizardStepId;

  headerTitle: string;

  icon: LucideIcon;
  iconAlt?: LucideIcon;

  title: string;
  titleAlt?: string;

  description: string;
  descriptionAlt?: string;

  prevButtonVisible: boolean;
  nextButtonVisible: boolean;

  prevButtonText?: string;
  prevButtonTextAlt?: string;

  nextButtonText: string;

  prevButtonAction: PrevButtonAction;
  prevButtonActionAlt?: PrevButtonAction;

  nextButtonAction: NextButtonAction;
}

export const STEPS_CONFIG: StepSchema[] = [
  {
    id: WIZARD_STEP.HERO,

    headerTitle: 'Ход конём',

    icon: ChessKnight,
    title: 'Привет',
    description: 'Привет',

    prevButtonVisible: false,
    nextButtonVisible: true,

    nextButtonText: 'Далее',

    prevButtonAction: null,
    nextButtonAction: 'next',
  },
  {
    id: WIZARD_STEP.AUTO,

    headerTitle: 'Авто',

    icon: CarFront,
    title: 'Авто',
    description: 'Авто',

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: 'Назад',
    nextButtonText: 'Далее',

    prevButtonAction: 'prev',
    nextButtonAction: 'next',
  },
  {
    id: WIZARD_STEP.COMMENT,

    headerTitle: 'Комментарий',

    icon: MessageSquareMore,
    title: 'Комментарий',
    description: 'Комментарий',

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: 'Назад',
    nextButtonText: 'Далее',

    prevButtonAction: 'prev',
    nextButtonAction: 'next',
  },
  {
    id: WIZARD_STEP.BUDGETCITY,

    headerTitle: 'Бюджет и город',

    icon: Wallet,
    title: 'Бюджет и город',
    description: 'Бюджет и город',

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: 'Назад',
    nextButtonText: 'Далее',

    prevButtonAction: 'prev',
    nextButtonAction: 'next',
  },
  {
    id: WIZARD_STEP.SUBMIT,

    headerTitle: 'Отправка',

    icon: MailQuestionMark,
    title: 'Отправляем?',
    description: 'Отправляем?',

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: 'Назад',
    nextButtonText: 'Отправить',

    prevButtonAction: 'prev',
    nextButtonAction: 'submit',
  },
  {
    id: WIZARD_STEP.STATUS,

    headerTitle: 'Результат',

    icon: MailCheck,
    iconAlt: MailX,

    title: 'Успех',
    titleAlt: 'Ошибка',

    description: 'Мы получили Вашу заявку',
    descriptionAlt: 'Мы не получили Вашу заявку',

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: 'Оставить ещё',
    prevButtonTextAlt: 'Попробовать ещё раз',

    nextButtonText: 'Выйти',

    prevButtonAction: 'reset',
    prevButtonActionAlt: 'retry',

    nextButtonAction: 'exit',
  },
];
