import type { AutoEntity, RangeEntity } from './autoEntity';
import type { SpecificAutoProperty } from './specificAutoProperty';

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
  onSubstep: boolean;
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
  handleClose: () => void;
  handleExitSubstep: () => void;
  handleSubmit: () => Promise<void>;
  handleReset: () => void;

  setSpecificAutoProperty: (
    prop: SpecificAutoProperty,
    value: AutoEntity | null,
  ) => void;

  updateState: (updates: Partial<WizardState>) => void;
  resetState: () => void;
}
