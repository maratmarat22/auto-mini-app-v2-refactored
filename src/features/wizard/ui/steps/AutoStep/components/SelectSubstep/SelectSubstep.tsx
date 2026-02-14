import {
  Cell,
  IconButton,
  Input,
  List,
  Section,
} from '@telegram-apps/telegram-ui';
import styles from './SelectSubstep.module.css';
import { ChevronRight, Search, XCircle } from 'lucide-react';
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
    const query = searchQuery.toLowerCase();
    return options?.filter((o) => o.loweredLabel.includes(query));
  }, [searchQuery, options]);

  return (
    <>
      {/* Поиск выносим отдельно */}
      <Section header={header}>
        <Input
          before={<Search size={20} color="var(--tgui--subtitle_text_color)" />}
          after={
            searchQuery && (
              <IconButton
                mode="bezeled"
                size="s"
                onClick={() => setSearchQuery('')}
              >
                <XCircle size={16} />
              </IconButton>
            )
          }
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
        />
      </Section>

      <List className={styles.list}>
        {/* Кнопка сброса только если что-то выбрано (логическое условие) */}
        <Section>
          <Cell
            onClick={onClear}
            className={styles.clearCell}
            before={
              <XCircle size={20} color="var(--tgui--destructive_text_color)" />
            }
          >
            <span style={{ color: 'var(--tgui--destructive_text_color)' }}>
              Сбросить выбор
            </span>
          </Cell>
        </Section>

        {/* Результаты поиска в отдельной секции */}
        <Section header={`${foundOptions.length} доступно`}>
          {foundOptions.map((o) => (
            <Cell
              key={o.value}
              onClick={() => onSelect({ value: o.value, label: o.label })}
              after={
                <ChevronRight
                  size={20}
                  color="var(--tgui--subtitle_text_color)"
                />
              }
              multiline
            >
              {o.label}
            </Cell>
          ))}
        </Section>
      </List>
    </>
  );
};
