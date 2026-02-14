import { List, Section, Cell } from '@telegram-apps/telegram-ui';

import styles from './SubmitStep.module.css';
import { useWizardStore } from '@/features/wizard/model/store/store';

export const SubmitStep = () => {
  const store = useWizardStore();
  const logoSrc = `/logos/${store.brand?.id}.png`;

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        {store.brand && (
          <img
            src={logoSrc}
            alt={store.brand.name}
            className={styles.logo}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}
      </div>

      <List>
        <Section header="Информация об автомобиле">
          <Cell subtitle="Марка и модель">
            {store.brand?.name} {store.model?.name}
          </Cell>
        </Section>

        <Section header="Контактные данные"></Section>
      </List>
    </div>
  );
};
