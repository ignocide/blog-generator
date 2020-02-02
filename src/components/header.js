import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Header = ({ siteTitle }) => (
  <header
  // style={{
  //   background: `rebeccapurple`,
  //   marginBottom: `1.45rem`,
  // }}
  >
    <div className={'header'}>
      <div className={'header-inner'}>
        <h1>
          <Link to='/'>{'Teck Blog'}</Link>
        </h1>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
