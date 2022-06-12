/**
 * Test injectors
 */

import StorageService from '../StorageService';
import AuthTokenService from '../AuthTokenService';

describe('AuthTokenService', () => {
  it('should have value in AuthTokenService', () => {
    const token = 'testbyankit';
    expect(AuthTokenService.init(token)).toEqual(true);
  });
  it('should value exsits in AuthTokenService', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    expect(AuthTokenService.exists()).toEqual('testbyankit');
  });
  it('should clean value in AuthTokenService', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    AuthTokenService.clear();
    expect(AuthTokenService.get()).toEqual(false);
  });
});
