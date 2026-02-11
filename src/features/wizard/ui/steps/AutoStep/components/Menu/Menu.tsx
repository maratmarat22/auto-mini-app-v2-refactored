import { SegmentedControl, Text } from '@telegram-apps/telegram-ui';
import styles from './Menu.module.css';
import type { AutoStepTab } from '../../types';

interface MenuProps {
  activeTab: AutoStepTab;
  onTabChange: (tab: AutoStepTab) => void;
}

export const Menu = ({ activeTab, onTabChange }: MenuProps) => {
  return (
    <div className={styles.menuContainer}>
      <Text weight="2" className={styles.menuHint}>
        Выберите режим поиска:
      </Text>
      <SegmentedControl className={styles.menu}>
        <SegmentedControl.Item
          selected={activeTab === 'specific'}
          className={
            activeTab === 'specific' ? styles.activeTab : styles.inactiveTab
          }
          onClick={() => onTabChange('specific')}
        >
          Авто
        </SegmentedControl.Item>
        <SegmentedControl.Item
          selected={activeTab === 'abstract'}
          className={
            activeTab === 'abstract' ? styles.activeTab : styles.inactiveTab
          }
          onClick={() => onTabChange('abstract')}
        >
          Характеристики
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
};
