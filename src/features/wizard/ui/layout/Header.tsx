import { Caption, Headline } from "@telegram-apps/telegram-ui";
import styles from "./Header.module.css";
import { useWizardStore } from "../../model/store";
import { STEPS_CONFIG } from "../../model/stepsConfig";

export const WizardHeader = () => {
  const { stepIndex } = useWizardStore();
  const stepSchema = STEPS_CONFIG[stepIndex];

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <Caption weight="2" className={styles.counter}>
          ШАГ {stepIndex + 1} ИЗ {STEPS_CONFIG.length}
        </Caption>
        <Headline weight="1" className={styles.title}>
          {stepSchema.title}
        </Headline>
      </div>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${((stepIndex + 1) / STEPS_CONFIG.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
