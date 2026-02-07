import {
  Car,
  ChessKnight,
  MailQuestionMark,
  MessageCircleMore,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const WIZARD_STEP = {
  HERO: "hero",
  AUTO: "auto",
  COMMENT: "comment",
  BUDGETCITY: "budgetcity",
  SUBMIT: "submit",
  STATUS: "status",
} as const;

export type WizardStepId = (typeof WIZARD_STEP)[keyof typeof WIZARD_STEP];

export type PrevButtonAction = "prev" | "reset" | "retry" | null;
export type NextButtonAction = "next" | "submit" | "exit";

interface StepSchema {
  id: WizardStepId;
  icon: LucideIcon;
  title: string;
  description: string;

  prevButtonVisible: boolean;
  nextButtonVisible: boolean;

  prevButtonText: string | null;
  nextButtonText: string;

  prevButtonAction: PrevButtonAction;
  nextButtonAction: NextButtonAction;
}

export const STEPS_CONFIG: StepSchema[] = [
  {
    id: WIZARD_STEP.HERO,
    icon: ChessKnight,
    title: "Привет",
    description: "Привет",

    prevButtonVisible: false,
    nextButtonVisible: true,

    prevButtonText: null,
    nextButtonText: "Далее",

    prevButtonAction: null,
    nextButtonAction: "next",
  },
  {
    id: WIZARD_STEP.AUTO,
    icon: Car,
    title: "Авто",
    description: "Авто",

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: "Назад",
    nextButtonText: "Далее",

    prevButtonAction: "prev",
    nextButtonAction: "next",
  },
  {
    id: WIZARD_STEP.COMMENT,
    icon: MessageCircleMore,
    title: "Комментарий",
    description: "Комментарий",

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: "Назад",
    nextButtonText: "Далее",

    prevButtonAction: "prev",
    nextButtonAction: "next",
  },
  {
    id: WIZARD_STEP.BUDGETCITY,
    icon: Wallet,
    title: "Бюджет и город",
    description: "Бюджет и город",

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: "Назад",
    nextButtonText: "Далее",

    prevButtonAction: "prev",
    nextButtonAction: "next",
  },
  {
    id: WIZARD_STEP.SUBMIT,
    icon: MailQuestionMark,
    title: "Отправляем?",
    description: "Отправляем?",

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: "Назад",
    nextButtonText: "Отправить",

    prevButtonAction: "prev",
    nextButtonAction: "submit",
  },
  {
    id: WIZARD_STEP.STATUS,
    icon: Wallet,
    title: "Бюджет и город",
    description: "Бюджет и город",

    prevButtonVisible: true,
    nextButtonVisible: true,

    prevButtonText: "Назад",
    nextButtonText: "Выйти",

    prevButtonAction: "prev",
    nextButtonAction: "next",
  },
];
