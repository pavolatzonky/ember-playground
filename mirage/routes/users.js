import { A } from '@ember/array';
import { assert } from '@ember/debug';
import authorize from 'ember-playground/mirage/utils/authorize';
import unauthorized from 'ember-playground/mirage/responses/unauthorized';
import ok from 'ember-playground/mirage/responses/ok';
import bad from 'ember-playground/mirage/responses/bad';
import conflict from 'ember-playground/mirage/responses/conflict';
import notFound from 'ember-playground/mirage/responses/not-found';
import paginated from 'ember-playground/mirage/responses/paginated';
import image from 'ember-playground/mirage/responses/image';
import noContent from 'ember-playground/mirage/responses/no-content';
import captcha from 'ember-playground/mirage/responses/captcha';
import { required, failed } from 'ember-playground/mirage/responses/authorization';
import parseJSON from 'ember-playground/mirage/utils/parse-json';
import authenticate from 'ember-playground/mirage/utils/authenticate';
import unsupportedMediaType from '../responses/unsupported-media-type';
import { hasCode, getCode } from '../utils/authorization';
import feature from '../utils/features';
import lastVerified from '../utils/user/last-verified';

export default function(mirage) {
  const isUserInvestorInMicroservice = () =>
    feature('onboarding-investor-in-microservice', mirage);

  const isUserInvestorInModule = type => {
    const flagName =
      type !== 'rentier' ? 'p2p-onboarding-investor' : 'p2p-onboarding-rentier';

    return feature(flagName, mirage);
  };

  mirage.post('/users', ({ db }, request) => {
    let attrs = parseJSON(request);
    let users = db.users.where({ email: attrs.email });
    attrs.username = attrs.email;
    if (attrs.roles.indexOf('ROLE_INVESTOR') > -1) {
      attrs.roles = ['SCOPE_APP_WEB', 'ROLE_INVESTOR_APPLICANT'];
      attrs.taxResidency = { currentYear: new Date().getFullYear() - 1 };
      if (isUserInvestorInMicroservice()) {
        attrs.onboardingInvestorInMicroservice = true;
      } else {
        attrs.onboardingInvestorInModule = isUserInvestorInModule();
      }
    }

    if (attrs.roles.indexOf('ROLE_BORROWER') > -1) {
      attrs.roles = ['SCOPE_APP_WEB', 'ROLE_BORROWER'];

      assert('email is required', attrs.email);
      assert('firstName is required', attrs.firstName);
      assert('surname is required', attrs.surname);
      assert('phone is required', attrs.phone);
    }

    if (attrs.roles.indexOf('ROLE_RENTIER') > -1) {
      attrs.roles = ['SCOPE_APP_WEB', 'ROLE_RENTIER_APPLICANT'];
      attrs.taxResidency = { currentYear: new Date().getFullYear() - 1 };
      attrs.onboardingRentierInModule = isUserInvestorInModule('rentier');
    }

    if (!attrs.nickName) {
      attrs.nickName = `zonky${Math.floor(Math.random() * Math.pow(10, 7))}`;
    }

    let captchaIsMissing =
      attrs.username === 'captcha_user_create@zonkej.cz' &&
      !attrs.captcha_response; // eslint-disable-line camelcase

    if (captchaIsMissing) {
      return captcha();
    }

    if (users.length > 0) {
      return conflict();
    }

    attrs.dateRegistered = new Date();

    let user = db.users.insert(attrs);
    authenticate(db, {
      email: user.email,
    });
    return ok(user);
  });

  mirage.get('/users/me', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return db.users.find(token.userId);
  });

  mirage.get('/users/me/investor-requests', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return A(db.investorRecords.where({ userId: token.userId })).map(item => {
      delete item.userId;
      return item;
    });
  });

  mirage.get('/users/me/loans', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return A(
      db.borrowerRecords.where({
        userId: token.userId,
        fromMicroService: false,
      })
    ).map(item => {
      delete item.userId;
      delete item.fromMicroService;
      return item;
    });
  });

  mirage.get('/onboarding/loan-applications/me', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return A(
      db.borrowerRecords.where({ userId: token.userId, fromMicroService: true })
    ).map(item => {
      delete item.userId;
      delete item.fromMicroService;
      return item;
    });
  });

  mirage.get('/users/me/loans/next', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return (
      db.borrowerApplicationVerifications.findBy({ userId: token.userId }) || {
        status: 'POSSIBLE',
        reasons: [],
        userId: token.userId,
      }
    );
  });

  mirage.get(
    'users/me/loans/:id/covid-postponement-defaults',
    ({ db }, request) => {
      const token = authorize(db, request);

      if (!token) {
        return unauthorized();
      }

      const defaults = {
        disableDateSelection: true,
      };

      return ok(defaults);
    }
  );

  mirage.get('users/me/loans/:id/covid-postponement', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const postponementInfo = {
      postponedInstalment: {
        currentDate: '2020-04-15',
        newDate: '2020-11-15',
      },
      postponedInstalmentsCount: 6,
      onlyPremiumInstalmentsCount: 4,
      additionalInterest: 8500.0,
      additionalCosts: 10000.0,
      premium: 250.0,
      additionalPremium: 1500.0,
      currentSummary: {
        term: 66,
        amountPaidBack: 34576.0,
      },
      newSummary: {
        term: 72,
        amountPaidBack: 44576.0,
      },
    };

    return ok(postponementInfo);
  });

  mirage.post('users/me/loans/:id/covid-postponement', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return noContent();
  });

  mirage.delete('users/me/loans/:id/covid-postponement', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return noContent();
  });

  mirage.get('/users/me/loans/top-up/allowance', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let userId = token.userId;

    const borrowerApplicationTopUpVerification = db.borrowerApplicationTopUpVerifications.findBy(
      {
        userId,
      }
    );

    return borrowerApplicationTopUpVerification || notFound();
  });

  mirage.post('/users/me/loans/application/top-up', ({ db }, request) => {
    const token = authorize(db, request);
    let attrs = parseJSON(request);

    if (!token) {
      return unauthorized();
    }

    return ok(db.borrowerApplicationTopUpLoans.insert(attrs));
  });

  mirage.get('/users/me/loan/:id/qr-payment', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return image();
  });

  mirage.get('/users/me/loan/:id/qr-repayment', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return image();
  });

  mirage.get('/users/me/logout', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    db.tokens.remove(token.userId);
    return ok();
  });

  mirage.get('/users/me/notifications', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let data = A(db.userNotifications.where({ userId: token.userId })).map(
      item => {
        delete item.userId;
        return item;
      }
    );

    return paginated(data, request);
  });

  mirage.patch('/users/me/notifications', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return {};
  });

  mirage.get('/users/me/notifications/subscriptions', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return A(
      db.userNotificationsSubscriptions.where({ userId: token.userId })
    ).map(item => {
      delete item.userId;
      return item;
    });
  });

  mirage.put('/users/me/notifications/subscriptions', () => ok());

  mirage.get('/users/me/wallets', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let userWallets = A(db.userWallets.where({ userId: token.userId }));

    userWallets = userWallets.map(item => {
      delete item.userId;
      delete item.id;
      return item;
    });

    return ok(userWallets);
  });

  mirage.post('/users/me/wallets', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const attrs = parseJSON(request);

    const userWallet = db.userWallets.insert({
      ...attrs,
      variableSymbol: '666103',
      creditSum: 0,
      debitSum: 0,
      account: {
        accountNo: '0000002020010045',
        bankCode: '0300',
        name: 'P2P JUMBO',
      },
      balance: {
        available: 0,
        blocked: 0,
        total: 0,
      },
    });

    delete userWallet.id;

    return ok(userWallet);
  });

  mirage.get('/users/me/wallet', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let wallets = A(db.wallets.where({ userId: token.userId }));

    wallets = A(
      wallets.map(item => {
        delete item.userId;
        return item;
      })
    );

    return wallets.get('firstObject');
  });

  mirage.get('/users/me/z-plus-wallet', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let zPlusWallet = db.zPlusWallets.findBy({ userId: token.userId });

    delete zPlusWallet.userId;
    return zPlusWallet;
  });

  mirage.get('/users/me/z-plus-wallet/overview', ({ db }, request) => {
    const token = authorize(db, request);
    const defaultOverview = {
      firstDepositDate: null,
    };

    if (!token) {
      return unauthorized();
    }

    const overview = db.rentierWalletOverviews.findBy({ userId: token.userId });

    if (!overview) {
      return defaultOverview;
    }

    delete overview.userId;
    return overview;
  });

  mirage.put('/users/reset-password', ({ db }, request) => {
    const requestBody = parseJSON(request);
    const email = requestBody.email;
    const users = db.users.where({ email });

    if (users.length !== 1) {
      return conflict();
    }
    const user = users[0];

    if (hasCode(request)) {
      return noContent({
        'Content-Type': 'application/json;charset=UTF-8',
      });
    }

    if (
      user.roles.indexOf('ROLE_INVESTOR') > -1 ||
      user.roles.indexOf('ROLE_RENTIER') > -1 ||
      user.roles.indexOf('ROLE_INSTITUTIONAL_INVESTOR') > -1
    ) {
      return required();
    }
    return noContent();
  });

  mirage.put('/users/me/set-password', ({ db }, request) => {
    const token = authorize(db, request);
    const data = parseJSON(request);
    const oldPassword = data.oldPassword;

    if (!token) {
      return unauthorized();
    }

    if (oldPassword !== 'Zebra2014') {
      return conflict();
    }

    return ok();
  });

  mirage.put('/users/me/preferred-locale', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const { preferredLocale } = parseJSON(request);

    db.users.update(token.userId, { preferredLocale });

    return ok({ preferredLocale });
  });

  mirage.put('/users/send-activation-link', () => ok());

  mirage.post('/activation-link/check', () => ({ hasPassword: true }));

  mirage.put('/users/me/password/phone', (schema, request) => {
    const data = parseJSON(request);
    if (data.phone === '+420774111111') {
      return bad({
        error: 'BORROWER_DID_NOT_ENTER_SAME_PHONE',
        error_description:
          'Borrower did not enter the same phone in initializing his new password.',
      });
    } else {
      return noContent();
    }
  });

  mirage.put('/users/me/password/sms', (schema, request) => {
    if (hasCode(request)) {
      return noContent({
        'Content-Type': 'application/json;charset=UTF-8',
      });
    }

    return required();
  });

  mirage.put('/users/me/activate-investor', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let user = db.users.findBy({ id: token.userId });

    if (hasCode(request)) {
      if (user.roles.indexOf('ROLE_RENTIER_APPLICANT') > -1) {
        db.zPlusWallets.insert({
          balance: 0,
          availableBalance: 0,
          blockedBalance: 0,
          variableSymbol: 800900222,
          investmentType: 'P',
          userId: user.id,
        });
      }

      db.investorRecords.update({ userId: user.id }, { status: 'SCORED' });

      return noContent({
        'Content-Type': 'application/json;charset=UTF-8',
      });
    }

    return required();
  });

  mirage.put('/users/activations', () => ok());

  mirage.get('/users/me/opening-messages', ({ db }, request) => {
    const token = authorize(db, request);
    if (!token) {
      return unauthorized();
    }

    return A(db.openingMessages.where({ userId: token.userId })).map(item => {
      delete item.userId;
      return item;
    });
  });

  mirage.put('/users/me/roles/:role', ({ db }, request) => {
    const token = authorize(db, request);
    const { role } = request.params;
    let user = db.users.find(token.userId);

    if (!token) {
      return unauthorized();
    }

    if (role === 'ROLE_INVESTOR') {
      user.roles.push(`${role}_APPLICANT`);
      if (isUserInvestorInMicroservice()) {
        db.users.update(token.userId, {
          onboardingInvestorInMicroservice: true,
        });
      } else if (isUserInvestorInModule()) {
        db.users.update(token.userId, { onboardingInvestorInModule: true });
      }
    } else if (role === 'ROLE_RENTIER') {
      user.roles.push(`${role}_APPLICANT`);
      if (isUserInvestorInModule('rentier')) {
        db.users.update(token.userId, { onboardingRentierInModule: true });
      }
    } else {
      user.roles.push(role);
    }

    return noContent();
  });

  mirage.delete('/users/me/opening-messages/:id', ({ db }, request) => {
    let token = authorize(db, request);
    let code = request.params.id;

    if (!token) {
      return unauthorized();
    }

    db.openingMessages.remove({ code, userId: token.userId });
    return ok();
  });

  mirage.get('/users/me/account-activity', ({ db }, request) => {
    const token = authorize(db, request);
    if (!token) {
      return unauthorized();
    }
    return A(db.accountActivities);
  });

  mirage.get('/users/me/account-activity/current', ({ db }, request) => {
    const token = authorize(db, request);
    if (!token) {
      return unauthorized();
    }
    return A(db.accountActivityCurrents);
  });

  mirage.get('/users/me/authorized-apps', ({ db }, request) => {
    const token = authorize(db, request);
    if (!token) {
      return unauthorized();
    }

    return A(db.authorizedApps);
  });

  mirage.delete(
    '/users/me/authorized-apps/:id',
    ({ db }, request) => {
      let token = authorize(db, request);
      let id = request.params.id;

      if (!token) {
        return unauthorized();
      }

      db.authorizedApps.remove({ id });
      return noContent();
    },
    { timing: 3000 }
  );

  mirage.get('/users/nickname/:nickname', ({ db }, request) => {
    let nickName = request.params.nickname;
    let found = db.users.where({ nickName });

    return ok(found.length > 0);
  });

  mirage.put('/users/me/tax-residency', ({ db }, request) => {
    const token = authorize(db, request);
    const data = parseJSON(request);
    const { country, taxIdentificationNumber } = data;

    if (!token) {
      return unauthorized();
    }

    if (!country || taxIdentificationNumber?.length > 20) {
      return bad();
    }

    const user = db.users.find(token.userId);

    user.taxResidency.country = country;
    user.taxResidency.taxIdentificationNumber = taxIdentificationNumber || null;
    return ok();
  });

  mirage.put('/users/me/nickname', ({ db }, request) => {
    const token = authorize(db, request);
    const data = parseJSON(request);
    const nickName = data.nickname;

    const found = db.users.where({ nickName });

    if (found.length > 0) {
      return bad({ error: 'NICKNAME_CONFLICT' });
    }

    db.users.update(token.userId, { nickName });
    return ok();
  });

  mirage.put('/users/me', ({ db }, request) => {
    let token = authorize(db, request);
    let data = parseJSON(request);

    if (!token) {
      return unauthorized();
    }

    if (data.email) {
      const conflict = db.users.where(function(user) {
        return user.email === data.email && token.userId !== user.id; // see /p2p-core/src/main/java/net/homecredit/p2p/core/user/service/impl/UserServiceImpl.java:205
      });

      if (conflict.length > 0) {
        return bad({ error: 'email' });
      }
    }

    db.users.update(token.userId, data);
    return ok();
  });

  mirage.get('/users/me/consents', ({ db }, request) => {
    const token = authorize(db, request);
    if (!token) {
      return unauthorized();
    }

    let userId; // for spock@zonkej.cz and rentierUnfulfilledPlan@zonkej.cz fetch their consents, for others fetch userId=undefined which is set to all consents agreed
    if (+token.userId === 6 || +token.userId === 41) {
      userId = token.userId;
    }

    let consents = db.consents.where({ userId })[0];
    delete consents.id;
    delete consents.userId;
    return consents;
  });

  mirage.patch('/users/me/consents', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let updatedConsents = parseJSON(request);

    Object.keys(updatedConsents).forEach(key => {
      updatedConsents[key].agreedOn = new Date().toISOString();
    });

    let currentConsents = db.consents.where({ userId: token.userId });
    let combination = Object.assign({}, currentConsents, updatedConsents);
    db.consents.update({ userId: currentConsents.userId }, combination);

    return updatedConsents;
  });

  mirage.get('/users/me/settings', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let settings = db.settings.findBy({ userId: token.userId }) || {};

    delete settings.id;
    delete settings.userId;
    return settings;
  });

  mirage.patch('/users/me/settings', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let updatedSettings = parseJSON(request);
    let currentSettings = db.settings.findBy({ userId: token.userId });
    let combination = Object.assign({}, currentSettings, updatedSettings);

    delete combination.id;
    let settings;
    if (!combination.userId) {
      // settings doesnt exist yet
      combination.userId = token.userId;
      settings = db.settings.insert(combination.userId, combination);
    } else {
      settings = db.settings.update(combination.userId, combination);
    }

    let copy = JSON.parse(JSON.stringify(settings));
    delete copy.id;
    delete copy.userId;
    return copy;
  });

  mirage.patch('/users/me/loans/:id', ({ db }, request) => {
    const token = authorize(db, request);
    let data = parseJSON(request);

    if (!token) {
      return unauthorized();
    }

    if (!data.paymentDay) {
      return bad({
        error: 'VALIDATION_ERROR',
        error_description: '...',
      });
    }

    db.borrowerRecords.update(request.params.id, data);

    return ok();
  });

  mirage.get('/users/me/loans/:id/payment-day', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const paymentDay = request.queryParams.paymentDay;
    const now = new Date();
    let nextPaymentDate = new Date();
    nextPaymentDate.setDate(paymentDay);

    if (now.getDate() > paymentDay) {
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }

    return ok({
      paymentDay,
      nextPaymentDate: nextPaymentDate.toISOString(),
      now: now.toISOString(),
    });
  });

  mirage.patch('/users/me/loans/:id/payment-day', ({ db }, request) => {
    const token = authorize(db, request);
    const data = parseJSON(request);
    const loanId = request.params.id;
    let record = db.borrowerRecords.find(loanId);

    if (!token) {
      return unauthorized();
    }

    // user with id 40 has signed an additional agreement
    if (!record.changePaymentDayAgreement && record.userId !== 40) {
      record.changePaymentDayAgreement = true;
      db.borrowerRecords.update(loanId, record);

      return bad({
        error: 'ADDITIONAL_AGREEMENT_NOT_SIGNED',
        error_description: '...',
      });
    }

    if (!data.paymentDay) {
      return bad({
        error: 'VALIDATION_ERROR',
        error_description: '...',
      });
    }

    record.paymentDay = data.paymentDay;
    db.borrowerRecords.update(loanId, record);

    const borrowerRecordInstalments = db.borrowerRecordInstalments.findBy({
      borrowerRecord: loanId,
    });

    const newInstalments = borrowerRecordInstalments.instalments.map(
      instalment => {
        if (instalment.paymentStatus === 'UPCOMING') {
          let newInstalment = new Date(instalment.dateDue);
          newInstalment.setDate(data.paymentDay);
          instalment.dateDue = newInstalment.toISOString();
        }
        return instalment;
      }
    );

    borrowerRecordInstalments.instalments = newInstalments;

    db.borrowerRecordInstalments.update({ loanId }, borrowerRecordInstalments);
    return ok();
  });

  mirage.post('/users/me/loans/:id/labels', ({ db }, request) => {
    const token = authorize(db, request);
    let { code } = parseJSON(request);

    if (!token) {
      return unauthorized();
    }

    if (code === '76') {
      db.borrowerRecords.update(request.params.id, {
        repaymentInfoRequestStatus: 'APPLIED',
      });
    }

    return noContent();
  });

  mirage.get('/users/me/referral/stats', ({ db }, request) => {
    const token = authorize(db, request);
    if (!token) {
      return unauthorized();
    }
    return ok(db.referralStats[0]);
  });

  mirage.post('/users/me/referral/email', () => ok());

  mirage.get('/users/me/referral/reward-consent', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }
    const user = db.users.find(token.userId);

    if (user.roles.includes('ROLE_BORROWER')) {
      return ok(db.referralRewards[0]);
    }

    if (
      user.roles.includes('ROLE_INVESTOR') ||
      user.roles.includes('ROLE_INVESTOR_APPLICANT')
    ) {
      return ok(db.referralRewards[1]);
    }
  });

  mirage.post('/users/me/referral/reward-consent', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    if (!request.requestBody) {
      return unsupportedMediaType();
    }

    db.referralRewards.update({
      totalRewardAmount: 0,
      rewardApplicationMethods: [],
    });

    return ok();
  });

  mirage.post(
    '/users/me/referral/reward-consent/accept-notification',
    ({ db }, request) => {
      const token = authorize(db, request);

      if (!token) {
        return unauthorized();
      }
      return ok();
    }
  );

  mirage.get('/users/me/borrower-prints', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    let prints = [];

    db.borrowerRecords.where({ userId: token.userId }).forEach(record => {
      let { id, contractNo } = record;

      prints.push(
        {
          type: 'GENERAL_TERMS',
          url: `/users/me/prints/40`,
          validFrom: null,
          validTo: null,
          contractNo,
        },
        {
          type: 'LOAN_PREAGREEMENT',
          url: `/loans/print/${id}/preagreement/PDF`,
          validFrom: null,
          validTo: null,
          contractNo,
        },
        {
          type: 'LOAN_AGREEMENT',
          url: `/loans/print/${id}/agreement/PDF`,
          validFrom: null,
          validTo: null,
          contractNo,
        }
      );

      if (record.insuranceActive) {
        prints.push(
          {
            type: 'FRAMEWORK_INSURANCE_CONTRACT',
            url: `/loans/print/${id}/insurance-contract`,
            validFrom: null,
            validTo: null,
            contractNo,
          },
          {
            type: 'INSURANCE_PRE_AGREEMENT',
            url: `/loans/print/${id}/insurance-pre-agreement`,
            validFrom: null,
            validTo: null,
            contractNo,
          },
          {
            type: 'PAYMENT_PROTECTION_INSURANCE',
            url: `/loans/print/${id}/payment-protection-insurance`,
            validFrom: null,
            validTo: null,
            contractNo,
          }
        );
      }

      // Give Barney ADDITIONAL_PAYMENT_DAY_CHANGE_AGREEMENT agreement
      if (+token.userId === 9) {
        prints.push({
          type: 'ADDITIONAL_PAYMENT_DAY_CHANGE_AGREEMENT',
          url: `/loans/print/${id}/additional-payment-day-agreement`,
          validFrom: null,
          validTo: null,
          contractNo,
        });
      }
    });

    return prints;
  });

  mirage.get('/users/me/popup-messages', ({ db }, request) => {
    const token = authorize(db, request);
    if (!token) {
      return unauthorized();
    }

    return A(db.popupMessages.where({ userId: token.userId })).map(item => {
      delete item.userId;
      return item;
    });
  });

  mirage.delete('/users/me/popup-messages/:id', ({ db }, request) => {
    let token = authorize(db, request);
    let code = request.params.id;

    if (!token) {
      return unauthorized();
    }

    db.popupMessages.remove({ code, userId: token.userId });
    return ok();
  });

  mirage.put('/users/me/interest-in-rentier', () => ok());

  mirage.post('/users/me/enable-z-plus', ({ db }, request) => {
    if (!hasCode(request)) {
      return required();
    }

    let token = authorize(db, request);
    let user = db.users.find(token.userId);
    let today = new Date();
    let formatedDate = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDay()}`;

    if (!token) {
      return unauthorized();
    }

    user.roles.push('ROLE_RENTIER_APPLICANT');
    user.roles.push('ROLE_RENTIER');

    db.zPlusAllocationSettings.insert({
      minPackageAmount: 49000,
      minimumDepositIncludingFee: 50000,
      stockpileLoansVolumeLimitSize: 0,
      stockpileTotalLimitAmount: 0,
      userId: user.id,
    });

    db.zPlusStatisticsOverviews.insert({
      earningsPerAnnumGross: 0,
      earningsPerAnnumNet: 0,
      earningsPerAnnumNetAlgorithm: 'SIMPLIFIED',
      initialInvestmentRoundStarted: false,
      monthlyStatistics: [
        { date: formatedDate, depositedAmount: 0, portfolioValue: 0 },
      ],
      portfolioValue: 0,
      portfolioValueProjection: 0,
      userId: user.id,
    });

    db.zPlusUserOrders.update({
      depositedEnough: false,
      investmentStopped: false,
      numberOfActiveInvestments: 0,
      numberOfActiveInvestmentsTooLowForSafePortfolio: true,
      status: 'APPROVED',
    });

    return ok(user);
  });

  mirage.get('/users/me/z-plus-wallet/qr-deposit', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return image();
  });

  mirage.get('/users/me/wallet/qr-deposit', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    return image();
  });

  mirage.post('/users/me/signatures', ({ db }, request) => {
    let token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    if (hasCode(request)) {
      if (getCode(request) === '012345') {
        const { loanId } = parseJSON(request);

        db.borrowerRecords.update(loanId, {
          type: 'ADDITIONAL_INSURANCE_CONTRACT',
          additionallyInsurable: false,
          insuranceActive: true,
        });

        return noContent({
          'Content-Type': 'application/json;charset=UTF-8',
        });
      } else {
        return failed();
      }
    }

    return required();
  });

  mirage.get('/users/emails', ({ db }, request) => {
    const email = request.queryParams.q;
    const user = db.users.findBy({ email });

    let captchaIsMissing =
      email === 'captcha_user_create@zonkej.cz' &&
      !request.headers.has('X-Captcha-Response');

    if (captchaIsMissing) {
      return captcha();
    }

    if (user) {
      return ok();
    }

    return notFound();
  });

  mirage.get('/users/me/last-verified', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    if (lastVerified(token.user, db)) {
      return ok();
    }

    return notFound();
  });

  mirage.get('/users/me/income-sources', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const foundSources = db.incomeSources.where({
      userId: token.userId,
    })[0];

    delete foundSources.userId;

    return ok(foundSources);
  });

  mirage.put('/users/me/income-sources', ({ db }, request) => {
    const token = authorize(db, request);

    if (!token) {
      return unauthorized();
    }

    const dataToSave = parseJSON(request);
    dataToSave.userId = token.userId;

    db.incomeSources.update({ userId: token.userId }, dataToSave);

    return ok();
  });

  mirage.get('/users/me/active-loans-overview', ({ db }) => {
    return ok(db.activeLoansOverview);
  });

  mirage.get('/users/me/loans/refinance/offer/latest', ({ db }, request) => {
    const token = authorize(db, request);
    return ok(db.refinanceOffers.findBy({ userId: token.userId }));
  });
}
