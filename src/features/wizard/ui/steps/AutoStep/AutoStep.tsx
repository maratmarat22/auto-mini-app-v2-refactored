import { Menu } from './components/Menu/Menu';
import { useState } from 'react';
import type { AutoStepTab } from './types';
import { SpecificMenu } from './components/Menu/SpecificMenu';
import { useWizardStore } from '@/features/wizard/model/store';
import { SelectSubstep } from './components/SelectSubstep/SelectSubstep';
import { useAutoQueries } from './hooks/useAutoQueries';
import { SPECIFIC_AUTO_SUBSTEPS_CONFIG } from './substepsConfig';
import type { AutoEntity } from '@/features/wizard/model/types';
import { Spinner } from '@telegram-apps/telegram-ui';

export type AutoSelectSubstep =
  | 'brand'
  | 'model'
  | 'generation'
  | 'configuration'
  | 'modification'
  | null;

function isAutoEntityArray(x: unknown): x is AutoEntity[] {
  return (
    Array.isArray(x) &&
    x.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        'name' in item &&
        typeof item.id === 'string' &&
        typeof item.name === 'string',
    )
  );
}

function isBoolean(x: unknown): x is boolean {
  return typeof x === 'boolean';
}

export const AutoStep = () => {
  const store = useWizardStore();
  const [activeTab, setActiveTab] = useState<AutoStepTab>('specific');
  const [currentSubstep, setCurrentSubstep] = useState<AutoSelectSubstep>(null);
  const handleTabChange = (tab: AutoStepTab) => {
    setActiveTab(tab);
  };
  const handleButtonClick = (substep: AutoSelectSubstep) => {
    store.updateState({ onSubstep: true });
    setCurrentSubstep(substep);
  };
  const autoQueries = useAutoQueries();

  if (store.onSubstep && currentSubstep) {
    const config = SPECIFIC_AUTO_SUBSTEPS_CONFIG.find(
      (c) => c.substep === currentSubstep,
    );

    if (!config) return null;

    const isLoading = autoQueries[config.loadingKey];
    if (!isBoolean(isLoading)) return;
    if (isLoading) {
      console.log('loading');
      return <Spinner size="l" />;
    }

    const options = autoQueries[config.optionsKey];
    if (!isAutoEntityArray(options)) return;

    const handleSelect = (newValue: { value: string; label: string }) => {
      store.setSpecificAutoProperty(currentSubstep, {
        id: newValue.value,
        name: newValue.label,
      });

      store.updateState({ onSubstep: false });
      setCurrentSubstep(null);
    };
    const handleClear = () => {
      store.setSpecificAutoProperty(currentSubstep, null);
      store.updateState({ onSubstep: false });
      setCurrentSubstep(null);
    };

    return (
      <SelectSubstep
        options={(options as AutoEntity[]).map((o) => ({
          value: o.id,
          label: o.name,
          loweredLabel: o.name.toLowerCase(),
        }))}
        header={config.header}
        placeholder={config.placeholder}
        onClear={handleClear}
        onSelect={handleSelect}
      />
    );
  }

  return (
    <>
      <Menu activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'specific' ? (
        <SpecificMenu onButtonClick={handleButtonClick} state={store} />
      ) : null}
    </>
  );
};
