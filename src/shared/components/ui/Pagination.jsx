// Dependencies
import React, { Component } from 'react';
import { number, string } from 'prop-types';

// Utils
import { getPaginationPageFromParam } from '../../utils/url';

// Components
import Icon from './Icon';
import Link from './Link';

// Styles
import styles from './Pagination.styl';

class Pagination extends Component {
  static propTypes = {
    page: number.isRequired,
    rows: number.isRequired,
    url: string.isRequired
  }

  constructor(props) {
    super(props);

    this.maxElementsPerPage = 10;
    this.increment = 5;
  }

  getCurrentPage = (start, end) => start === 0 ? 1 : start / end + 1;

  getPageNav = (firstPage, lastPage, start, end, url) => {
    const pageNav = [];

    for (let i = firstPage; i < lastPage; i += 1) {
      const pge = i + 1;
      const next = i * end;

      if (start === next) {
        pageNav.push(
          <li key={i}>
            <Link to="#" className={styles.active}>{pge}</Link>
          </li>
        );
      } else {
        pageNav.push(
          <li key={i}>
            <Link to={`${url}${pge}/`} title={pge}>{pge}</Link>
          </li>
        );
      }
    }

    return pageNav;
  }

  getPageNext = (currentPage, pages, url) => {
    if (currentPage <= (pages - 1)) {
      return (
        <li>
          <Link to={`${url}${currentPage + 1}/`} className={styles.next}>
            <Icon type="chevron-right" />
          </Link>
        </li>
      );
    }

    return null;
  }

  getPagePrevious = (start, currentPage, url) => {
    if (start > 0) {
      return (
        <li>
          <Link to={`${url}${currentPage - 1}/`} className={styles.previous}>
            <Icon type="chevron-left" />
          </Link>
        </li>
      );
    }

    return null;
  }

  getPaginationLimit(params, total, returnStart) {
    const paginationPage = params > 0
      ? params
      : getPaginationPageFromParam(params);

    const start = paginationPage > 0
      ? paginationPage * this.maxElementsPerPage - this.maxElementsPerPage
      : 0;

    if (returnStart) {
      return start;
    }

    return `${start}, ${this.maxElementsPerPage}`;
  }

  getPagination(page, total, url) {
    const start = this.getPaginationLimit(page, total, true);
    const end = this.maxElementsPerPage;

    if (total > this.maxElementsPerPage) {
      return this.buildPagination(total, end, start, url);
    }

    return '';
  }

  buildPagination(total, end, start, url, elementsPerPage) {
    const limit = elementsPerPage || this.maxElementsPerPage;

    let currentPage;
    let firstPage;
    let lastPage;
    let pageNav = '';
    let pageNext = '';
    let pagePrevious = '';
    let pages;
    let rest;

    if (total > end) {
      rest = total % end;
      pages = rest === 0 ? total / end : (total - rest) / end + 1;
      currentPage = start / end + 1;

      if (pages > limit) {
        if (start === 0) {
          firstPage = 0;
          lastPage = limit;
        }

        if (currentPage < this.increment) {
          firstPage = 0;
          lastPage = currentPage + this.increment + (this.increment - currentPage);
        } else {
          firstPage = currentPage - this.increment - (currentPage + this.increment - pages);
          lastPage = pages;
        }

        if (currentPage >= this.increment && currentPage <= pages - this.increment) {
          firstPage = currentPage - this.increment;
          lastPage = currentPage + this.increment;
        }
      } else {
        firstPage = 0;
        lastPage = pages;
      }

      pageNav = this.getPageNav(firstPage, lastPage, start, end, url, limit);
      currentPage = this.getCurrentPage(start, end);
      pageNext = this.getPageNext(currentPage, pages, url);
      pagePrevious = this.getPagePrevious(start, currentPage, url);
    }

    return (
      <ul>
        {pagePrevious}
        {pageNav}
        {pageNext}
      </ul>
    );
  }

  render() {
    const { page, rows, url } = this.props;

    return (
      <div className={styles.pagination}>
        {this.getPagination(page, rows, url)}
      </div>
    );
  }
}

export default Pagination;
