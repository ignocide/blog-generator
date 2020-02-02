import React from 'react';
import Layout from '../components/asideLayout';
import '../style/pages/tag-page.scss'
import { Link } from 'gatsby';
import PageSidebar from '../components/pageSidebar';
import Pagination from '../components/common/Pagination';

const IndexPageTemplate: React.FC = props => {
  const { list, tags, currentPage, totalPageCount } = props.pageContext
  console.log(list)
  return (
    <Layout side={<PageSidebar tags={tags} currentTag={null} />}>
      {list.map((post) => {
        return <Link className={'post-summary'} to={post.path}><div >
          <div className={'post-summary-title'}>{post.title}</div>
          <p className={'post-summary-excerpt'}>{post.excerpt}</p>
          <span>{post.date}</span>
        </div></Link>
      })}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: props.pageContext.html,
        }}
      /> */}
      <Pagination currentPage={currentPage} totalPageCount={totalPageCount} />
    </Layout>
  );
};

IndexPageTemplate.displayName = 'IndexPageTemplate';



export default IndexPageTemplate;
