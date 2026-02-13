import { Text, Headline } from '@telegram-apps/telegram-ui';

import logo from './assets/logo.png';

import styles from './HeroStep.module.css';

export const HeroStep = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img alt="logo" src={logo} style={{ width: 256, height: 256 }} />

        <Headline className="text" weight="1">
          Найди авто своей мечты
        </Headline>

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <span className={styles.icon}>⚡️</span>
            <Text className="text">Быстрый поиск по 50+ дилерам</Text>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>🛡️</span>
            <Text className="text">Только проверенные объявления</Text>
          </div>
        </div>
      </div>
    </div>
  );
};
