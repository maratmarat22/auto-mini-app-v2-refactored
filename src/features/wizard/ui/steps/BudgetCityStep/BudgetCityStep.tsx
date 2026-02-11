import { Button, Input, Text } from '@telegram-apps/telegram-ui';
import { RussianRuble } from 'lucide-react';
import { BUDGET_PRESETS } from './presets';
import styles from './BudgetCityStep.module.css';
import { type ChangeEvent } from 'react';
import { useWizardStore } from '@/features/wizard/model/store';

const budgetFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'decimal',
  maximumFractionDigits: 0,
});

export const BudgetCityStep = () => {
  const { budget, updateState } = useWizardStore();

  const inputValue = budget ? budgetFormatter.format(budget) : '';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numericValue = rawValue ? Number(rawValue) : 0;
    updateState({ budget: numericValue });
  };

  return (
    <>
      <Input
        header="Ваш бюджет"
        type="text"
        inputMode="numeric"
        placeholder="Например, 1 500 000"
        className="inputField"
        after={<RussianRuble size={20} className={styles.rubleIcon} />}
        value={inputValue}
        onChange={handleChange}
      />

      <div className={styles.presetsContainer}>
        <Text weight="2" className={styles.presetsTitle}>
          Быстрый выбор:
        </Text>
        <div className={styles.presetsGrid}>
          {BUDGET_PRESETS.map((preset) => (
            <Button
              key={preset.value}
              size="m"
              mode={preset.value === budget ? 'filled' : 'bezeled'}
              onClick={() => updateState({ budget: preset.value })}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};
