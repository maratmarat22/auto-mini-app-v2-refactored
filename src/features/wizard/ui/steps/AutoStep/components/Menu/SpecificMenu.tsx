import { Button } from '@telegram-apps/telegram-ui';
import styles from './SpecificMenu.module.css';
import { SPECIFIC_AUTO_SUBSTEPS_CONFIG } from '../../substepsConfig';
import type { WizardState } from '@/features/wizard/model/types';
import type { AutoSelectSubstep } from '../../AutoStep';
import { Check, ChevronRight } from 'lucide-react';

interface SpecificMenuProps {
  onButtonClick: (substep: AutoSelectSubstep) => void;
  state: WizardState;
}

export const SpecificMenu = ({ onButtonClick, state }: SpecificMenuProps) => {
  return (
    <div className={styles.buttonsContainer}>
      {SPECIFIC_AUTO_SUBSTEPS_CONFIG.map((c) => {
        const isFilled = c.isFilled(state);
        return (
          <Button
            key={c.substep}
            after={isFilled ? <Check size={20} /> : <ChevronRight size={20} />}
            onClick={() => onButtonClick(c.substep)}
            size="l"
            mode={isFilled ? 'filled' : 'bezeled'}
            disabled={c.disabled ? c.disabled(state) : false}
            className={styles.button}
          >
            {c.getButtonText(state)}
          </Button>
        );
      })}
    </div>
  );
};
