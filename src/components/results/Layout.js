import React, { useState, useEffect, Fragment } from 'react';

import ResultsTable from './ResultsTable';

const Layout = props => {
  return <ResultsTable results={props.results} />;
};

export default Layout;
