import { Button, SegmentedControl, Text } from '@telegram-apps/telegram-ui';
import styles from './Menu.module.css';
import { Check, ChevronRight } from 'lucide-react';
import type { AutoState } from '@/features/wizard/model/store/types/store';
import type {
  AutoProp,
  AutoSubstepGroup,
  AutoSubstepType,
} from '@/features/wizard/model/configs/autoStep/types/supportingTypes';
import { SUBSTEPS_CONFIG } from '@/features/wizard/model/configs/autoStep/autoSubstepsConfig';

interface MenuProps {
  substepGroup: AutoSubstepGroup;
  onSubstepGroupChange: (newGroup: AutoSubstepGroup) => void;
  auto: AutoState;
  onSubstepChange: (substepType: AutoSubstepType, newProp: AutoProp) => void;
}

export const Menu = ({
  substepGroup,
  onSubstepGroupChange,
  auto,
  onSubstepChange,
}: MenuProps) => {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.groupsContainer}>
        <Text weight="2" className={styles.groupsHint}>
          Выберите режим поиска:
        </Text>
        <SegmentedControl className={styles.groups}>
          <SegmentedControl.Item
            selected={substepGroup === 'specific'}
            className={
              substepGroup === 'specific'
                ? styles.activeTab
                : styles.inactiveTab
            }
            onClick={() => onSubstepGroupChange('specific')}
          >
            Авто
          </SegmentedControl.Item>
          <SegmentedControl.Item
            selected={substepGroup === 'abstract'}
            className={
              substepGroup === 'abstract'
                ? styles.activeTab
                : styles.inactiveTab
            }
            onClick={() => onSubstepGroupChange('abstract')}
          >
            Характеристики
          </SegmentedControl.Item>
        </SegmentedControl>
      </div>

      <div className={styles.buttonsContainer}>
        {SUBSTEPS_CONFIG.filter((c) => c.group === substepGroup).map((c) => {
          const isFilled = c.isFilled(auto);
          return (
            <Button
              key={c.prop}
              after={
                isFilled ? <Check size={20} /> : <ChevronRight size={20} />
              }
              onClick={() => onSubstepChange(c.type, c.prop)}
              size="l"
              mode={isFilled ? 'filled' : 'bezeled'}
              disabled={c.disabled ? c.disabled(auto) : false}
              className={styles.button}
            >
              {c.getButtonText(auto)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
