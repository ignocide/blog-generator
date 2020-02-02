import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title='about blog' />
    <h1>안녕하세요. ignocide 블로그입니다.</h1>
    <p>흔한 개발자의 흔한 개발 기술 블로그입니다.</p>
    <p>지향하는 컨탠츠는 '누구나 사용하고 알고 있지만, 배우지 않는 것들'입니다.</p>
    <p>(지켜지지는 않을 예정입니다.)</p>
    <Link to='/page/1'>Articles</Link>
  </Layout>
);

export default IndexPage;
