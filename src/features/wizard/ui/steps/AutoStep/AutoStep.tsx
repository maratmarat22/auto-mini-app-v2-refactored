import { Menu } from './components/Menu/Menu';
import { useWizardStore } from '@/features/wizard/model/store';
import { SelectSubstep } from './components/SelectSubstep/SelectSubstep';
import { useAutoQueries } from '../../../hooks/useAutoQueries';
import { Spinner } from '@telegram-apps/telegram-ui';
import { SUBSTEPS_CONFIG } from '../../../model/AutoSubstepsConfig';
import { useMenu } from '../../../hooks/useMenu';
import type { AutoState } from '@/features/wizard/model/types/store';
import { useCallback, useMemo } from 'react';
import { useAutoState } from '../../../hooks/useAutoState';
import { isAutoSelectSubstepConfig } from '@/features/wizard/model/types/AutoSubstepConfigs/select';
import { isAutoEntityArray } from '@/features/wizard/model/types/autoEntity';

export const AutoStep = () => {
  const onSubstep = useWizardStore((store) => store.onSubstep);
  const updateState = useWizardStore((store) => store.updateState);
  const autoState: AutoState = useAutoState();

  const menu = useMenu();
  const queries = useAutoQueries();

  const config = SUBSTEPS_CONFIG.find((c) => c.prop === menu.substep);

  const mappedOptions = useMemo(() => {
    if (!onSubstep || !isAutoSelectSubstepConfig(config)) return [];

    const options = queries[config.dataKey];
    if (!isAutoEntityArray(options)) return [];

    return options.map((o) => ({
      value: o.id,
      label: o.name,
      loweredLabel: o.name.toLowerCase(),
    }));
  }, [onSubstep, config, queries]);

  const handleClear = useCallback(() => {
    if (!isAutoSelectSubstepConfig(config)) return;

    updateState({
      [config.prop]: null,
      lastActionClear: true,
    });

    menu.handleSubstepChange(null);
  }, [config, updateState, menu]);

  const handleSelect = useCallback(
    (newValue: { value: string; label: string }) => {
      if (!isAutoSelectSubstepConfig(config)) return;

      updateState({
        [config.prop]: { id: newValue.value, name: newValue.label },
        onSubstep: false,
        lastActionClear: false,
      });
      menu.handleSubstepChange(null);
    },
    [config, updateState, menu],
  );

  if (onSubstep) {
    if (!isAutoSelectSubstepConfig(config)) return null;

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
