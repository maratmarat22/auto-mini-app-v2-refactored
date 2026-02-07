import type React from "react";
import {
  STEPS_CONFIG,
  WIZARD_STEP,
  type WizardStepId,
} from "../model/stepsConfig";
import styles from "./Wizard.module.css";
import { WizardFooter } from "./layout/Footer";
import { WizardHeader } from "./layout/Header";
import { HeroStep } from "./steps/HeroStep/HeroStep";
import { useWizardStore } from "../model/store";
import { StepContainer } from "./steps/StepContainer";

const STEP_COMPONENTS: Record<WizardStepId, React.FC> = {
  [WIZARD_STEP.HERO]: HeroStep,
  [WIZARD_STEP.AUTO]: HeroStep,
  [WIZARD_STEP.COMMENT]: HeroStep,
  [WIZARD_STEP.BUDGETCITY]: HeroStep,
  [WIZARD_STEP.SUBMIT]: HeroStep,
  [WIZARD_STEP.STATUS]: HeroStep,
};

export const Wizard = () => {
  const { stepIndex } = useWizardStore();
  const stepSchema = STEPS_CONFIG[stepIndex];
  const StepComponent = STEP_COMPONENTS[stepSchema.id];

  return (
    <div className={styles.wizardLayout}>
      <div className={styles.headerContainer}>
        <WizardHeader />
      </div>

      <div className={styles.mainContainer}>
        {stepSchema.id === WIZARD_STEP.HERO ? (
          <>
            <HeroStep />
            <HeroStep />
          </>
        ) : (
          <StepContainer
            icon={stepSchema.icon}
            title={stepSchema.title}
            description={stepSchema.description}
          >
            <StepComponent />
          </StepContainer>
        )}
      </div>

      <div className={styles.footerContainer}>
        <WizardFooter />
      </div>
    </div>
  );
};
