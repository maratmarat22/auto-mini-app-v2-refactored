import { Button } from "@telegram-apps/telegram-ui";
import styles from "./Footer.module.css";
import { useWizardStore } from "../../model/store";
import {
  STEPS_CONFIG,
  type NextButtonAction,
  type PrevButtonAction,
} from "../../model/stepsConfig";

export const WizardFooter = () => {
  const { stepIndex, handlePrevStep, handleNextStep } = useWizardStore();
  const stepSchema = STEPS_CONFIG[stepIndex];

  const prevActions: Record<NonNullable<PrevButtonAction>, () => void> = {
    prev: handlePrevStep,
    reset: handlePrevStep,
    retry: handlePrevStep,
  };

  const nextActions: Record<NextButtonAction, () => void> = {
    next: handleNextStep,
    submit: handleNextStep,
    exit: handleNextStep,
  };

  return (
    <div className={styles.footer}>
      <div className={styles.buttonsContainer}>
        {stepSchema.prevButtonVisible && (
          <Button
            className={styles.button}
            onClick={prevActions[stepSchema.prevButtonAction ?? "prev"]}
            mode="gray"
          >
            {stepSchema.prevButtonText}
          </Button>
        )}
        {stepSchema.nextButtonVisible && (
          <Button
            className={styles.button}
            onClick={nextActions[stepSchema.nextButtonAction]}
          >
            {stepSchema.nextButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};
