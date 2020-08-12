import unauthorized from '../responses/unauthorized';
import authorize from '../utils/authorize';
import { hasCode } from '../utils/authorization';
import parseJSON from '../utils/parse-json';
import ok from '../responses/ok';
import created from '../responses/created';
import bad from '../responses/bad';
import forbidden from '../responses/forbidden';
import notFound from '../responses/not-found';
import { required } from '../responses/authorization';
import { assert } from '@ember/debug';
import lastVerified from './user/last-verified';

export const STEPS = [
  'purpose',
  'product-settings',
  'email',
  'personal-info',
  'family-status',
  'housing',
  'education',
  'income-source',
  'employer',
  'incomes',
  'expenses',
  'personal-number',
  'phone',
  'addresses',
];

const STEPS_NEXT = [
  'purpose',
  'product-settings',
  'email',
  'personal-info',
  'second-loan-summary',
  'product-settings-correction',
  'family-status',
  'housing',
  'education',
  'income-source',
  'employer',
  'incomes',
  'expenses',
  'personal-number',
  'phone',
  'addresses',
];

const INCOME_SOURCES_WITH_EMPLOYER_STEP = [
  'ENTREPRENEUR',
  'EMPLOYMENT',
  'SELF_EMPLOYMENT',
];

export default class BorrowerBackendDrivenOnboarding {
  steps = STEPS;

  unfinishedStep = null;

  maxTotalAmount = 0;

  maxAmount = 0;

  amountStep = 0;

  maxAnnuity = 0;

  minAnnuity = 0;

  annuityStep = 0;

  currentDebt = 0;

  get calculator() {
    return {
      maxTotalAmount: this.maxTotalAmount,
      maxAmount: this.maxAmount,
      minAmount: this.minAmount,
      amountStep: this.amountStep,
      maxAnnuity: this.maxAnnuity,
      minAnnuity: this.minAnnuity,
      annuityStep: this.annuityStep,
      currentDebt: this.currentDebt,
    };
  }

  getResponseMeta({ step, record } = {}) {
    const { steps, unfinishedStep } = this;
    const index = steps.indexOf(step || unfinishedStep);
    let previousStep;

    if (step === 'addresses') {
      previousStep = steps[index - 2];
    } else if (
      step === 'incomes' &&
      !INCOME_SOURCES_WITH_EMPLOYER_STEP.includes(record.incomeSource)
    ) {
      previousStep = steps[index - 2];
    } else if (step === 'family-status') {
      previousStep = this.isNext ? steps[index - 2] : steps[index - 1];
    } else if (step === 'second-loan-summary') {
      previousStep = steps[index - 3];
    } else {
      previousStep = steps[index - 1];
    }

    const progress = {
      previousStep,
      unfinishedStep,
    };

    return { progress, steps };
  }

  setUnfinishedStep({ step, record } = {}) {
    const indexOfCurrentStep = this.steps.indexOf(step);
    const indexOfUnfinishedStep = this.steps.indexOf(this.unfinishedStep);
    if (
      indexOfUnfinishedStep === indexOfCurrentStep ||
      step === 'income-source'
    ) {
      if (!step) {
        if (
          this.isNext &&
          this.currentDebt + record.requestedAmount > this.maxTotalAmount
        ) {
          this.unfinishedStep = 'product-settings-correction';
        } else if (record.leadId) {
          this.unfinishedStep = 'purpose';
        } else {
          this.unfinishedStep = 'family-status';
        }
      } else if (
        step === 'income-source' &&
        !INCOME_SOURCES_WITH_EMPLOYER_STEP.includes(record.incomeSource)
      ) {
        this.unfinishedStep = 'incomes';
      } else if (step === 'personal-number') {
        this.unfinishedStep = 'addresses';
      } else {
        const currentStepIndex = this.steps.indexOf(step);
        this.unfinishedStep =
          this.steps[currentStepIndex + 1] || this.steps.lastItem;
      }
    }
  }

  getOnboardingApplication = () => ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const record = db.borrowerApplications.findBy({ userId: token.userId });
    if (!record) {
      return notFound();
    }

    if (!this.unfinishedStep) {
      this.setUnfinishedStep({ record });
    }

    const response = this.getResponseMeta({ record });
    response.id = record.id;
    return ok(response);
  };

  getOnboardingApplicationStep = () => ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const record = db.borrowerApplications.findBy({ userId: token.userId });
    if (!record) {
      return notFound();
    }

    let data;

    const { step } = request.params;
    switch (step) {
      case 'purpose': {
        data = {
          purpose: record.purpose,
        };
        break;
      }
      case 'product-settings':
      case 'product-settings-correction': {
        this.buildCalculator({ db });
        data = {
          interestedInInsurance: record.interestedInInsurance,
          requestedAmount: record.requestedAmount,
          requestedAnnuity: record.requestedAnnuity,
          ...this.calculator,
        };
        break;
      }
      case 'email': {
        const user = db.users.findBy({ id: token.userId });
        data = {
          email: user.email,
          promoCode: record.promoCode,
        };
        break;
      }
      case 'personal-info': {
        data = {
          givenNames: record.givenNames,
          familyNames: record.familyNames,
          phone: record.phone,
          businessTermsConsent: record.businessTermsConsent,
        };
        break;
      }
      case 'family-status': {
        data = {
          maritalStatus: record.maritalStatus,
          numberOfDependentChildren: record.numberOfDependentChildren,
        };
        break;
      }
      case 'housing': {
        data = {
          housingType: record.housingType,
        };
        break;
      }
      case 'education': {
        data = {
          education: record.education,
        };
        break;
      }
      case 'income-source': {
        data = {
          incomeSource: record.incomeSource,
        };
        break;
      }
      case 'employer': {
        data = {
          employer: record.employer,
          employerIndustry: record.employerIndustry,
          employerRegistrationNumber: record.employerRegistrationNumber,
          incomeSource: record.incomeSource,
        };
        break;
      }
      case 'incomes': {
        data = {
          primaryIncomeSourceAmount: record.primaryIncomeSourceAmount,
          totalHouseholdIncome: record.totalHouseholdIncome,
          sharedHousehold: record.sharedHousehold,
          otherIncomes: record.otherIncomes,
        };
        break;
      }
      case 'expenses': {
        data = {
          totalExpenses: record.totalExpenses,
          housingExpenses: record.housingExpenses,
        };
        break;
      }
      case 'personal-number': {
        data = {
          personalNumber: record.personalNumber,
          personalNumberChangeEnabled: !this.isNext,
          politicallyExposed: record.politicallyExposed,
          refinanceOverviewConsent: record.refinanceOverviewConsent,
          telcoScoreConsent: record.telcoScoreConsent,
        };
        break;
      }
      case 'phone': {
        data = {
          phone: record.phone,
          phoneChangeEnabled: !this.isNext,
        };
        break;
      }
      case 'addresses': {
        data = {
          phone: record.phone,
          permanentAddress: record.permanentAddress,
          contactAddress: record.contactAddress,
        };
        break;
      }
      default: {
        break;
      }
    }

    const { progress } = this.getResponseMeta({ step, record });

    return ok({ progress, data });
  };

  updateOnboardingApplication = () => ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const { step } = request.params;
    let record = db.borrowerApplications.findBy({ userId: token.userId });
    if (!record) {
      return forbidden();
    }

    if (step === 'signature') {
      if (hasCode(request)) {
        db.borrowerApplications.update(record.id, { status: 'SCORED' });
        return ok();
      }

      return required();
    }

    const data = JSON.parse(request.requestBody);

    if (step === 'family-status') {
      data.sharedHousehold =
        data.numberOfDependentChildren > 0 ||
        data.maritalStatus === 'MARRIED' ||
        data.maritalStatus === 'REGISTERED_PARTNERSHIP';
    } else if (step === 'employer') {
      assert('employer must be present', data.employer);
      assert(
        'employerIndustry or employerRegistrationNumber must be present',
        data.employerIndustry || data.employerRegistrationNumber
      );
    } else if (step === 'incomes') {
      assert(
        'primaryIncomeSourceAmount must be a number if present',
        !data.primaryIncomeSourceAmount ||
          typeof data.primaryIncomeSourceAmount === 'number'
      );
      assert(
        'totalHouseholdIncome must be a number if present',
        !data.totalHouseholdIncome ||
          typeof data.totalHouseholdIncome === 'number'
      );

      if (data.totalHouseholdIncome > 0) {
        let peronsalIncome =
          data.primaryIncomeSourceAmount +
          data.otherIncomes
            .map(i => {
              assert(
                `${i.source} amount must be a number`,
                typeof i.amount === 'number'
              );
              return i.amount;
            })
            .reduce((a, b) => a + b, 0);

        if (peronsalIncome > data.totalHouseholdIncome) {
          return bad({
            error: 'INVALID_VALUE',
            description:
              'primaryIncomeSourceAmount with otherIncomes amounts can not exceed totalHouseholdIncome.',
            uuid: 'c0136f62-6d67-4112-aacc-68bdddd603d6',
          });
        }
      }
    } else if (step === 'personal-number') {
      if (this.isNext) {
        delete data.personalNumber;
      }
    }

    record = db.borrowerApplications.update(record.id, data);

    this.setUnfinishedStep({ step, record });
    const { progress } = this.getResponseMeta({ step, record });

    return ok({ progress });
  };

  createOnboardingApplication = () => ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let { user } = token;
    let isNext = lastVerified(user, db);
    let data = parseJSON(request);

    this.isNext = isNext;
    if (isNext) {
      this.steps = STEPS_NEXT;
    }

    this.buildCalculator({ db });

    assert('businessTermsConsent is required', data.businessTermsConsent);
    assert('personalInfoConsent is required', data.personalInfoConsent);

    let record;

    if (data.affiliate) {
      assert('leadId is required in data.affiliate', data.affiliate.leadId);
      assert(
        'givenNames is required in data.affiliate',
        data.affiliate.givenNames
      );
      assert(
        'familyNames is required in data.affiliate',
        data.affiliate.familyNames
      );
      assert(
        'personalNumber is required in data.affiliate',
        data.affiliate.personalNumber
      );

      record = db.borrowerApplications.insert({
        userId: token.userId,
        businessTermsConsent: data.businessTermsConsent,
        personalInfoConsent: data.personalInfoConsent,
        leadId: data.affiliate.leadId,
        requestedAmount: data.affiliate.requestedLoanAmount,
        givenNames: data.affiliate.givenNames,
        familyNames: data.affiliate.familyNames,
        phone: data.affiliate.phone,
        personalNumber: data.affiliate.personalNo,
        permanentAddress: data.affiliate.permanentAddress,
      });
    } else {
      assert(
        'purpose is required in data.stepdata.purpose',
        data.stepData.purpose.purpose
      );

      assert(
        'requestedAmount is required in data.stepdata.product-settings',
        data.stepData['product-settings'].requestedAmount
      );
      assert(
        'requestedAnnuity is required in data.stepdata.product-settings',
        data.stepData['product-settings'].requestedAnnuity
      );

      assert(
        'interestedInInsurance is required in data.stepdata.product-settings',
        'interestedInInsurance' in data.stepData['product-settings']
      );

      if (isNext) {
        assert(
          'second-loan-summary is required in data.stepdata for next application',
          data.stepData['second-loan-summary']
        );
        assert(
          'email should not be present in data.stepdata for next application',
          !data.stepData.email
        );
        assert(
          'personal-info should not be present in data.stepdata for next application',
          !data.stepData['personal-info']
        );
      } else {
        assert(
          'second-loan-summary should not be present in data.stepdata for first application',
          !data.stepData['second-loan-summary']
        );
        assert(
          'email is required in data.stepdata for first application',
          data.stepData.email
        );
        assert(
          'givenNames is required in data.stepdata.personal-info for first application',
          data.stepData['personal-info'].givenNames
        );
        assert(
          'familyNames is required in data.stepdata.personal-info for first application',
          data.stepData['personal-info'].familyNames
        );
        assert(
          'phone is required in data.stepdata.personal-info for first application',
          data.stepData['personal-info'].phone
        );
      }

      record = db.borrowerApplications.insert({
        userId: token.userId,
        status: 'APPLIED',
        businessTermsConsent: data.businessTermsConsent,
        personalInfoConsent: data.personalInfoConsent,
        affilboxId: data.affilboxId,
        purpose: data.stepData.purpose.purpose,
        requestedAmount: data.stepData['product-settings'].requestedAmount,
        requestedAnnuity: data.stepData['product-settings'].requestedAnnuity,
        interestedInInsurance:
          data.stepData['product-settings'].interestedInInsurance,
        promoCode: isNext
          ? data.stepData['second-loan-summary'].promoCode
          : data.stepData.email.promoCode,
        givenNames: isNext
          ? user.firstName
          : data.stepData['personal-info'].givenNames,
        familyNames: isNext
          ? user.surname
          : data.stepData['personal-info'].familyNames,
        phone: isNext ? user.phone : data.stepData['personal-info'].phone,
        personalNumber: isNext ? user.personalNo : null,
      });
    }

    this.setUnfinishedStep({ record });

    const response = this.getResponseMeta();
    response.id = record.id;
    return created(response);
  };

  buildCalculator({ db }) {
    function number(key) {
      return parseInt(db.systemParameters.findBy({ key }).value, 10);
    }

    this.currentDebt = this.isNext ? 200000 : 0;
    this.maxTotalAmount = number('REQUESTED_AMOUNT_MAX');
    this.maxAmount = this.maxTotalAmount - this.currentDebt;
    this.minAmount = number('REQUESTED_AMOUNT_MIN');
    this.amountStep = number('REQUESTED_AMOUNT_STEP');
    this.maxAnnuity = number('ANNUITY_MAX');
    this.minAnnuity = number('ANNUITY_MIN');
    this.annuityStep = number('ANNUITY_STEP');
  }
}
