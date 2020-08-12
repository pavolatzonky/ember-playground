import unauthorized from '../responses/unauthorized';
import authorize from '../utils/authorize';
import { hasCode } from '../utils/authorization';
import parseJSON from '../utils/parse-json';
import ok from '../responses/ok';
import bad from '../responses/bad';
import gone from '../responses/gone';
import notFound from '../responses/not-found';
import noContent from '../responses/no-content';
import { required } from '../responses/authorization';
import { incAttachmentId } from '../fixtures/investor-records';

const getOnboardingRequirements = (productName, db) => {
  const records = db.investorRecords;
  const products = db[`${productName}s`];

  return {
    records,
    products,
  };
};

export const INVESTOR = 'investor';
export const RENTIER = 'rentier';

export const getOnboardingApplication = ({ productName, onboarding }) => (
  { db },
  request
) => {
  const token = authorize(db, request);

  if (!token) {
    return unauthorized();
  }

  const { records } = getOnboardingRequirements(productName, db);

  try {
    const record = records.findBy({
      userId: token.userId,
    });

    if (record.status === 'SCORED') {
      return gone();
    }

    onboarding.setLastCompletedStep(record.currentStep);

    const response = onboarding.getResponseMeta();

    return ok(response);
  } catch (error) {
    return notFound();
  }
};

export const getOnboardingApplicationStep = ({ productName, onboarding }) => (
  { db },
  request
) => {
  const token = authorize(db, request);

  if (!token) {
    return unauthorized();
  }

  const { records } = getOnboardingRequirements(productName, db);

  const record = records.findBy({ userId: token.userId });
  if (!record) {
    return bad();
  }

  if (record.status === 'SCORED') {
    return gone();
  }

  let data;

  const { step } = request.params;
  switch (step) {
    case 'investment-calculator':
    case 'investment-plan': {
      data = {
        ...record.investmentPlan,
      };
      break;
    }
    case 'name': {
      data = {
        familyName: record.familyName,
        givenNames: record.givenNames,
        politicallyExposed: record.politicallyExposed,
      };
      break;
    }
    case 'personal-number': {
      data = {
        personalNo: record.personalNo,
        nationality: record.nationality,
      };
      break;
    }
    case 'primary-document': {
      data = {
        attachments: record.attachments,
      };
      break;
    }
    case 'secondary-document': {
      data = {
        secondaryDocumentType: record.secondaryDocumentType,
        attachments: record.attachments,
      };
      break;
    }
    case 'secondary-document-type': {
      data = {
        secondaryDocumentType: record.secondaryDocumentType,
      };
      break;
    }
    case 'bank-account': {
      const bankAccount = record.bankAccount;
      bankAccount.accountNumber = bankAccount.accountNo;
      bankAccount.bankCode = bankAccount.accountBank;
      data = {
        bankAccount,
        antiMoneyLaunderingConsent: record.antiMoneyLaunderingConsent,
        incomeSources: record.incomeSources,
      };
      break;
    }
    case 'addresses': {
      data = {
        permanentAddress: record.permanentAddress,
        contactAddress: record.contactAddress,
      };
      break;
    }
    case 'phone': {
      data = {
        phone: record.phone,
      };
      break;
    }
    case 'summary': {
      data = {
        email: record.email,
        givenNames: record.givenNames,
        familyName: record.familyName,
        personalNo: record.personalNo,
        phone: record.phone,
        bankAccount: record.bankAccount,
        permanentAddress: record.permanentAddress,
        contactAddress: record.contactAddress,
        secondaryDocumentType: record.secondaryDocumentType,
      };
      break;
    }
    case 'agreement': {
      data = {
        businessParticipationConsent: record.businessParticipationConsent,
        generalParticipationConsent: record.generalParticipationConsent,
        paymentServicesConsent: record.paymentServicesConsent,
        taxResidency: record.taxResidency || { year: 2018 },
      };
      break;
    }
    case 'signature': {
      data = {
        phone: record.phone,
      };
      break;
    }
    default: {
      break;
    }
  }

  const { progress } = onboarding.getResponseMeta({
    step,
  });

  return ok({ progress, data });
};

export const updateOnboardingApplication = ({ productName, onboarding }) => (
  { db },
  request
) => {
  const token = authorize(db, request);

  if (!token) {
    return unauthorized();
  }

  const { step } = request.params;
  const { userId } = token;
  const { records } = getOnboardingRequirements(productName, db);

  if (step === 'signature') {
    if (hasCode(request)) {
      records.update({ userId }, { status: 'SCORED' });

      if (INVESTOR === productName) {
        return noContent({
          'Content-Type': 'application/json;charset=UTF-8',
        });
      }

      if (RENTIER === productName) {
        const user = db.users.findBy({ id: userId });

        db.zPlusWallets.insert({
          balance: 0,
          availableBalance: 0,
          blockedBalance: 0,
          variableSymbol: 800900222,
          investmentType: 'P',
          userId,
        });

        return ok(user);
      }
    }

    return required();
  }

  const record = records.findBy({ userId });
  const requestBody = JSON.parse(request.requestBody);

  const addKeyToRecord = record => {
    for (let key in requestBody) {
      record[key] = requestBody[key];
    }
  };

  if (step === 'investment-calculator') {
    addKeyToRecord(record.investmentPlan);
  } else {
    addKeyToRecord(record);
  }

  records.update(record.id, record);

  onboarding.processNextStep(step);

  const { progress } = onboarding.getResponseMeta({
    step,
    isNextStep: true,
  });

  return ok({ progress });
};

export const getOnboardingApplicationAttachments = ({
  productName,
  uriPrefix,
}) => ({ db }, request) => {
  const token = authorize(db, request);
  if (!token) {
    return unauthorized();
  }
  const { records } = getOnboardingRequirements(productName, db);
  const { position, attachmentType } = request.queryParams;

  const record = records.findBy({ userId: token.userId });
  const attachments = record.attachments || [];
  const attId = incAttachmentId();

  attachments.push({
    id: attId,
    position: parseInt(position),
    documentType: attachmentType,
    uri: `/${uriPrefix}/${productName}-application/attachments/${attId}`,
  });

  records.update(record.id, {
    attachments,
  });
};

export const getOnboardingApplicationAttachmentById = ({ db }, request) => {
  const token = authorize(db, request);

  if (!token) {
    return unauthorized();
  }

  return 'data:image/png;base64,blob';
};

export const deleteOnboardingApplicationAttachmentById = productName => (
  { db },
  request
) => {
  const token = authorize(db, request);
  const attId = parseInt(request.params.id, 10);

  if (!token) {
    return unauthorized();
  }

  const { records } = getOnboardingRequirements(productName, db);

  const record = records.findBy({ userId: token.userId });
  const attachments = record.attachments;
  const idx = attachments.findIndex(item => item.id === attId);

  if (idx > -1) {
    attachments.splice(idx, 1);
  }
  records.update(record.id, {
    attachments,
  });
};

export const createOnboardingApplication = ({ productName, onboarding }) => (
  { db },
  request
) => {
  const token = authorize(db, request);
  if (!token) {
    return unauthorized();
  }

  const attrs = parseJSON(request);
  const { user } = token;
  const { records, products } = getOnboardingRequirements(productName, db);
  const ROLE = `ROLE_${productName.toUpperCase()}_APPLICANT`;

  if (user.roles.includes(ROLE)) {
    records.insert([
      {
        userId: user.id,
        familyName: attrs.familyName,
        givenNames: attrs.givenNames,
        personalNo: user.personalNo,
        bankAccount: user.bankAccount,
        phone: user.phone,
        permanentAddress: user.permanentAddress,
        contactAddress: user.contactAddress,
        businessTermsConsent: attrs.businessTermsConsent,
        standardInformationConsent: attrs.standardInformationConsent,
        personalInfoConsent: attrs.personalInfoConsent,
        politicallyExposed: attrs.politicallyExposed,
        investmentPlan: attrs['investment-calculator'],
      },
    ]);
  }

  products.insert(attrs);

  const response = onboarding.getResponseMeta({
    isNextStep: true,
  });

  return ok(response);
};
