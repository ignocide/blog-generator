import React from 'react';
import Layout from '../components/layout';
import Icon from '../components/common/Icon';
import { Link } from 'gatsby'
import '../style/pages/post-detail.scss';

const PostTemplate: React.FC = ({ pageContext }) => {
  const { html, title, date, tags } = pageContext;
  console.log(tags)
  return (
    <Layout>
      <div className={'post-detail'}>
        <div className={'post-header'}>
          <h1 className={'title'}>{title}</h1>
          <div className={'post-date'}><Icon name={'calendar_today'} />{` 작성일 `}<time dateTime={`${date} 12:00`}>{date}</time></div>
          <div className={'tags'}><Icon name={'tag'} />{tags.map((tag) => {
            return <Link to={`/tags/${tag}`} className={'tag'}><span >{tag}</span></Link>
          })}</div>

        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>

    </Layout>
  );
};

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
