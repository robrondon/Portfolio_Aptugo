import {
  Email,
  FolderCopy,
  GitHub,
  Home,
  LibraryBooksOutlined,
  LinkedIn,
  MessageOutlined,
  MilitaryTech,
  PeopleAlt,
  PersonOutline,
  WhatsApp,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import portfoliomodulescss from 'dist/css/portfolio.module.scss'
import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = portfoliomodulescss
  const [activeNav, setactiveNav] = React.useState<any>('#home')

  // Theme selection

  const changeActiveClass = (section) => {
    return activeNav === `#${section}` ? theme.active : ''
  }

  console.log('activeNav', activeNav)
  return (
    <React.Fragment>
      <div>
        <div className={theme.container}>
          <div id="home" className={theme.header}>
            <Typography variant="h5">Hello i'm</Typography>

            <Typography variant="h1">Rob Rondon</Typography>

            <Typography variant="h5">
              <span className={theme.textLight}>Full Stack Developer</span>
            </Typography>

            <div className={theme.cta}>
              <a target="_blank" className={theme.btn} href="/img/CV-RobRondon-ESP.pdf">
                Download CV
              </a>

              <a className={theme.btnPrimary} href="#">
                Let's Talk
              </a>
            </div>

            <div className={theme.headerSocials}>
              <a target="_blank" href="https://github.com/robrondon">
                <GitHub className="theme.icon" />
              </a>

              <a target="_blank" href="https://www.linkedin.com/in/robrondon/">
                <LinkedIn className="theme.icon" />
              </a>

              <a target="_blank" href="https://wa.me/5491124002852">
                <WhatsApp className="theme.icon" />
              </a>

              <a target="_blank" href="mailto:robrondon11@gmail.com">
                <Email className="theme.icon" />
              </a>
            </div>

            <div className={theme.me}>
              <picture>
                <img src="/img/foto_cv-removebg.png" alt="/img/foto_cv-removebg.png" />
              </picture>
            </div>

            <a className={theme.scroll_down} href="#about">
              Scroll Down
            </a>
          </div>

          <div className={theme.nav}>
            <div onClickCapture={(e) => setactiveNav('#home')}>
              <a className={changeActiveClass('home')} href="#home">
                <Home />
              </a>
            </div>

            <div onClickCapture={(e) => setactiveNav('#about')}>
              <a className={changeActiveClass('about')} href="#about">
                <PersonOutline />
              </a>
            </div>

            <div onClickCapture={(e) => setactiveNav('#experience')}>
              <a className={changeActiveClass('experience')} href="#experience">
                <LibraryBooksOutlined />
              </a>
            </div>

            <div onClickCapture={(e) => setactiveNav('#portfolio')}>
              <a className={changeActiveClass('portfolio')} href="#portfolio">
                <WorkOutlineOutlined />
              </a>
            </div>

            <div onClickCapture={(e) => setactiveNav('#contact')}>
              <a className={changeActiveClass('contact')} href="#contact">
                <MessageOutlined />
              </a>
            </div>
          </div>

          <div id="about" className={theme.section}>
            <Typography variant="h5">Get to Know</Typography>

            <Typography variant="h2">About Me</Typography>

            <div className={theme.aboutContainer}>
              <div className={theme.aboutMe}>
                <div className={theme.aboutMeImage}>
                  <picture>
                    <img src="/img/robert.jpg" alt="/img/robert.jpg" />
                  </picture>
                </div>
              </div>

              <div className={theme.aboutContent}>
                <div className={theme.aboutCards}>
                  <div className={theme.aboutCard}>
                    <div className={theme.aboutIcon}>
                      <MilitaryTech />
                    </div>

                    <Typography variant="h5">Experience</Typography>

                    <span className={theme.small}>0+ years</span>
                  </div>

                  <div className={theme.aboutCard}>
                    <div className={theme.aboutIcon}>
                      <PeopleAlt />
                    </div>

                    <Typography variant="h5">Clients</Typography>

                    <span className={theme.small}>3 Worldwide</span>
                  </div>

                  <div className={theme.aboutCard}>
                    <div className={theme.aboutIcon}>
                      <FolderCopy />
                    </div>

                    <Typography variant="h5">Projects</Typography>

                    <span className={theme.small}>5+ Completed</span>
                  </div>
                </div>

                <Typography variant="inherit">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nulla, minus ad quam exercitationem, omnis placeat ipsum
                  praesentium, distinctio alias illo saepe a eos ratione adipisci magnam perspiciatis vitae sunt!
                </Typography>

                <a className={theme.btnPrimary} href="#">
                  Let's Talk
                </a>
              </div>
            </div>
          </div>

          <div id="experience" className={theme.section}>
            Experience
          </div>

          <div id="services" className={theme.section}>
            Services
          </div>

          <div id="portfolio" className={theme.section}>
            Portfolio
          </div>

          <div id="testimonials" className={theme.section}>
            Testimonials
          </div>

          <div id="contact" className={theme.section}>
            Contact
          </div>

          <div>Footer</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
