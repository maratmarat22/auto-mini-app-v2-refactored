import { Button } from '@telegram-apps/telegram-ui';
import styles from './Footer.module.css';
import { useWizardStore } from '../../model/store/store';
import {
  STEPS_CONFIG,
  WIZARD_STEP,
  type NextButtonAction,
  type PrevButtonAction,
} from '../../model/configs/stepsConfig';
import { useShallow } from 'zustand/shallow';

export const WizardFooter = () => {
  const state = useWizardStore(
    useShallow((s) => ({
      stepIndex: s.stepIndex,
      handlePrevStep: s.handlePrevStep,
      handleNextStep: s.handleNextStep,
      handleCloseApp: s.handleCloseApp,
      handleCloseSubstep: s.handleCloseSubstep,
      handleConfirmSubstep: s.handleConfirmSubstep,
      handleSubmit: s.handleSubmit,
      handleReset: s.handleReset,
      onSelectSubstep: s.onSelectSubstep,
      onRangeSubstep: s.onRangeSubstep,
      submitStatus: s.submitStatus,
    })),
  );

  const stepSchema = STEPS_CONFIG[state.stepIndex];

  const stepValid =
    useWizardStore((s) => s.validateStep(stepSchema.id)) === null;

  const prevActions: Record<NonNullable<PrevButtonAction>, () => void> = {
    prev: state.handlePrevStep,
    reset: state.handleReset,
    retry: state.handlePrevStep,
    closeSubstep: state.handleCloseSubstep,
  };

  const nextActions: Record<NextButtonAction, () => void> = {
    next: state.handleNextStep,
    submit: state.handleSubmit,
    closeApp: state.handleCloseApp,
    confirmSubstep: state.handleConfirmSubstep,
  };

  const prevButtonVisible =
    state.onSelectSubstep ||
    state.onRangeSubstep ||
    stepSchema.prevButtonVisible;

  let prevButtonAction;
  let prevButtonText;

  if (state.onSelectSubstep || state.onRangeSubstep) {
    prevButtonAction = state.handleCloseSubstep;
    prevButtonText = stepSchema.prevButtonText;
  } else if (stepSchema.id === WIZARD_STEP.STATUS) {
    if (state.submitStatus === 'fail') {
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

  const nextButtonVisible =
    !state.onSelectSubstep && stepSchema.nextButtonVisible;

  let nextButtonAction;
  let nextButtonText;

  if (state.onRangeSubstep) {
    nextButtonAction = state.handleConfirmSubstep;
    nextButtonText = 'Подтвердить';
  } else {
    nextButtonAction = nextActions[stepSchema.nextButtonAction];
    nextButtonText = stepSchema.nextButtonText;
  }

  return (
    <div className={styles.footer}>
      <div className={styles.buttonsContainer}>
        {prevButtonVisible && (
          <Button
            className={`${styles.backButton} ${styles.button}`}
            onClick={prevButtonAction}
            mode="gray"
            size="l"
          >
            {prevButtonText}
          </Button>
        )}
        {nextButtonVisible && (
          <Button
            className={`${styles.nextButton} ${styles.button}`}
            onClick={nextButtonAction}
            size="l"
            disabled={!stepValid && !state.onRangeSubstep}
          >
            {nextButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};
