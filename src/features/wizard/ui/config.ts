import { WIZARD_STEP, type WizardStepId } from '../model/configs/stepsConfig';
import { AutoStep } from './steps/AutoStep/AutoStep';
import { BudgetCityStep } from './steps/BudgetCityStep/BudgetCityStep';
import { CommentStep } from './steps/CommentStep/CommentStep';
import { HeroStep } from './steps/HeroStep/HeroStep';
import { StatusStep } from './steps/StatusStep/StatusStep';
import { SubmitStep } from './steps/SubmitStep/SubmitStep';

export const STEP_COMPONENTS: Record<WizardStepId, React.FC> = {
  [WIZARD_STEP.HERO]: HeroStep,
  [WIZARD_STEP.AUTO]: AutoStep,
  [WIZARD_STEP.COMMENT]: CommentStep,
  [WIZARD_STEP.BUDGETCITY]: BudgetCityStep,
  [WIZARD_STEP.SUBMIT]: SubmitStep,
  [WIZARD_STEP.STATUS]: StatusStep,
};
