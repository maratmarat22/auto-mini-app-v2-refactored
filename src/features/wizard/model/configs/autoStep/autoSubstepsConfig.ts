import type { AutoSelectSubstepConfig } from '@/features/wizard/model/configs/autoStep/types/select';
import type { AutoState } from '@/features/wizard/model/store/types/store';
import type { AutoRangeSubstepConfig } from './types/range';

export const SUBSTEPS_CONFIG: (
  | AutoSelectSubstepConfig
  | AutoRangeSubstepConfig
)[] = [
  {
    group: 'specific',
    type: 'select',
    prop: 'brand',

    getButtonText: (auto: AutoState) =>
      auto.brand ? `Марка: ${auto.brand.name}` : 'Уточнить марку',
    isFilled: (auto: AutoState) => !!auto.brand,

    dataKey: 'brandsData',
    loadingKey: 'brandsLoading',

    header: 'Поиск',
    placeholder: 'Например, BMW',
  },
  {
    group: 'specific',
    type: 'select',
    prop: 'model',

    getButtonText: (auto: AutoState) =>
      auto.model ? `Модель: ${auto.model.name}` : 'Уточнить модель',
    isFilled: (auto: AutoState) => !!auto.model,
    disabled: (auto: AutoState) => !auto.brand,

    dataKey: 'modelsData',
    loadingKey: 'modelsLoading',

    header: 'Поиск',
    placeholder: 'Например, X5',
  },
  {
    group: 'specific',
    type: 'select',
    prop: 'generation',

    getButtonText: (auto: AutoState) =>
      auto.generation
        ? `Поколение: ${auto.generation.name}`
        : 'Уточнить поколение',
    isFilled: (auto: AutoState) => !!auto.generation,
    disabled: (auto: AutoState) => !auto.model,

    dataKey: 'generationsData',
    loadingKey: 'generationsLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    group: 'specific',
    type: 'select',
    prop: 'configuration',

    getButtonText: (auto: AutoState) =>
      auto.configuration
        ? `Конфигурация: ${auto.configuration.name}`
        : 'Уточнить конфигурацию',
    isFilled: (auto: AutoState) => !!auto.configuration,
    disabled: (auto: AutoState) => !auto.generation,

    dataKey: 'configurationsData',
    loadingKey: 'configurationsLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    group: 'specific',
    type: 'select',
    prop: 'modification',

    getButtonText: (auto: AutoState) =>
      auto.modification
        ? `Модификация: ${auto.modification.name}`
        : 'Уточнить модификацию',
    isFilled: (auto: AutoState) => !!auto.modification,
    disabled: (auto: AutoState) => !auto.configuration,

    dataKey: 'modificationsData',
    loadingKey: 'modificationsLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    group: 'abstract',
    type: 'select',
    prop: 'bodyType',

    getButtonText: (auto: AutoState) =>
      auto.bodyType
        ? `Тип кузова: ${auto.bodyType.name}`
        : 'Уточнить тип кузова',
    isFilled: (auto: AutoState) => !!auto.bodyType,

    dataKey: 'bodyTypesData',
    loadingKey: 'bodyTypesLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    group: 'abstract',
    type: 'select',
    prop: 'engineType',

    getButtonText: (auto: AutoState) =>
      auto.engineType
        ? `Тип двигателя: ${auto.engineType.name}`
        : 'Уточнить тип двигателя',
    isFilled: (auto: AutoState) => !!auto.engineType,

    dataKey: 'engineTypesData',
    loadingKey: 'engineTypesLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    group: 'abstract',
    type: 'range',
    prop: 'engineDisplacement',

    getButtonText: (auto: AutoState) => {
      if (auto.engineDisplacement === null) return 'Уточнить объём двигателя';
      if (auto.engineDisplacement.from === null && auto.engineDisplacement.to) {
        return `До ${auto.engineDisplacement.to}`;
      }
      if (auto.engineDisplacement.from && auto.engineDisplacement.to === null) {
        return `От ${auto.engineDisplacement.from}`;
      }
      return `${auto.engineDisplacement.from} — ${auto.engineDisplacement.to}`;
    },
    isFilled: (auto: AutoState) => !!auto.engineDisplacement,
    disabled: (auto: AutoState) => !auto.engineType,
    header: 'Объём двигателя',
  },
  {
    group: 'abstract',
    type: 'range',
    prop: 'enginePower',

    getButtonText: (auto: AutoState) => {
      if (auto.engineDisplacement === null)
        return 'Уточнить мощность двигателя';
      if (auto.engineDisplacement.from === null && auto.engineDisplacement.to) {
        return `До ${auto.engineDisplacement.to}`;
      }
      if (auto.engineDisplacement.from && auto.engineDisplacement.to === null) {
        return `От ${auto.engineDisplacement.from}`;
      }
      return `${auto.engineDisplacement.from} — ${auto.engineDisplacement.to}`;
    },
    isFilled: (auto: AutoState) => !!auto.engineDisplacement,
    disabled: (auto: AutoState) => !auto.engineType,
    header: 'Мощность двигателя',
  },
  {
    group: 'abstract',
    type: 'select',
    prop: 'gearType',

    getButtonText: (auto: AutoState) =>
      auto.gearType ? `Привод: ${auto.gearType.name}` : 'Уточнить привод',
    isFilled: (auto: AutoState) => !!auto.gearType,

    dataKey: 'gearTypesData',
    loadingKey: 'gearTypesLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    group: 'abstract',
    type: 'select',
    prop: 'transmission',

    getButtonText: (auto: AutoState) =>
      auto.transmission
        ? `Коробка: ${auto.transmission.name}`
        : 'Уточнить коробку',
    isFilled: (auto: AutoState) => !!auto.transmission,

    dataKey: 'transmissionsData',
    loadingKey: 'transmissionsLoading',

    header: 'Поиск',
    placeholder: 'Например, ...',
  },
  {
    group: 'abstract',
    type: 'range',
    prop: 'years',

    getButtonText: (auto: AutoState) => {
      if (auto.engineDisplacement === null) return 'Уточнить годы выпуска';
      if (auto.engineDisplacement.from === null && auto.engineDisplacement.to) {
        return `До ${auto.engineDisplacement.to}`;
      }
      if (auto.engineDisplacement.from && auto.engineDisplacement.to === null) {
        return `От ${auto.engineDisplacement.from}`;
      }
      return `${auto.engineDisplacement.from} — ${auto.engineDisplacement.to}`;
    },
    isFilled: (auto: AutoState) => !!auto.engineDisplacement,
    header: 'Годы выпуска',
  },
];
