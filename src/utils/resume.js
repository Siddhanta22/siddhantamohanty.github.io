// Opens the PDF in a new tab so recruiters can read it straight away;
// the browser's own PDF viewer still offers a download button.
export const RESUME_URL = `${process.env.PUBLIC_URL || ''}/Resume_main.pdf`;

export const viewResume = () => {
  window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
};
