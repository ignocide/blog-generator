/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import '../style/layout.scss';

const Layout = ({ children, side = null }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery2 {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Helmet>

      <Header siteTitle={data.site.siteMetadata.title} />

      <div className={'main-container has-aside'}>
        <aside>
          {side}
        </aside>
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
