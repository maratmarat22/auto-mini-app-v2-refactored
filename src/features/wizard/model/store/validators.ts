import { WIZARD_STEP, type WizardStepId } from '../configs/stepsConfig';
import type { WizardState } from './types/store';

export const stepValidators: Partial<
  Record<WizardStepId, (s: WizardState) => string | null>
> = {
  [WIZARD_STEP.AUTO]: (s) => {
    if (s.brand || s.bodyType) return null;
    return 'Укажите марку или тип кузова';
  },

  [WIZARD_STEP.BUDGETCITY]: (s) => {
    if (s.budget <= 0) return 'Укажите бюджет';
    return null;
  },
};
