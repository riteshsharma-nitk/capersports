import PropTypes from 'prop-types';
import { useEffect } from 'react';
// rtl
import rtlPlugin from 'stylis-plugin-rtl';
// emotion
import createCache from '@emotion/cache';
import { useTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
// @mui


// ----------------------------------------------------------------------

RtlLayout.propTypes = {
  children: PropTypes.node,
};

export default function RtlLayout({ children }) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
