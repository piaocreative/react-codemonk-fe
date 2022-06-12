import { makeSelectInviteMails } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectInviteMails', () => {
    const mockState = {
      homepageInviteForm: {
        inviteMails: [],
      },
    };
    const result = {
      inviteMails: [],
    };
    const sel = makeSelectInviteMails(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
