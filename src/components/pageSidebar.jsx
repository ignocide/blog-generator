import React from 'react';
import '../style/page-sidebar.scss'
import Icon from './common/Icon';
import cn from 'classnames'
import { Link } from 'gatsby';

const PageSidebar = ({ tags, currentTag, ...props }) => {
  const { pathname } = window.location;

  return <div className={'sidebar'}>
    <div className={'intorduce'}>
      <div className={'nickname'}>{`ignocide`}<span className={'aka'}>{`(a.k.a morse, gaeran)`}</span></div><br />
      <div className={'job'}>{'web developer'}</div><br />
      <div className={'links'}>
        <a href={'https://github.com/ignocide'} target={'_blank'}><Icon name={'code'} />{" https://github.com/ignocide"}</a><br />
        <a href={'https://ignocide.github.io/resume'} target={'_blank'}><Icon name={'person'} />{" https://ignocide.github.io/resume"}</a>
        <a href={'mailto:ignocide@gmail.com'} target={'_blank'}><Icon name={'email'} />{" ignocide@gmail.com"}</a>
      </div>
    </div>
    <div>
      <ul className={'menus'}>
        <li className={cn({ active: pathname.indexOf('/page') === 0 })}><label><Link to={'/page/1'}>{"All Articles"}</Link></label></li>
        <li className={cn({ active: pathname.indexOf('/tags') === 0 })}>
          <label>{'Tags'}</label>
          <ul className={'tags'}>
            {tags.map((tag) => {
              return <li className={cn('tag', { 'active': tag === currentTag })}>
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            })}
          </ul>
        </li>
      </ul>
    </div>
  </div>
}


export default PageSidebar;