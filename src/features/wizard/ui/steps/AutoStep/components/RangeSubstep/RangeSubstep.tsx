import { Input } from '@telegram-apps/telegram-ui';
import styles from './RangeSubstep.module.css';
import type { RangeLimit } from '@/features/wizard/model/store/types/entities';

interface RangeSubstepProps {
  onInputChange: (rangeLimit: RangeLimit, value: string) => void;
  placeholderFrom: string;
  placeholderTo: string;
}

export const RangeSubstep = ({
  onInputChange,
  placeholderFrom,
  placeholderTo,
}: RangeSubstepProps) => {
  return (
    <>
      <div className={styles.inputsWrapper}>
        <Input
          header="От"
          placeholder={placeholderFrom}
          className={`input ${styles.input}`}
          onChange={(e) => onInputChange('from', e.target.value)}
        />
        <span className={styles.line}>—</span>
        <Input
          header="До"
          placeholder={placeholderTo}
          className={`input ${styles.input}`}
          onChange={(e) => onInputChange('to', e.target.value)}
        />
      </div>
    </>
  );
};
