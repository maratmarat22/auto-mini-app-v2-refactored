import type { ElementType, ReactNode } from 'react';

import styles from './StepContainer.module.css';
import { Caption, Headline, Subheadline } from '@telegram-apps/telegram-ui';

interface StepContainerProps {
  children: ReactNode;
}

export const StepContainer = ({ children }: StepContainerProps) => {
  return children;
};

interface StepContainerHeaderProps {
  icon: ElementType;
  title: string;
  description: string;
  failOccured: boolean;
}

StepContainer.Header = ({
  icon: Icon,
  title,
  description,
  failOccured = false,
}: StepContainerHeaderProps) => {
  return (
    <div className={styles.header}>
      <div
        className={`${styles.iconContainer} ${failOccured ? styles.failIconContainer : ''}`}
      >
        <Icon size={32} />
      </div>

      <Headline weight="1" className={styles.title}>
        {title}
      </Headline>
      <Subheadline className={styles.description}>{description}</Subheadline>
    </div>
  );
};

interface StepContainerFooterHintProps {
  type: 'error' | 'hint';
  text: string | null;
}

StepContainer.Hint = ({ type, text }: StepContainerFooterHintProps) => {
  if (!text) return null;

  return (
    <div className={type === 'error' ? styles.error : styles.hint}>
      <Caption>{text}</Caption>
    </div>
  );
};
