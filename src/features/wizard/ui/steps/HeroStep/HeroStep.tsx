import { Text, Headline } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';

import logo from './assets/logo.png';

import styles from './HeroStep.module.css';

export const HeroStep = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <img alt="logo" src={logo} style={{ width: 256, height: 256 }} />

        <Headline className="text" weight="1">
          Найди авто своей мечты
        </Headline>
        <div className={styles.features}>
          <motion.div
            className={styles.featureItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className={styles.icon}>⚡️</span>
            <Text className="text">Быстрый поиск по 50+ дилерам</Text>
          </motion.div>

          <motion.div
            className={styles.featureItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className={styles.icon}>🛡️</span>
            <Text className="text">Только проверенные объявления</Text>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
