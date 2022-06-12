import * as functions from '../index';

describe('test functions', () => {
  test('test LoaderLines', () => {
    const LoaderLines = jest.spyOn(functions, 'LoaderLines');
    const test = LoaderLines({ width: 10, height: 10 });
    expect(test.props.width).toEqual(10);
  });
  test('test LoaderCircle', () => {
    const LoaderCircle = jest.spyOn(functions, 'LoaderCircle');
    const test = LoaderCircle({ width: 10, height: 10 });
    expect(test.props.width).toEqual(10);
  });
  test('test CardSkeleton', () => {
    const CardSkeleton = jest.spyOn(functions, 'CardSkeleton');
    const props = { cardCount: 10 };
    CardSkeleton(props);
    expect(CardSkeleton).toHaveBeenCalledTimes(1);
  });

  test('test BriefCardSkeleton', () => {
    const BriefCardSkeleton = jest.spyOn(functions, 'BriefCardSkeleton');
    const props = { cardCount: 10 };
    BriefCardSkeleton(props);
    expect(BriefCardSkeleton).toHaveBeenCalledTimes(1);
  });

  test('test NotificationCardSkeleton', () => {
    const NotificationCardSkeleton = jest.spyOn(functions, 'NotificationCardSkeleton');
    const props = { cardCount: 10 };
    NotificationCardSkeleton(props);
    expect(NotificationCardSkeleton).toHaveBeenCalledTimes(1);
  });

  test('test TableSkeletonCol6', () => {
    const TableSkeletonCol6 = jest.spyOn(functions, 'TableSkeletonCol6');
    const props = { cardCount: 10 };
    TableSkeletonCol6(props);
    expect(TableSkeletonCol6).toHaveBeenCalledTimes(1);
  });

  test('test TableSkeletonCol4', () => {
    const TableSkeletonCol4 = jest.spyOn(functions, 'TableSkeletonCol4');
    const props = { cardCount: 10 };
    TableSkeletonCol4(props);
    expect(TableSkeletonCol4).toHaveBeenCalledTimes(1);
  });

  test('test TableSkeletonCol3', () => {
    const TableSkeletonCol3 = jest.spyOn(functions, 'TableSkeletonCol3');
    const props = { cardCount: 10 };
    TableSkeletonCol3(props);
    expect(TableSkeletonCol3).toHaveBeenCalledTimes(1);
  });
});
