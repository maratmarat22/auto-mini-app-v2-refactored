import { Cell, Input, List } from '@telegram-apps/telegram-ui';
import styles from './SelectSubstep.module.css';
import { ChevronRight, Search, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';

interface SelectSubstepProps {
  options: { value: string; label: string; loweredLabel: string }[];
  header: string;
  placeholder: string;

  onClear: () => void;
  onSelect: (newValue: { value: string; label: string }) => void;
}

export const SelectSubstep = ({
  options,
  header,
  placeholder,

  onClear,
  onSelect,
}: SelectSubstepProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const foundOptions = useMemo(() => {
    return options?.filter((o) =>
      o.loweredLabel.includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, options]);

  return (
    <>
      <Input
        before={<Search size={20} />}
        header={header}
        placeholder={placeholder}
        className="inputField"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <List className={styles.list}>
        <Cell
          onClick={onClear}
          className={styles.clearCell}
          after={<Trash size={20} />}
        >
          Сбросить
        </Cell>
        {foundOptions.map((o) => (
          <Cell
            onClick={() => onSelect({ value: o.value, label: o.label })}
            after={<ChevronRight size={20} />}
            key={o.value}
            className={styles.cell}
          >
            {o.label}
          </Cell>
        ))}
      </List>
    </>
  );
};
