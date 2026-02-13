import { STEPS_CONFIG, WIZARD_STEP } from '../model/stepsConfig';
import styles from './Wizard.module.css';
import { WizardFooter } from './layout/Footer';
import { WizardHeader } from './layout/Header';
import { useWizardStore } from '../model/store';
import { StepContainer } from './steps/StepContainer';
import { STEP_COMPONENTS } from './config';

export const Wizard = () => {
  const stepIndex = useWizardStore((state) => state.stepIndex);
  const submitStatus = useWizardStore((state) => state.submitStatus);

  const stepSchema = STEPS_CONFIG[stepIndex];
  const StepComponent = STEP_COMPONENTS[stepSchema.id];

  const failOccured =
    stepSchema.id === WIZARD_STEP.STATUS && submitStatus === 'fail';
  const stepProps = {
    icon: failOccured
      ? (stepSchema.iconAlt ?? stepSchema.icon)
      : stepSchema.icon,
    title: failOccured
      ? (stepSchema.titleAlt ?? stepSchema.title)
      : stepSchema.title,
    description: failOccured
      ? (stepSchema.descriptionAlt ?? stepSchema.description)
      : stepSchema.description,
  };

  return (
    <div className={styles.wizardLayout}>
      <div className={styles.scrollable}>
        <div className={styles.headerContainer}>
          <WizardHeader />
        </div>

        <div className={styles.mainContainer}>
          {stepSchema.unique ? (
            <StepComponent />
          ) : (
            <StepContainer
              icon={stepProps.icon}
              title={stepProps.title}
              description={stepProps.description}
              failOccured={failOccured}
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
