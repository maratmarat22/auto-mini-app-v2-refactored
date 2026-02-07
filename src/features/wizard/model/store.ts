import { create } from "zustand";
import type {
  AutoEntity,
  SpecificAutoProperty,
  WizardActions,
  WizardState,
} from "./types";
import { STEPS_CONFIG } from "./stepsConfig";

const SPECIFIC_AUTO_PROPERTIES_HIERARCHY: SpecificAutoProperty[] = [
  "brand",
  "model",
  "generation",
  "configuration",
  "modification",
];

export const useWizardStore = create<WizardState & WizardActions>(
  (set, get) => ({
    //: Состояние
    stepIndex: 0,

    //: Авто
    brand: null,
    model: null,
    generation: null,
    configuration: null,
    modification: null,

    budget: 0,
    city: null,

    //: Actions
    setStepIndex: (stepIndex: number) => set({ stepIndex }),

    handleNextStep: () => {
      const { stepIndex } = get();

      if (stepIndex < STEPS_CONFIG.length - 1) {
        set({ stepIndex: stepIndex + 1 });
      }
    },
    handlePrevStep: () => {
      const { stepIndex } = get();

      if (stepIndex > 0) {
        set({ stepIndex: stepIndex - 1 });
      }
    },

    setSpecificAutoProperty: (
      prop: SpecificAutoProperty,
      value: AutoEntity | null,
    ) =>
      set((state) => {
        const index = SPECIFIC_AUTO_PROPERTIES_HIERARCHY.indexOf(prop);
        const updates: Partial<WizardState> = { [prop]: value };

        SPECIFIC_AUTO_PROPERTIES_HIERARCHY.slice(index + 1).forEach((p) => {
          updates[p] = null;
        });

        return { ...state, ...updates };
      }),

    resetState: () =>
      set({
        stepIndex: 0,
        brand: null,
        model: null,
        generation: null,
        configuration: null,
        modification: null,
        budget: 0,
        city: null,
      }),
  }),
);
