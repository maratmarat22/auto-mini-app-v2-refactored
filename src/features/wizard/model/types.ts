export interface AutoEntity {
  id: string;
  name: string;
}

export interface WizardState {
  //: Служебная информация
  stepIndex: number;

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
  | "brand"
  | "model"
  | "generation"
  | "configuration"
  | "modification";

export interface WizardActions {
  setStepIndex: (step: number) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;

  setSpecificAutoProperty: (
    prop: SpecificAutoProperty,
    value: AutoEntity | null,
  ) => void;

  resetState: () => void;
}
