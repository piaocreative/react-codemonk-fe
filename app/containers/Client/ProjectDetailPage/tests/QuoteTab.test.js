import React from 'react';
import { shallow } from 'enzyme';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import { QuoteTab as MainForm } from '../QuoteTab';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },
  quoteDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  data: [
    {
      _id: '5f04c1c35e',
      projectId: '5f88372e6209512343',
      name: 'Quote-1',
      description: '<p>Quote Description</p>\n',
      quoteUrl: 'File.pdf',
    },
  ],
  projectData: {
    status: 1,
    data: {
      _id: '5f8837b20aca2e6209512343',
      lookingFor: {
        design: [],
        softwareDevelopment: [],
        developmentTeam: [],
        dataAiMl: [],
      },
      clientId: '5f320622c5054fb3',
      name: 'Admin Project',
      description:
        '<p>Admin Project Admin Project Admin Project Admin Project Admin Project Admin Project Admin Project Admin Project new text</p>\n',
      startDate: '2020-10-16T00:00:00.000Z',
      endDate: '2020-12-05T00:00:00.000Z',
      isQuoteShow: true,
      status: 'In Progress',
      quotes: [
        {
          _id: '5f04c1c35e',
          projectId: '5f88372e6209512343',
          name: 'Quote-1',
          description: '<p>Quote Description</p>\n',
          quoteUrl: 'File.pdf',
        },
      ],
      clientName: "Roger Client's Lasttttttt",
      clientEmail: 'user@yopmail.com',
    },
    message: 'Success',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  quotePopupClose: jest.fn(),
  quoteModalSubmit: jest.fn(),
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

describe('QuoteTab Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if toggle with quoteSubmit', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('quoteSubmit', true);
    expect(component.state('showQuoteModal')).toEqual(false);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('for componentDidUpdate', () => {
    const prevProps = props;
    prevProps.showQuoteModal = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ showQuoteModal: true });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for componentDidUpdate with else', () => {
    const prevProps = props;
    prevProps.showQuoteModal = true;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ showQuoteModal: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for componentDidUpdate with change in quote data setQuoteData ', () => {
    const prevProps = props;
    prevProps.data = [
      {
        _id: '5f04c1c35e',
        projectId: '5f88372e6209512343',
        name: 'Quote-1',
        description: '<p>Quote Description</p>\n',
        quoteUrl: 'File.pdf',
      },
    ];
    const wrapper = shallow(<MainForm {...prevProps} />);
    const newData = [
      {
        _id: '5f04c1c35e',
        projectId: '5f88372e6209512343',
        name: 'Quote-2',
        description: '<p>Quote Change</p>\n',
        quoteUrl: 'File.pdf',
      },
      {
        _id: '5f04c1c35e',
        projectId: '5f88372e6209512343',
        name: 'Quote-2',
        description: '<p>Quote Description</p>\n',
        quoteUrl: 'File.pdf',
      },
    ];
    const setQuoteData = jest.spyOn(wrapper.instance(), 'setQuoteData');
    wrapper.setProps({ data: newData });
    expect(setQuoteData).toHaveBeenCalledTimes(1);
  });

  test('for componentDidUpdate with no change in quote data setQuoteData ', () => {
    const prevProps = props;
    prevProps.data = [
      {
        _id: '5f04c1c35e',
        projectId: '5f88372e6209512343',
        name: 'Quote-1',
        description: '<p>Quote Description</p>\n',
        quoteUrl: 'File.pdf',
      },
    ];
    const wrapper = shallow(<MainForm {...prevProps} />);
    const newData = [
      {
        _id: '5f04c1c35e',
        projectId: '5f88372e6209512343',
        name: 'Quote-1',
        description: '<p>Quote Description</p>\n',
        quoteUrl: 'File.pdf',
      },
      {
        _id: '5f04c1c35e',
        projectId: '5f88372e6209512343',
        name: 'Quote-2',
        description: '<p>Quote Description</p>\n',
        quoteUrl: 'File.pdf',
      },
    ];
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ data: newData });
    expect(componentDidUpdate).toHaveBeenCalledTimes(4);
  });

  test('Testing if setQuoteData with checked', () => {
    const setQuoteData = jest.spyOn(getInstance(), 'setQuoteData');
    setQuoteData();
    expect(setQuoteData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAdminQuotes', () => {
    const setAdminQuotes = jest.spyOn(getInstance(), 'setAdminQuotes');
    const pageNum = 1;
    setAdminQuotes(pageNum);
    expect(setAdminQuotes).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleQuoteModalOpen with add', () => {
    const handleQuoteModalOpen = jest.spyOn(getInstance(), 'handleQuoteModalOpen');
    const quoteModalType = 'add';
    const quote = {};
    handleQuoteModalOpen(quoteModalType, quote);
    expect(handleQuoteModalOpen).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleQuoteModalOpen with edit', () => {
    const handleQuoteModalOpen = jest.spyOn(getInstance(), 'handleQuoteModalOpen');
    const quoteModalType = 'edit';
    const quote = {
      _id: '6363304c1c35e',
      projectId: '0aca2e6209512343',
      name: 'Quote-1',
      description: '<p>Quote Description</p>\n',
      quoteUrl: 'c2d6d381375246a7e76b/Attachment.pdf',
    };
    handleQuoteModalOpen(quoteModalType, quote);
    expect(handleQuoteModalOpen).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleQuoteCloseModal ', () => {
    const handleQuoteCloseModal = jest.spyOn(getInstance(), 'handleQuoteCloseModal');
    handleQuoteCloseModal();
    expect(handleQuoteCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if quoteFileChanged ', () => {
    const quoteFileChanged = jest.spyOn(getInstance(), 'quoteFileChanged');
    const quoteFile = 'file.pdf';
    quoteFileChanged(quoteFile);
    expect(quoteFileChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleQuoteModalSubmit ', () => {
    const handleQuoteModalSubmit = jest.spyOn(getInstance(), 'handleQuoteModalSubmit');
    const event = { preventDefault: jest.fn() };
    handleQuoteModalSubmit(event);
    expect(handleQuoteModalSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderClientQuote ', () => {
    const renderClientQuote = jest.spyOn(getInstance(), 'renderClientQuote');
    const quoteData = {
      howMuchBeenDone: '',
      whatAreYouLooking: {
        uxAndUiDesign: [],
        softwareDevelopment: [],
        developmentTeam: [],
        dataAiMl: [],
        growthHacking: 'No',
        agielCoaching: 'No',
        otherRequirement: '',
      },
      whatsYourBudget: '',
      anythingElseWeShould: '',
      howFast: '',
      howWouldManageTeam: '',
    };
    const lookingFor = {
      design: [],
      softwareDevelopment: [],
      developmentTeam: [],
      dataAiMl: [],
    };

    renderClientQuote(quoteData, lookingFor);
    expect(renderClientQuote).toHaveBeenCalledTimes(1);
  });
});
