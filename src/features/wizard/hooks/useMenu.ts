import { useState } from 'react';
import { useWizardStore } from '@/features/wizard/model/store/store';
import type {
  AutoProp,
  AutoSubstepGroup,
  AutoSubstepType,
} from '../model/configs/autoStep/types/supportingTypes';

export const useMenu = () => {
  const updateState = useWizardStore((store) => store.updateState);
  const substepGroup = useWizardStore((s) => s.autoSubstepGroup);

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

    updateState({ autoSubstepGroup: newSubstepGroup });
  };

  const handleSubstepChange = (
    substepType: AutoSubstepType,
    substep: AutoProp | null,
  ) => {
    if (substepType === 'select')
      updateState({ onSelectSubstep: substep !== null });
    else if (substepType === 'range')
      updateState({ onRangeSubstep: substep !== null });
    setSubstep(substep);
  };

  return {
    substepGroup,
    handleSubstepGroupChange,
    substep,
    handleSubstepChange,
  };
};
