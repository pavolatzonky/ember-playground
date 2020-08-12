import EmberObject from '@ember/object';

const STEPS = [
  'name',
  'personal-number',
  'documents',
  'primary-document',
  'secondary-document-type',
  'secondary-document',
  'bank-account',
  'addresses',
  'phone',
  'summary',
  'agreement',
  'signature',
];

const RENTIER_STEPS = ['investment-calculator', 'investment-plan', ...STEPS];

class BackendDrivenOnboarding extends EmberObject {
  lastCompletedStep;

  steps = [];

  setLastCompletedStep(index) {
    const lastCompletedStep = this.steps[index] || 'name';

    this.set('lastCompletedStep', lastCompletedStep);
  }

  getResponseMeta({ step, isNextStep } = {}) {
    const { steps, lastCompletedStep } = this;

    const currentStep = step || lastCompletedStep;
    const index = steps.indexOf(lastCompletedStep);
    const unfinishedStepIndex = index + 1;
    const unfinishedStep = steps[unfinishedStepIndex];

    const progress = {
      currentStep,
      unfinishedStep,
    };

    if (isNextStep) {
      const currentIndex = steps.indexOf(currentStep);
      const nextStep = steps[currentIndex + 1];
      const summaryIndex = steps.indexOf('summary');

      if (unfinishedStepIndex < summaryIndex) {
        progress.currentStep = nextStep;
      } else {
        progress.currentStep = unfinishedStep;
      }
    }

    return { progress, steps };
  }

  isLastStep(step) {
    const { steps, lastCompletedStep } = this;

    if (step) {
      const stepIndex = steps.indexOf(step);
      const lastCompletedStepIndex = steps.indexOf(lastCompletedStep);

      return stepIndex > lastCompletedStepIndex;
    }
  }

  processNextStep(step) {
    if (this.isLastStep(step)) {
      this.set('lastCompletedStep', step);
    }
  }
}

class BackendDrivenInvestorOnboarding extends BackendDrivenOnboarding {
  steps = STEPS;
}

class BackendDrivenRentierOnboarding extends BackendDrivenOnboarding {
  lastCompletedStep = 'investment-plan';
  steps = RENTIER_STEPS;
}

export const backendDrivenOnboarding = {
  investor: BackendDrivenInvestorOnboarding,
  rentier: BackendDrivenRentierOnboarding,
};
