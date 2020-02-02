import React from 'react';
import cn from 'classnames';
import { Link } from 'gatsby';
import '../../style/common/pagination.scss';
import Icon from './Icon';

const Pagination = ({ totalPageCount, currentPage }) => {
  let shownPage = [];
  let startPage = currentPage - 5;
  let endPage = totalPageCount - 1;
  startPage = startPage < 0 ? 0 : startPage;
  endPage = (startPage + 9) > endPage ? endPage : (startPage + 9);

  for (let page = startPage; endPage >= page; page++) {
    shownPage.push(page);
  }
  console.log(currentPage)

  return <div className={'pagination'}>
    <Link className={cn('page_btn', { disabled: currentPage == 0 })} to={`/page/${1}`}><Icon name={'first_page'} /></Link>
    {
      shownPage.map((page) => {
        return <Link className={cn('page_btn', { active: currentPage == page })} to={`/page/${page + 1}`}>{page + 1}</Link>
      })
    }
    <Link className={cn('page_btn', { disabled: currentPage == totalPageCount - 1 })} to={`/page/${totalPageCount}`}><Icon name={'last_page'} /></Link>
  </div>;
}

export default Pagination;