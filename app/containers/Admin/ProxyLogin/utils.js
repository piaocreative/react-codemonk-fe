import history from 'utils/history';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';

export const handleBackToAdmin = () => {
  StorageService.delete('firstName');
  StorageService.delete('userEmail');
  StorageService.delete('userType');
  StorageService.delete('registerType');
  StorageService.delete('signupStep');
  StorageService.delete('agencyLogo');
  StorageService.delete('profilePicture');
  StorageService.delete('isPaymentSkipped');
  StorageService.delete('clientToken');
  StorageService.delete('agencyToken');
  StorageService.delete('talentToken');
  StorageService.delete('proxyType');
  StorageService.delete('proxyToken');
  StorageService.set('userType', 4, { hash: true });
  Emitter.emit('proxyBackToAdmin', true);
  history.replace('/admin/');
};
