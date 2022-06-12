import SelectTags from '../index';

describe('test functions', () => {
  test('test select tag', () => {
    const selectTags = SelectTags({ height: 10, errorSelect: true });
    selectTags.props.components.DropdownIndicator();
    selectTags.props.components.IndicatorSeparator();
    selectTags.props.theme({ colors: [] });
  });
});
