import type { WizardState } from '@/features/wizard/model/types';
import type { AutoSelectSubstep } from './AutoStep';
import type { AutoQueriesKey } from './hooks/useAutoQueries';

interface SpecificAutoSubstepConfig {
  getButtonText: (state: WizardState) => string;
  isFilled: (state: WizardState) => boolean;
  disabled?: (state: WizardState) => boolean;

  substep: AutoSelectSubstep;
  optionsKey: AutoQueriesKey;
  loadingKey: AutoQueriesKey;

  header: string;
  placeholder: string;
}

export const SPECIFIC_AUTO_SUBSTEPS_CONFIG: SpecificAutoSubstepConfig[] = [
  {
    getButtonText: (state: WizardState) =>
      state.brand ? `Марка: ${state.brand.name}` : 'Уточнить марку',
    isFilled: (state: WizardState) => !!state.brand,

    substep: 'brand',
    optionsKey: 'brands',
    loadingKey: 'brandsAreLoading',

    header: 'Поиск',
    placeholder: 'Например, BMW',
  },
  {
    getButtonText: (state: WizardState) =>
      state.model ? `Модель: ${state.model.name}` : 'Уточнить модель',
    isFilled: (state: WizardState) => !!state.model,
    disabled: (state: WizardState) => !state.brand,

    substep: 'model',
    optionsKey: 'models',
    loadingKey: 'modelsAreLoading',

    header: 'Поиск',
    placeholder: 'Например, X5',
  },
  {
    getButtonText: (state: WizardState) =>
      state.generation
        ? `Поколение: ${state.generation.name}`
        : 'Уточнить поколение',
    isFilled: (state: WizardState) => !!state.generation,
    disabled: (state: WizardState) => !state.model,

    substep: 'generation',
    optionsKey: 'generations',
    loadingKey: 'generationsAreLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    getButtonText: (state: WizardState) =>
      state.configuration
        ? `Конфигурация: ${state.configuration.name}`
        : 'Уточнить конфигурацию',
    isFilled: (state: WizardState) => !!state.configuration,
    disabled: (state: WizardState) => !state.generation,

    substep: 'configuration',
    optionsKey: 'configurations',
    loadingKey: 'configurationsAreLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    getButtonText: (state: WizardState) =>
      state.modification
        ? `Модификация: ${state.modification.name}`
        : 'Уточнить модификацию',
    isFilled: (state: WizardState) => !!state.modification,
    disabled: (state: WizardState) => !state.configuration,

    substep: 'modification',
    optionsKey: 'modifications',
    loadingKey: 'modificationsAreLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
];
