import { useState } from 'react';
import { useWizardStore } from '@/features/wizard/model/store';
import type {
  AutoProp,
  AutoSubstepGroup,
} from '../model/types/AutoSubstepConfigs/supportingTypes';

export const useMenu = () => {
  const updateState = useWizardStore((store) => store.updateState);

  const [substepGroup, setSubstepGroup] =
    useState<AutoSubstepGroup>('specific');
  const [substep, setSubstep] = useState<AutoProp | null>(null);

  const handleSubstepGroupChange = (newSubstepGroup: AutoSubstepGroup) => {
    if (newSubstepGroup === substepGroup) return;

    if (newSubstepGroup === 'abstract') {
      updateState({ brand: null });
    } else {
      updateState({
        bodyType: null,
        engineType: null,
        gearType: null,
        transmission: null,
      });
    }

    setSubstepGroup(newSubstepGroup);
  };

  const handleSubstepChange = (substep: AutoProp | null) => {
    updateState({ onSubstep: substep !== null });
    setSubstep(substep);
  };

  return {
    substepGroup,
    handleSubstepGroupChange,
    substep,
    handleSubstepChange,
  };
};
