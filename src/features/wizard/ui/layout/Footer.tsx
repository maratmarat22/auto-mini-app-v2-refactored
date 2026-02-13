import { Button } from '@telegram-apps/telegram-ui';
import styles from './Footer.module.css';
import { useWizardStore } from '../../model/store';
import {
  STEPS_CONFIG,
  WIZARD_STEP,
  type NextButtonAction,
  type PrevButtonAction,
} from '../../model/stepsConfig';

export const WizardFooter = () => {
  const {
    stepIndex,
    handlePrevStep,
    handleNextStep,
    handleClose,
    handleExitSubstep,
    handleSubmit,
    handleReset,
    onSubstep: onSubstep,
    submitStatus,
  } = useWizardStore();
  const stepSchema = STEPS_CONFIG[stepIndex];

  const prevActions: Record<NonNullable<PrevButtonAction>, () => void> = {
    prev: handlePrevStep,
    reset: handleReset,
    retry: handlePrevStep,
    exitSubstep: handleExitSubstep,
  };

  const nextActions: Record<NextButtonAction, () => void> = {
    next: handleNextStep,
    submit: handleSubmit,
    exit: handleClose,
  };

  const prevButtonVisible = onSubstep || stepSchema.prevButtonVisible;

  let prevButtonAction;
  let prevButtonText;
  if (onSubstep) {
    prevButtonAction = handleExitSubstep;
    prevButtonText = stepSchema.prevButtonText;
  } else if (stepSchema.id === WIZARD_STEP.STATUS) {
    if (submitStatus === 'fail') {
      prevButtonAction = prevActions[stepSchema.prevButtonActionAlt ?? 'prev'];
      prevButtonText = stepSchema.prevButtonTextAlt;
    } else {
      prevButtonAction = prevActions[stepSchema.prevButtonAction ?? 'prev'];
      prevButtonText = stepSchema.prevButtonText;
    }
  } else {
    prevButtonAction = prevActions[stepSchema.prevButtonAction!];
    prevButtonText = stepSchema.prevButtonText;
  }

  return (
    <div className={styles.footer}>
      <div className={styles.buttonsContainer}>
        {prevButtonVisible && (
          <Button
            className={styles.button}
            onClick={prevButtonAction}
            mode="gray"
            size="l"
          >
            {prevButtonText}
          </Button>
        )}
        {!onSubstep && stepSchema.nextButtonVisible && (
          <Button
            className={styles.nextButton}
            onClick={nextActions[stepSchema.nextButtonAction]}
            size="l"
          >
            {stepSchema.nextButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};
