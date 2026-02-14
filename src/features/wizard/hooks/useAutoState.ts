import { useWizardStore } from '@/features/wizard/model/store/store';
import type { AutoState } from '@/features/wizard/model/store/types/store';
import { useShallow } from 'zustand/shallow';

export const useAutoState = (): AutoState => {
  return useWizardStore(
    useShallow((s) => ({
      brand: s.brand,
      model: s.model,
      generation: s.generation,
      configuration: s.configuration,
      modification: s.modification,
      bodyType: s.bodyType,
      engineType: s.engineType,
      engineDisplacement: s.engineDisplacement,
      enginePower: s.enginePower,
      gearType: s.gearType,
      transmission: s.transmission,
      years: s.years,
    })),
  );
};
