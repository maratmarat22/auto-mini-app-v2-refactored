import type { AutoEntity, RangeEntity } from './entities';
import type { SpecificAutoProperty } from '../../types/specificAutoProperty';
import type { WizardStepId } from '../../configs/stepsConfig';
import type { AutoSubstepGroup } from '../../configs/autoStep/types/supportingTypes';

export interface AutoState {
  //: Конкретная информация об авто
  brand: AutoEntity | null;
  model: AutoEntity | null;
  generation: AutoEntity | null;
  configuration: AutoEntity | null;
  modification: AutoEntity | null;

  //: Абстрактная информация об авто
  bodyType: AutoEntity | null;
  engineType: AutoEntity | null;
  engineDisplacement: RangeEntity<number | null> | null;
  enginePower: RangeEntity<number | null> | null;
  gearType: AutoEntity | null;
  transmission: AutoEntity | null;
  years: RangeEntity<number | null> | null;
}

export interface WizardState extends AutoState {
  //: Служебная информация
  stepIndex: number;

  onSelectSubstep: boolean;

  rangeSubstepBuffer: RangeEntity<string | null> | null;
  onRangeSubstep: boolean;

  autoSubstepGroup: AutoSubstepGroup;
  lastActionClear: boolean;
  isSubmitting: boolean;
  submitStatus: 'success' | 'fail';

  //: Остальная информация о заявке
  comment: string | null;
  budget: number;
  city: { id: string; name: string } | null;
}

export interface WizardActions {
  setStepIndex: (step: number) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleCloseApp: () => void;
  handleCloseSubstep: () => void;
  handleConfirmSubstep: () => void;
  handleSubmit: () => Promise<void>;
  handleReset: () => void;

  validateStep: (stepId: WizardStepId) => string | null;

  setSpecificAutoProperty: (
    prop: SpecificAutoProperty,
    value: AutoEntity | null,
  ) => void;

  updateState: (updates: Partial<WizardState>) => void;
  resetState: () => void;
}
