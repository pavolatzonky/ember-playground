'use strict';
module.exports = {
  extends: ['octane', 'stylistic'],
  rules: {
    'dasherized-test-attributes': true,
    'dasherized-translations': true,
    'eol-last': 'never',
    'inline-link-to': true,
    'no-bare-strings': true,
    'no-curly-component-invocation': {
      allow: ['application/in-element', 'brand/id', 'brand/name'],
    },
    'no-implicit-this': {
      allow: ['application/in-element', 'brand/id', 'brand/name'],
    },
  },
  plugins: [
    './lib/template-lint-rules/test-attributes',
    './lib/template-lint-rules/translations',
  ],
  overrides: [
    {
      files: '**/tests/**/*.js',
      rules: {
        'no-bare-strings': false,
      },
    },
  ],
  pending: [
    {
      moduleId: 'app/application-error/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/templates/head',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/borrower-application/top-up/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/account/activation/email/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/components/account/activation/password/template',
      only: ['no-action', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/account/forgot/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/account/login/template',
      only: ['require-iframe-title'],
    },
    {
      moduleId: 'app/components/account/logout/template',
      only: ['link-href-attributes'],
    },
    {
      moduleId: 'app/components/account/sms-attempts-exceeded/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/account/verification/template',
      only: ['no-action', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/affilbox-iframe/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/application-blank-menu/template',
      only: ['no-negated-condition', 'require-button-type'],
    },
    {
      moduleId: 'app/components/application-footer/template',
      only: ['link-rel-noopener', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/application-menu/template',
      only: [
        'link-rel-noopener',
        'no-negated-condition',
        'require-button-type',
      ],
    },
    {
      moduleId: 'app/components/application-menu-notifications/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/application-modal/template',
      only: ['no-action', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/application-overlay/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/application-version/template',
      only: ['require-button-type'],
    },
    {
      moduleId: 'app/components/authorized-apps/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/bank-account-form/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/borrower-application-calculator/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/borrower-application/contact-address/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/components/borrower-application-lead-completed/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/borrower-application-lead-expired/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId:
        'app/components/borrower-application-lead-verification/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-active-instalments/template',
      only: ['no-negated-condition', 'require-button-type'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-active-investments/template',
      only: [
        'require-button-type',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-active-investments-investors/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/account/block/success/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-active-payment-in-trouble/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-active-payment-postponement/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-active-payment-repayment-acknowledgement/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-active-payment-repayment-amount/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-application/template',
      only: ['no-negated-condition', 'require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-application-applied/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-application-not-at-all/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-application-not-possible-modal/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-application-not-yet/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-not-eligible-for-insurance/template',
      only: ['require-button-type'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard-summary-account-verification/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-summary-approved/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-summary-in-scoring/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-summary-published/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-summary-publishing/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/borrower-dashboard-top-up/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/borrower-story-editor/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/calculator-slider/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/common-modal-header/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/cookie-consent/template',
      only: ['require-button-type'],
    },
    {
      moduleId: 'app/components/error-500/template',
      only: ['require-valid-alt-text', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/fa-checkboxes/template',
      only: ['no-action'],
    },
    {
      moduleId:
        'app/components/investor-application-bank-account-and-income-sources/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/investor-application-phone/template',
      only: ['no-action'],
    },
    {
      moduleId:
        'app/components/investor-application-rentier-agreement/template',
      only: ['link-rel-noopener', 'no-action'],
    },
    {
      moduleId: 'app/components/investor-application-signature/template',
      only: ['no-action'],
    },
    {
      moduleId:
        'app/components/investor-dashboard-classic-wallet-action-area/template',
      only: ['no-action', 'no-curly-component-invocation'],
    },
    {
      moduleId:
        'app/components/investor-dashboard-classic-wallet-currencies/template',
      only: ['no-multiple-empty-lines'],
    },
    {
      moduleId:
        'app/components/investor-dashboard-classic-wallet-old-withdrawal/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId:
        'app/components/investor-dashboard-classic-wallet-old-withdrawal-success/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId:
        'app/components/investor-dashboard-classic-wallet-transactions/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/investor-dashboard-z-plus-index-links/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/investor-dashboard-z-plus-wallet/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId:
        'app/components/investor-dashboard-z-plus-wallet-deposit/template',
      only: ['no-negated-condition', 'no-curly-component-invocation'],
    },
    {
      moduleId:
        'app/components/investor-dashboard-z-plus-wallet-withdrawal/template',
      only: ['require-button-type'],
    },
    {
      moduleId: 'app/components/kontomatik-widget/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/kontomatik-widget-how-does-it-work/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/kontomatik-widget-intro/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/kontomatik-widget-list/template',
      only: ['require-button-type', 'require-valid-alt-text', 'no-action'],
    },
    {
      moduleId: 'app/components/kontomatik-widget-processing/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/life-insurance-modal/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/marketplace-detail/template',
      only: ['no-negated-condition', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-detail-navigation/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-detail-status/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-index/template',
      only: ['no-multiple-empty-lines', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-index-item/template',
      only: ['no-negated-condition', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-index-item-fast-invest/template',
      only: ['require-button-type', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-index-query/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-investment/template',
      only: [
        'require-button-type',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId: 'app/components/marketplace-investment-captcha/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/marketplace-investment-form/template',
      only: [
        'require-button-type',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId: 'app/components/marketplace-investments/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-secondary/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId:
        'app/components/marketplace-secondary-buy-confirmation/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/marketplace-secondary-item/template',
      only: [
        'no-negated-condition',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId: 'app/components/marketplace-secondary-query/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/marketplace-secondary-query-base/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/marketplace-switcher/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/multi-fa-checkbox/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/notification-subscriptions-change/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/offer-agreement/template',
      only: ['link-rel-noopener', 'no-action'],
    },
    {
      moduleId: 'app/components/offer-bank-account/template',
      only: ['no-negated-condition', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/offer-cancel/template',
      only: ['no-action', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/offer-card/template',
      only: ['require-button-type'],
    },
    {
      moduleId: 'app/components/offer-edit/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/offer-insurance-modal/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/offer-insurance-old/template',
      only: [
        'link-rel-noopener',
        'require-button-type',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId: 'app/components/offer-insurance-rejection/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/offer-preagreement/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/offer-preview/template',
      only: [
        'no-multiple-empty-lines',
        'require-button-type',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId: 'app/components/openbanking/redirect/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/components/popup-messages-modal/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/print-signing/template',
      only: ['no-negated-condition', 'require-valid-alt-text'],
    },
    {
      moduleId: 'app/components/publish-postpone-modal/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/referral-email/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/referral-link/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/components/smp-borrower-banner/template',
      only: [
        'no-multiple-empty-lines',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId: 'app/components/smp-borrower-redirect-modal/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/user-notification-item/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/user-notifications-list/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/user-profile-addresses/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/user-profile-addresses-change/template',
      only: ['no-multiple-empty-lines', 'no-action'],
    },
    {
      moduleId: 'app/components/user-profile-bank-account/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/user-profile-bank-account-change/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/user-profile-email/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/user-profile-email-change/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/user-profile-nickname/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/user-profile-nickname-change/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/user-profile-password-change/template',
      only: ['require-button-type'],
    },
    {
      moduleId: 'app/components/user-profile-phone/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/user-profile-phone-change/template',
      only: ['require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/user-profile-settings/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/user-profile-tax-residency/template',
      only: ['no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/user-profile-tax-residency-change/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/user-profile-tax-returns/template',
      only: ['link-rel-noopener', 'require-button-type', 'no-action'],
    },
    {
      moduleId: 'app/components/validated-input/template',
      only: ['require-button-type'],
    },
    {
      moduleId: 'app/components/validated-phone/template',
      only: [
        'no-negated-condition',
        'no-action',
        'no-curly-component-invocation',
      ],
    },
    {
      moduleId: 'app/components/z-plus-button/template',
      only: ['require-button-type', 'no-curly-component-invocation'],
    },
    {
      moduleId: 'app/components/zonky-life-jacket/template',
      only: ['link-rel-noopener'],
    },
    {
      moduleId: 'app/referral/rewards/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/components/currency-adder/button/template',
      only: ['link-href-attributes'],
    },
    {
      moduleId: 'app/components/offer/insurance/template',
      only: ['link-rel-noopener', 'no-negated-condition', 'no-action'],
    },
    {
      moduleId: 'app/investor-dashboard/rentier/entry-payment/template',
      only: ['no-action'],
    },
    {
      moduleId: 'app/components/borrower/insurance/new-payment/template',
      only: ['no-action'],
    },
    {
      moduleId:
        'app/components/borrower-dashboard/summary/approved-refinancing/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId: 'app/components/offer/insurance/reminder/template',
      only: ['require-button-type'],
    },
    {
      moduleId:
        'app/components/user-profile/activation-rentier/agreement/template',
      only: ['no-negated-condition'],
    },
    {
      moduleId:
        'app/components/user-profile/activation-rentier/business-terms/template',
      only: ['link-rel-noopener'],
    },
    {
      moduleId: 'app/components/borrower/dashboard/active/life-jacket/template',
      only: ['link-href-attributes', 'require-valid-alt-text'],
    },
    {
      moduleId:
        'app/components/investor-dashboard/all/list/remove-from-smp-modal/template',
      only: ['require-button-type'],
    },
  ],
};
