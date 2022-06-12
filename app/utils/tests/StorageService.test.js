/**
 * Test injectors
 */

import StorageService from '../StorageService';

describe('StorageService', () => {
  it('should set value in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    expect(StorageService.get('jwtToken')).toEqual(token);
  });
  it('should value exsits in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token, { stringify: true, hash: true });
    expect(StorageService.exists('jwtToken')).not.toEqual(false);
  });
  it('should delete in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token, { stringify: true, hash: true });
    StorageService.delete('jwtToken');
    expect(StorageService.exists('jwtToken')).toEqual(false);
  });
  it('should clean in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token, { stringify: true, hash: true });
    StorageService.clear();
    expect(StorageService.exists('jwtToken')).toEqual(false);
  });
  it('should clean in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token, {
      stringify: true,
      hash: true,
      keepMe: true,
    });
    StorageService.clear();
    expect(StorageService.exists('jwtToken')).toEqual(false);
  });
  it('should get false on storage in localstorage', () => {
    expect(StorageService.get('jwtToken')).toEqual(false);
  });
  it('should set value using opts storage in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token, { stringify: true, hash: true });
    expect(StorageService.get('jwtToken')).toEqual(token);
  });

  it('should set value using opts storage in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token, { stringify: true, hash: true });
    expect(StorageService.get('jwtToken1')).toEqual(false);
  });

  it('should set value using opts keepMe in localstorage', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token, {
      stringify: true,
      hash: true,
      keepMe: true,
    });
    expect(StorageService.get('jwtToken1')).toEqual(false);
  });
});
