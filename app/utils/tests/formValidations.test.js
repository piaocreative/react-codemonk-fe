/**
 * Test injectors
 */

import * as formValidations from 'utils/formValidations';
import { VALIDATION } from '../constants';
describe('formValidations', () => {
  it('should validate the value required', () => {
    expect(formValidations.required('')).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate the value required', () => {
    expect(formValidations.required('asdfa')).toEqual('');
  });
  it('should validate the value required', () => {
    expect(formValidations.required('  ')).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate Email', () => {
    expect(formValidations.email('ankit.g')).toEqual(VALIDATION.EMAIL);
  });
  it('should validate Email pass', () => {
    expect(formValidations.email('ankit.g@innovify.in')).toEqual('');
  });

  it('should validate isUrl', () => {
    expect(formValidations.isUrl('test')).toEqual(VALIDATION.URL);
  });
  it('should validate isUrl pass', () => {
    expect(formValidations.isUrl('http://google.com')).toEqual('');
  });

  it('should validate contactNum', () => {
    expect(formValidations.contactNum('test')).toEqual(VALIDATION.PHONE);
  });
  it('should validate contactNum pass', () => {
    expect(formValidations.contactNum('9033238202')).toEqual('');
  });

  it('should validate requiredValue', () => {
    expect(formValidations.requiredValue('')).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate requiredValue pass', () => {
    expect(formValidations.requiredValue('test')).toEqual('');
  });

  it('should validate requiredJson', () => {
    expect(formValidations.requiredJson('')).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate requiredJson pass', () => {
    expect(formValidations.requiredJson({ value: '  ' })).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate requiredJson pass', () => {
    expect(formValidations.requiredJson({ value: '12345' })).toEqual('');
  });

  it('should validate otp', () => {
    expect(formValidations.otp('1234')).toEqual(VALIDATION.OTP);
  });
  it('should validate otp pass', () => {
    expect(formValidations.otp('123456')).toEqual('');
  });

  it('should validate requiredSelect', () => {
    expect(formValidations.requiredSelect('1234')).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate requiredSelect pass', () => {
    expect(formValidations.requiredSelect({ value: '' })).toEqual(VALIDATION.REQUIRED);
  });

  it('should validate requiredMultiSelect', () => {
    expect(formValidations.requiredMultiSelect('')).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate requiredMultiSelect pass', () => {
    expect(formValidations.requiredMultiSelect('123456')).toEqual('');
  });

  it('should validate requiredDate', () => {
    expect(formValidations.requiredDate('')).toEqual(VALIDATION.REQUIRED);
  });
  it('should validate requiredDate pass', () => {
    expect(formValidations.requiredDate('123456')).toEqual('');
  });

  it('should validate checked', () => {
    expect(formValidations.checked('')).toEqual(VALIDATION.CHECKED);
  });
  it('should validate checked pass', () => {
    expect(formValidations.checked('123456')).toEqual('');
  });

  // it('should validate notEmail', () => {
  //   expect(formValidations.notEmail('123456')).toEqual(VALIDATION.NOT_EMAIL);
  // });

  it('should validate notEmail pass', () => {
    expect(formValidations.notEmail('123456')).toEqual('');
  });

  it('should validate minLength', () => {
    const min = 10;
    expect(formValidations.minLength(min, 'ankit.g')).toEqual(expect.any(Function));
  });

  it('should validate minLength pass', () => {
    const min = 10;
    expect(formValidations.minLength(min, 'ankit.g@innovify.in')).toEqual(expect.any(Function));
  });

  it('should validate maxLength', () => {
    const max = 10;
    expect(formValidations.maxLength('ankitgujarati', max)).toEqual(expect.any(Function));
  });

  it('should validate maxLength pass', () => {
    const max = 10;
    expect(formValidations.maxLength('ankiin', max)).toEqual(expect.any(Function));
  });

  it('should validate integer', () => {
    const max = 'asd';
    expect(formValidations.integer(max)).toEqual(VALIDATION.INTEGER);
  });
  it('should validate integer pass', () => {
    const max = 10;
    expect(formValidations.integer(max)).toEqual('');
  });

  /** it('should validate oneOf', () => {
    const oneof = ['ab', 'bc', 'cd'];
    expect(formValidations.oneOf('ad', oneof)).toEqual(
      `Must be one of: ${oneof.join(', ')}`,
    );
  });
  it('should validate oneOf pass', () => {
    const oneof = ['ab', 'bc', 'cd'];
    expect(formValidations.oneOf('ab', oneof)).toEqual('');
  });  */
  it('should validate password', () => {
    const max = 'asd';
    expect(formValidations.password(max)).toEqual(VALIDATION.PASSWORD);
  });
  it('should validate password pass', () => {
    const max = 'Ankit@123';
    expect(formValidations.password(max)).toEqual('');
  });
});
