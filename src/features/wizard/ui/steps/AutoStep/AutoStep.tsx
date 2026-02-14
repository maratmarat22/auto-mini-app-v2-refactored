import { Menu } from './components/Menu/Menu';
import { useWizardStore } from '@/features/wizard/model/store/store';
import { SelectSubstep } from './components/SelectSubstep/SelectSubstep';
import { useAutoQueries } from '../../../hooks/useAutoQueries';
import { Spinner } from '@telegram-apps/telegram-ui';
import { SUBSTEPS_CONFIG } from '../../../model/configs/autoStep/autoSubstepsConfig';
import { useMenu } from '../../../hooks/useMenu';
import type { AutoState } from '@/features/wizard/model/store/types/store';
import { useMemo } from 'react';
import { useAutoState } from '../../../hooks/useAutoState';
import { isAutoSelectSubstepConfig } from '@/features/wizard/model/configs/autoStep/types/select';
import { isAutoRangeSubstepConfig } from '@/features/wizard/model/configs/autoStep/types/range';
import { RangeSubstep } from './components/RangeSubstep/RangeSubstep';
import {
  isAutoEntityArray,
  type RangeLimit,
} from '@/features/wizard/model/store/types/entities';

export const AutoStep = () => {
  const onSelectSubstep = useWizardStore((store) => store.onSelectSubstep);
  const rangeSubstepBuffer = useWizardStore((s) => s.rangeSubstepBuffer);
  const onRangeSubstep = useWizardStore((s) => s.onRangeSubstep);
  const updateState = useWizardStore((store) => store.updateState);
  const autoState: AutoState = useAutoState();

  const menu = useMenu();
  const queries = useAutoQueries();

  const config = SUBSTEPS_CONFIG.find((c) => c.prop === menu.substep);

  const mappedOptions = useMemo(() => {
    if (!onSelectSubstep || !isAutoSelectSubstepConfig(config)) return [];

    const options = queries[config.dataKey];
    if (!isAutoEntityArray(options)) return [];

    return options.map((o) => ({
      value: o.id,
      label: o.name,
      loweredLabel: o.name.toLowerCase(),
    }));
  }, [onSelectSubstep, config, queries]);

  if (onSelectSubstep && isAutoSelectSubstepConfig(config)) {
    const handleSelect = (newValue: { value: string; label: string }) => {
      if (!isAutoSelectSubstepConfig(config)) return;

      updateState({
        [config.prop]: { id: newValue.value, name: newValue.label },
        lastActionClear: false,
        onSelectSubstep: false,
        onRangeSubstep: false,
      });
    };
    const handleClear = () => {
      if (!isAutoSelectSubstepConfig(config)) return;

      updateState({
        [config.prop]: null,
        lastActionClear: true,
        onSelectSubstep: false,
        onRangeSubstep: false,
      });
    };

    const isLoading = queries[config.loadingKey];
    if (isLoading) {
      return <Spinner size="l" />;
    }

    return (
      <SelectSubstep
        options={mappedOptions}
        header={config.header}
        placeholder={config.placeholder}
        onClear={handleClear}
        onSelect={handleSelect}
      />
    );
  } else if (onRangeSubstep && isAutoRangeSubstepConfig(config)) {
    const handleInputChange = (limit: RangeLimit, value: string) =>
      updateState({
        rangeSubstepBuffer: {
          from: null,
          to: null,
          ...rangeSubstepBuffer,
          [limit]: value,
        },
      });

    return (
      <RangeSubstep
        onInputChange={handleInputChange}
        placeholderFrom="1"
        placeholderTo="1"
      />
    );
  }

  return (
    <Menu
      substepGroup={menu.substepGroup}
      onSubstepGroupChange={menu.handleSubstepGroupChange}
      auto={autoState}
      onSubstepChange={menu.handleSubstepChange}
    />
  );
};
