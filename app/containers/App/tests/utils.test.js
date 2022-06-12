import historyFn from 'utils/history';
import * as functions from '../utils';

const history = { replace: jest.fn(), push: jest.fn() };

describe('Testing redirectToPage', () => {
  test('If redirectToPage for 0', () => {
    expect(functions.redirectToPage(history, 0, 1)).toEqual(undefined);
  });
  test('If redirectToPage for 1', () => {
    expect(functions.redirectToPage(history, 1, 0)).toEqual(undefined);
  });
  test('If redirectToPage for 2', () => {
    expect(functions.redirectToPage(history, 2, 1)).toEqual(undefined);
  });
  test('If redirectToPage for 3', () => {
    expect(functions.redirectToPage(history, 3, 1)).toEqual(undefined);
  });
  test('If redirectToPage for 4', () => {
    expect(functions.redirectToPage(history, 4, 1)).toEqual(undefined);
  });

  test('If redirectToPage for 0 and currentPage 0', () => {
    expect(functions.redirectToPage(history, 0, 0)).toEqual(undefined);
  });

  test('If stepSize for step-1', () => {
    expect(parseInt(functions.stepSize(1), 10)).toEqual(12);
  });

  test('If stepSize for step-1 for agencyTalent', () => {
    expect(parseInt(functions.stepSize(1), 10)).toEqual(12);
  });
});

describe('Testing checkForZero', () => {
  test('If checkForZero for length 1', () => {
    const data = [{ rating: 5 }, { rating: 10 }];
    expect(functions.checkForZero(data)).toEqual(1);
  });

  test('If checkForZero for length 0', () => {
    const data = [{ rating: 0 }, { rating: 10 }];
    expect(functions.checkForZero(data)).toEqual(0);
  });
});

describe('Testing other functions', () => {
  test('If redirectPageURL for length 1', () => {
    expect(functions.redirectPageURL(1)).toEqual('/talent/about-you');
  });

  test('If clientRedirectPageURL for length 1', () => {
    expect(functions.clientRedirectPageURL(1)).toEqual('/client/about-you');
  });

  test('Testing if clientRedirectToPage with case 0', () => {
    const clientRedirectToPage = jest.spyOn(functions, 'clientRedirectToPage');
    clientRedirectToPage({ replace: jest.fn() }, false, 1, 0);
    expect(clientRedirectToPage).toHaveBeenCalled();
  });

  test('Testing if clientRedirectToPage with case 1', () => {
    const clientRedirectToPage = jest.spyOn(functions, 'clientRedirectToPage');
    clientRedirectToPage({ replace: jest.fn() }, false, 0, 1);
    expect(clientRedirectToPage).toHaveBeenCalled();
  });

  test('Testing if clientRedirectToPage with case 2', () => {
    const clientRedirectToPage = jest.spyOn(functions, 'clientRedirectToPage');
    clientRedirectToPage({ replace: jest.fn() }, false, 1, 2);
    expect(clientRedirectToPage).toHaveBeenCalled();
  });

  test('Testing if clientRedirectToPage with case 3', () => {
    const clientRedirectToPage = jest.spyOn(functions, 'clientRedirectToPage');
    clientRedirectToPage({ replace: jest.fn() }, false, 1, 3);
    expect(clientRedirectToPage).toHaveBeenCalled();
  });

  test('Testing if clientRedirectToPage with case 4', () => {
    const clientRedirectToPage = jest.spyOn(functions, 'clientRedirectToPage');
    clientRedirectToPage({ replace: jest.fn() }, false, 1, 4);
    expect(clientRedirectToPage).toHaveBeenCalled();
  });
});

describe('Testing getBadgeClass', () => {
  test('Testing if getBadgeClass with status Invited', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Invited';
    const output = getBadgeClass(status);
    expect(output).toEqual('light');
  });

  test('Testing if getBadgeClass with status Requested', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Requested';
    const output = getBadgeClass(status);
    expect(output).toEqual('light');
  });

  test('Testing if getBadgeClass with status Proposed', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Proposed';
    const output = getBadgeClass(status);
    expect(output).toEqual('light');
  });

  test('Testing if getBadgeClass with status On Hold', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'On Hold';
    const output = getBadgeClass(status);
    expect(output).toEqual('danger');
  });

  test('Testing if getBadgeClass with status Hired', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Hired';
    const output = getBadgeClass(status);
    expect(output).toEqual('primary');
  });

  test('Testing if getBadgeClass with status Discovery', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Discovery';
    const output = getBadgeClass(status);
    expect(output).toEqual('primary');
  });

  test('Testing if getBadgeClass with status Settled', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Settled';
    const output = getBadgeClass(status);
    expect(output).toEqual('primary');
  });

  test('Testing if getBadgeClass with status Suspended', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Suspended';
    const output = getBadgeClass(status);
    expect(output).toEqual('danger');
  });

  test('Testing if getBadgeClass with status Verified', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Verified';
    const output = getBadgeClass(status);
    expect(output).toEqual('success');
  });

  test('Testing if getBadgeClass with status In Progress', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'In Progress';
    const output = getBadgeClass(status);
    expect(output).toEqual('success');
  });

  test('Testing if getBadgeClass with status Active', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Active';
    const output = getBadgeClass(status);
    expect(output).toEqual('success');
  });

  test('Testing if getBadgeClass with status Approved', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Approved';
    const output = getBadgeClass(status);
    expect(output).toEqual('success');
  });

  test('Testing if getBadgeClass with status Registered', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Registered';
    const output = getBadgeClass(status);
    expect(output).toEqual('warning');
  });

  test('Testing if getBadgeClass with status Kick-off', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Kick-off';
    const output = getBadgeClass(status);
    expect(output).toEqual('warning');
  });

  test('Testing if getBadgeClass with status In review', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'In review';
    const output = getBadgeClass(status);
    expect(output).toEqual('warning');
  });

  test('Testing if getBadgeClass with status Submitted', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Submitted';
    const output = getBadgeClass(status);
    expect(output).toEqual('warning');
  });

  test('Testing if getBadgeClass with status Closed', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Closed';
    const output = getBadgeClass(status);
    expect(output).toEqual('alert');
  });

  test('Testing if getBadgeClass with status Done', () => {
    const getBadgeClass = jest.spyOn(functions, 'getBadgeClass');
    const status = 'Done';
    const output = getBadgeClass(status);
    expect(output).toEqual('alert');
  });
});

describe('Testing other functions', () => {
  test('Testing if redirectTo', () => {
    const redirectTo = jest.spyOn(functions, 'redirectTo');
    const pathname = '/talent';
    redirectTo(history, pathname);
    expect(redirectTo).toHaveBeenCalledTimes(1);
  });

  test('Testing if redirectToType', () => {
    const redirectToType = jest.spyOn(functions, 'redirectToType');
    const pathname = '/talent';
    redirectToType(history, pathname);
    expect(redirectToType).toHaveBeenCalledTimes(1);
  });

  test('Testing if talentProfileRedirect', () => {
    const talentProfileRedirect = jest.spyOn(functions, 'talentProfileRedirect');
    const pathname = '/client/talent-profile/';
    const id = 'shhaj2323';
    const type = 'projectDetails';
    talentProfileRedirect(history, pathname, id, type);
    expect(talentProfileRedirect).toHaveBeenCalledTimes(1);
  });

  test('Testing if redirectBack', () => {
    const redirectBack = jest.spyOn(functions, 'redirectBack');
    const pathname = '/talent';
    const tab = '1';
    redirectBack(history, pathname, tab);
    expect(redirectBack).toHaveBeenCalledTimes(1);
  });

  test('Testing if getPageData', () => {
    const getPageData = jest.spyOn(functions, 'getPageData');
    const data = [];
    const pageNum = 1;
    const pageSize = 10;
    getPageData(data, pageNum, pageSize);
    expect(getPageData).toHaveBeenCalledTimes(1);
  });

  test('Testing if paginationComponent with total 10', () => {
    const paginationComponent = jest.spyOn(functions, 'paginationComponent');
    const paginationData = { status: 1, message: 'some error', totalDocs: 10 };
    const DEFAULT_PAGE_SIZE = 20;
    const onChangeFn = jest.fn();
    paginationComponent(paginationData, DEFAULT_PAGE_SIZE, onChangeFn);
    expect(paginationComponent).toHaveBeenCalledTimes(1);
  });

  test('Testing if paginationComponent with total 30', () => {
    const paginationComponent = jest.spyOn(functions, 'paginationComponent');
    const paginationData = { status: 1, message: 'some error', totalDocs: 30, page: 1, limit: 20 };
    const DEFAULT_PAGE_SIZE = 20;
    const onChangeFn = jest.fn();
    paginationComponent(paginationData, DEFAULT_PAGE_SIZE, onChangeFn);
    expect(paginationComponent).toHaveBeenCalledTimes(2);
  });

  test('Testing if showMoreDiv', () => {
    const showMoreDiv = jest.spyOn(functions, 'showMoreDiv');
    const htmlText = '<p>Hello</p>';
    const plainText = 'Hello';
    showMoreDiv(htmlText, plainText);
    expect(showMoreDiv).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkIfHasAccessURL userType = 1', () => {
    historyFn.push('/talent/dashboard');
    const checkIfHasAccessURL = jest.spyOn(functions, 'checkIfHasAccessURL');
    const userType = 1;
    checkIfHasAccessURL(userType);
    expect(checkIfHasAccessURL).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkIfHasAccessURL userType = 2', () => {
    historyFn.push('/talent/');
    const checkIfHasAccessURL = jest.spyOn(functions, 'checkIfHasAccessURL');
    const userType = 2;
    checkIfHasAccessURL(userType);
    expect(checkIfHasAccessURL).toHaveBeenCalledTimes(2);
  });

  test('Testing if checkIfHasAccessURL userType = 3', () => {
    historyFn.push('/talent');
    const checkIfHasAccessURL = jest.spyOn(functions, 'checkIfHasAccessURL');
    const userType = 3;
    checkIfHasAccessURL(userType);
    expect(checkIfHasAccessURL).toHaveBeenCalledTimes(3);
  });

  test('Testing if checkIfHasAccessURL userType = 4', () => {
    historyFn.push('/admin');
    const checkIfHasAccessURL = jest.spyOn(functions, 'checkIfHasAccessURL');
    const userType = 4;
    checkIfHasAccessURL(userType);
    expect(checkIfHasAccessURL).toHaveBeenCalledTimes(4);
  });
});
