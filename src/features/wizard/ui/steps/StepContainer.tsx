import type { ElementType, ReactNode } from "react";

import styles from "./StepContainer.module.css";
import { Headline, Subheadline } from "@telegram-apps/telegram-ui";

interface StepContainerProps {
  icon: ElementType;
  title: string;
  description: string;
  children?: ReactNode;
}

export const StepContainer = ({
  icon: Icon,
  title,
  description,
  children,
}: StepContainerProps) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon size={32} />
        </div>

        <Headline weight="1">{title}</Headline>
        <Subheadline className={styles.description}>{description}</Subheadline>
      </div>
      {children}
    </>
  );
};
