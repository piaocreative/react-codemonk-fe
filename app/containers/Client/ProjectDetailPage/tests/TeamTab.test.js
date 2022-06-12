import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { TeamTab as MainForm } from '../TeamTab';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },
  data: {
    talentsDetails: [
      {
        _id: '5f0eaa3a187301000870a9e5',
        email: 'brinda.lakhani@yopmail.com',
        shortName: 'SK',
        status: 'Active',
        allocationTill: '',
        talentUserId: '5f0eaa3a187301000870a9e5',
        talentId: '5f0eaa3a187301000870a9e6',
        primaryRole: 'Developer',
        ratePerHour: 144.3,
        currency: 'GBP',
      },
      {
        _id: '5f9180e74a4ff642324fb559',
        email: 'skipagencytalent@mailinator.com',
        shortName: 'JS',
        status: 'Active',
        allocationTill: '',
        talentUserId: '5f9180e74a4ff642324fb559',
        talentId: '5f9180e74a4ff642324fb55a',
        primaryRole: 'Developer',
        ratePerHour: 156,
        currency: 'GBP',
      },
      {
        _id: '5f96871e1381796a7adda500',
        email: 'lintalent@mailinator.com',
        shortName: 'RB',
        status: 'Active',
        allocationTill: '',
        talentUserId: '5f96871e1381796a7adda500',
        talentId: '5f96871e1381796a7adda501',
        primaryRole: 'UX Manager',
        ratePerHour: 28.6,
        currency: 'USD',
      },
    ],
  },
  talentsDetails: [
    {
      _id: '5f0eaa3a187301000870a9e5',
      email: 'brinda.lakhani@yopmail.com',
      shortName: 'SK',
      status: 'Active',
      allocationTill: '',
      talentUserId: '5f0eaa3a187301000870a9e5',
      talentId: '5f0eaa3a187301000870a9e6',
      primaryRole: 'Developer',
      ratePerHour: 144.3,
      currency: 'GBP',
    },
    {
      _id: '5f9180e74a4ff642324fb559',
      email: 'skipagencytalent@mailinator.com',
      shortName: 'JS',
      status: 'Active',
      allocationTill: '',
      talentUserId: '5f9180e74a4ff642324fb559',
      talentId: '5f9180e74a4ff642324fb55a',
      primaryRole: 'Developer',
      ratePerHour: 156,
      currency: 'GBP',
    },
    {
      _id: '5f96871e1381796a7adda500',
      email: 'lintalent@mailinator.com',
      shortName: 'RB',
      status: 'Active',
      allocationTill: '',
      talentUserId: '5f96871e1381796a7adda500',
      talentId: '5f96871e1381796a7adda501',
      primaryRole: 'UX Manager',
      ratePerHour: 28.6,
      currency: 'USD',
    },
  ],
  isAdmin: false,
  projectID: 'id',
  onChangeStatus: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('TeamTab Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('for componentDidUpdate', () => {
    const prevProps = { talentsDetails: [] };
    const newTalentsDetails = props.talentsDetails;

    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ talentsDetails: newTalentsDetails });
    expect(componentDidUpdate).toHaveBeenCalledTimes(3);
  });

  // test('Testing if toggle with quoteSubmit', () => {
  //   const component = shallow(<MainForm {...props} />);
  //   Emitter.emit('quoteSubmit', true);
  //   expect(component.state('showQuoteModal')).toEqual(false);
  // });

  // test('Testing if emitter off on component unmount', () => {
  //   const component = shallow(<MainForm {...props} />);
  //   jest.spyOn(component.instance(), 'componentWillUnmount');
  //   component.instance().componentWillUnmount();
  //   expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  // });

  // test('for componentDidUpdate with else', () => {
  //   const prevProps = props;
  //   prevProps.showQuoteModal = true;
  //   const wrapper = shallow(<MainForm {...prevProps} />);
  //   const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
  //   wrapper.setProps({ showQuoteModal: false });
  //   expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  // });

  // test('for componentDidUpdate with change in quote data setQuoteData ', () => {
  //   const prevProps = props;
  //   prevProps.data = [
  //     {
  //       _id: '5f04c1c35e',
  //       projectId: '5f88372e6209512343',
  //       name: 'Quote-1',
  //       description: '<p>Quote Description</p>\n',
  //       quoteUrl: 'File.pdf',
  //     },
  //   ];
  //   const wrapper = shallow(<MainForm {...prevProps} />);
  //   const newData = [
  //     {
  //       _id: '5f04c1c35e',
  //       projectId: '5f88372e6209512343',
  //       name: 'Quote-2',
  //       description: '<p>Quote Change</p>\n',
  //       quoteUrl: 'File.pdf',
  //     },
  //     {
  //       _id: '5f04c1c35e',
  //       projectId: '5f88372e6209512343',
  //       name: 'Quote-2',
  //       description: '<p>Quote Description</p>\n',
  //       quoteUrl: 'File.pdf',
  //     },
  //   ];
  //   const setQuoteData = jest.spyOn(wrapper.instance(), 'setQuoteData');
  //   wrapper.setProps({ data: newData });
  //   expect(setQuoteData).toHaveBeenCalledTimes(1);
  // });

  // test('for componentDidUpdate with no change in quote data setQuoteData ', () => {
  //   const prevProps = props;
  //   prevProps.data = [
  //     {
  //       _id: '5f04c1c35e',
  //       projectId: '5f88372e6209512343',
  //       name: 'Quote-1',
  //       description: '<p>Quote Description</p>\n',
  //       quoteUrl: 'File.pdf',
  //     },
  //   ];
  //   const wrapper = shallow(<MainForm {...prevProps} />);
  //   const newData = [
  //     {
  //       _id: '5f04c1c35e',
  //       projectId: '5f88372e6209512343',
  //       name: 'Quote-1',
  //       description: '<p>Quote Description</p>\n',
  //       quoteUrl: 'File.pdf',
  //     },
  //     {
  //       _id: '5f04c1c35e',
  //       projectId: '5f88372e6209512343',
  //       name: 'Quote-2',
  //       description: '<p>Quote Description</p>\n',
  //       quoteUrl: 'File.pdf',
  //     },
  //   ];
  //   const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
  //   wrapper.setProps({ data: newData });
  //   expect(componentDidUpdate).toHaveBeenCalledTimes(4);
  // });

  test('Testing if setTalentDetails', () => {
    const setTalentDetails = jest.spyOn(getInstance(), 'setTalentDetails');
    const pageNum = 1;
    setTalentDetails(pageNum);
    expect(setTalentDetails).toHaveBeenCalledTimes(1);
  });

  // test('Testing if handleChangeStatus', () => {
  //   const handleChangeStatus = jest.spyOn(getInstance(), 'handleChangeStatus');
  //   const talentId = 'id';
  //   const selectedVal = { lable: 'active', value: 1 };
  //   handleChangeStatus(talentId, selectedVal);
  //   expect(handleChangeStatus).toHaveBeenCalledTimes(1);
  // });
});
