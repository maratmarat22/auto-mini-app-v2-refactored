import { create } from 'zustand';
import { STEPS_CONFIG, type WizardStepId } from '../configs/stepsConfig';
import { autoApi } from '../../api/autoApi';
import {
  isSpecificAutoProperty,
  SPECIFIC_AUTO_PROPERTIES_HIERARCHY,
  type SpecificAutoProperty,
} from '../types/specificAutoProperty';
import { isAutoEntity, type AutoEntity } from './types/entities';
import type { WizardActions, WizardState } from './types/store';
import { mapStateToApplication } from './types/entities';
import { tma } from '@/shared/lib/tma';
import { stepValidators } from './validators';

const initialState: WizardState = {
  stepIndex: 0,

  onSelectSubstep: false,
  rangeSubstepBuffer: { from: null, to: null },
  onRangeSubstep: false,

  autoSubstepGroup: 'specific',
  lastActionClear: false,
  isSubmitting: false,
  submitStatus: 'fail',

  brand: null,
  model: null,
  generation: null,
  configuration: null,
  modification: null,

  bodyType: null,
  engineType: null,
  engineDisplacement: null,
  enginePower: null,
  gearType: null,
  transmission: null,
  years: null,

  comment: null,
  budget: 0,
  city: null,
};

export const useWizardStore = create<WizardState & WizardActions>(
  (set, get) => ({
    ...initialState,

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
    handleCloseApp: () => {
      tma.close();
    },
    handleCloseSubstep: () => {
      set({ onSelectSubstep: false, onRangeSubstep: false });
    },
    handleConfirmSubstep: () => {
      set({ onRangeSubstep: false });
    },
    handleSubmit: async () => {
      const store = get();

      if (store.isSubmitting) return;

      try {
        set({ isSubmitting: true });
        await autoApi.postApplication(mapStateToApplication(store));
        set({ submitStatus: 'success' });
        tma.hapticNotification('success');
      } catch (err) {
        set({ submitStatus: 'fail' });
        console.log(err);
        tma.hapticNotification('error');
      } finally {
        set({ isSubmitting: false });
        store.handleNextStep();
      }
    },
    handleReset: () => {
      const state = get();
      state.resetState();
      state.setStepIndex(1);
    },

    validateStep: (stepId: WizardStepId) => {
      const validator = stepValidators[stepId];
      if (!validator) return null;
      return validator(get());
    },

    setSpecificAutoProperty: (
      prop: SpecificAutoProperty,
      value: AutoEntity | null,
    ) => {
      const index = SPECIFIC_AUTO_PROPERTIES_HIERARCHY.indexOf(prop);
      const updates: Partial<WizardState> = { [prop]: value };

      SPECIFIC_AUTO_PROPERTIES_HIERARCHY.slice(index + 1).forEach((p) => {
        updates[p] = null;
      });

      return updates;
    },

    updateState: (updates: Partial<WizardState>) =>
      set((state) => {
        const store = get();
        const updatesAsEntries = Object.entries(updates) as [
          keyof WizardState,
          unknown,
        ][];

        updatesAsEntries.forEach(([k, v]) => {
          if (isSpecificAutoProperty(k)) {
            if (isAutoEntity(v) || v === null) {
              Object.assign(updates, store.setSpecificAutoProperty(k, v));
            } else {
              console.warn(`Expected AutoEntity for ${k}, got ${typeof v}`);
              return;
            }
          }
        });
        return { ...state, ...updates };
      }),

    resetState: () => set(initialState),
  }),
);
