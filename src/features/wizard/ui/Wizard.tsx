import type React from 'react';
import {
  STEPS_CONFIG,
  WIZARD_STEP,
  type WizardStepId,
} from '../model/stepsConfig';
import styles from './Wizard.module.css';
import { WizardFooter } from './layout/Footer';
import { WizardHeader } from './layout/Header';
import { HeroStep } from './steps/HeroStep/HeroStep';
import { useWizardStore } from '../model/store';
import { StepContainer } from './steps/StepContainer';
import { CommentStep } from './steps/CommentStep/CommentStep';
import { BudgetCityStep } from './steps/BudgetCityStep/BudgetCityStep';
import { AutoStep } from './steps/AutoStep/AutoStep';

const STEP_COMPONENTS: Record<WizardStepId, React.FC> = {
  [WIZARD_STEP.HERO]: HeroStep,
  [WIZARD_STEP.AUTO]: AutoStep,
  [WIZARD_STEP.COMMENT]: CommentStep,
  [WIZARD_STEP.BUDGETCITY]: BudgetCityStep,
  [WIZARD_STEP.SUBMIT]: HeroStep,
  [WIZARD_STEP.STATUS]: HeroStep,
};

export const Wizard = () => {
  const { stepIndex, submitStatus } = useWizardStore();
  const stepSchema = STEPS_CONFIG[stepIndex];
  const StepComponent = STEP_COMPONENTS[stepSchema.id];

  let stepIcon = stepSchema.icon;
  let stepTitle = stepSchema.title;
  let stepDescription = stepSchema.description;
  let failOccured = false;
  if (stepSchema.id === WIZARD_STEP.STATUS && submitStatus === 'fail') {
    stepIcon = stepSchema.iconAlt ?? stepSchema.icon;
    stepTitle = stepSchema.titleAlt ?? stepSchema.title;
    stepDescription = stepSchema.descriptionAlt ?? stepSchema.description;
    failOccured = true;
  }

  return (
    <div className={styles.wizardLayout}>
      <div className={styles.scrollable}>
        <div className={styles.headerContainer}>
          <WizardHeader />
        </div>

        <div className={styles.mainContainer}>
          {stepSchema.id === WIZARD_STEP.HERO ? (
            <HeroStep />
          ) : (
            <StepContainer
              icon={stepIcon}
              failOccured={failOccured}
              title={stepTitle}
              description={stepDescription}
            >
              <StepComponent />
            </StepContainer>
          )}
        </div>
      </div>

      <div className={styles.footerContainer}>
        <WizardFooter />
      </div>
    </div>
  );
};
