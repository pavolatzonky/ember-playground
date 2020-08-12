import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/string';

export default class FormatPhoneHelper extends Helper {
  @service fastboot;

  @service telephony;

  compute([phone], named) {
    if (isEmpty(phone)) {
      return '';
    }

    this.ensure();

    let formattedPhone = this.telephony.format(phone, named);
    let interactive = named.interactive === false ? false : true;

    if (named.withNonBreakingSpaces) {
      formattedPhone = formattedPhone.replace(/\s/g, '&nbsp;');
    }

    if (!interactive) {
      return formattedPhone;
    }

    let attrs = [`href=${this.telephony.format(phone, { format: 'RFC3966' })}`];

    if (named.class !== undefined) {
      attrs.push(`class="${named.class}"`);
    }

    return htmlSafe(`<a ${attrs.join(' ')}>${formattedPhone}</a>`);
  }

  ensure() {
    if (this.telephony.phoneNumber || this.fastboot.isFastBoot) {
      return;
    }

    this.telephony.loadPhoneNumberLibrary().then(() => {
      if (!this.isDestroying && !this.isDestroyed) {
        this.recompute();
      }
    });
  }
}
