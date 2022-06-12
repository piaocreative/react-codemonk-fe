export const downloadAttachment = (e, url) => {
  e.preventDefault();
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};
