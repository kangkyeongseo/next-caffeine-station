import React from 'react';
import { createRoot } from 'react-dom/client';

const jsxToString = (jsx: React.ReactNode) => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(jsx);
  return div;
};

export default jsxToString;
