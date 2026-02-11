export interface AutoEntity {
  id: string;
  name: string;
}

export interface WizardState {
  //: Служебная информация
  stepIndex: number;
  onSubstep: boolean;

  isSubmitting: boolean;
  submitStatus: 'success' | 'fail';

  //: Конкретная информация об авто
  brand: AutoEntity | null;
  model: AutoEntity | null;
  generation: AutoEntity | null;
  configuration: AutoEntity | null;
  modification: AutoEntity | null;

  budget: number;
  city: { id: string; name: string } | null;
}

export type SpecificAutoProperty =
  | 'brand'
  | 'model'
  | 'generation'
  | 'configuration'
  | 'modification';

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
