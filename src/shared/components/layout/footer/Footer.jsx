// Dependencies
import React, { Component } from 'react';
import { bool, func } from 'prop-types';

// Utils
import { cx, animateScrollTop, getScrollTop } from '@utils/frontend';

// Components
import Icon from '@ui/Icon';
import Link from '@ui/Link';
import Logo from '@layout/header/Logo';

// Styles
import styles from './Footer.styl';

class Footer extends Component {
  static propTypes = {
    content: func,
    isMobile: bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showBackToTop: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isMobile } = nextProps;

    if (!isMobile) {
      window.addEventListener('scroll', () => {
        this.handleScroll();
      });
    }
  }

  handleScroll = () => {
    const scrollTop = getScrollTop();
    const scrollTrigger = 1000;

    this.setState({
      showBackToTop: scrollTop > scrollTrigger
    });
  }

  handleClick = e => {
    e.preventDefault();

    animateScrollTop();
  }

  render() {
    const { isMobile, content } = this.props;
    const language = content('Site.language');

    const backToTop = (
      <Link
        to="#"
        className={cx(styles.backToTop, this.state.showBackToTop ? styles.show : '')}
        onClick={this.handleClick}
      >
        <Icon type="angle-up" />
        <span className={styles.circleBg} />
      </Link>
    );

    return (
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <div className={styles.menuLeft}>
            <h3>Codejobs</h3>

            <ul>
              {language === 'es' && <li><Link to="/es/pages/nosotros" external>{content('Frontend.Global.Footer.aboutUs')}</Link></li>}
              {language === 'es' && <li><Link to="/es/pages/publicidad" external>{content('Frontend.Global.Header.MainNav.advertising')}</Link></li>}
              <li><Link to="/register" external>{content('Frontend.Global.Header.MainNav.register')}</Link></li>
              <li><Link to="/contact">{content('Dashboard.modules.feedback.name')}</Link></li>
            </ul>
          </div>

          <div className={styles.menuCenter}>
            {/* <h3>Sitio</h3>

            <ul>
              <li><Link to="#">Codigos</Link></li>
              <li><Link to="#">Marcadores</Link></li>
              <li><Link to="#">Empleos</Link></li>
              <li><Link to="#">Foros</Link></li>
            </ul> */}
          </div>

          <div className={styles.infoRight}>
            <Logo isotype />

            <p>
              {content('Frontend.Global.Footer.message')}
            </p>

            <ul>
              <li><Link to="/slack" target="_blank" external><Icon type="slack" /></Link></li>
              <li><Link to="http://twitter.com/codejobs" target="_blank"><Icon type="twitter" /></Link></li>
              <li><Link to="http://facebook.com/codejobs" target="_blank"><Icon type="facebook" /></Link></li>
              <li><Link to="http://youtube.com/codejobs" target="_blank"><Icon type="youtube" /></Link></li>
            </ul>

            <div className={styles.copyRight}>
              {(new Date()).getFullYear()} © Codejobs
            </div>
          </div>
        </div>

        {!isMobile ? backToTop : ''}
      </footer>
    );
  }
}

export default Footer;
