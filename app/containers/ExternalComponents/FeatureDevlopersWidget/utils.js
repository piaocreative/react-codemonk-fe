export const sortUrl = sort => {
  let url = '';
  let val = '';
  switch (sort) {
    case 'recentlowToHigh':
      val = { _id: 1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'recenthighToLow':
      val = { _id: -1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'lowToHigh':
      val = { experienceOrder: 1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'highToLow':
      val = { experienceOrder: -1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    default:
  }
  return url;
};
