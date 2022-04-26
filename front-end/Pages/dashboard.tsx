import {
  CheckCircle,
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
              <a target="_blank" className={theme.btn} href="/img/CV-RobRondon-ENG.pdf">
                Download CV
              </a>

              <a className={theme.btnPrimary} href="#contact">
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
                  I'm a 32 years old trainee Full Stack Web Developer looking forward to give my first steps in software development on a company that
                  allows me to enhance my professional growth and potentiate my skills
                </Typography>

                <a className={theme.btnPrimary} href="#contact">
                  Let's Talk
                </a>
              </div>
            </div>
          </div>

          <div id="experience" className={theme.experience}>
            <Typography variant="h5">What Skills Do I Have</Typography>

            <Typography variant="h2">My Experience</Typography>

            <div className={theme.experienceContainer}>
              <div className={theme.frontend}>
                <Typography variant="h3">Frontend Development</Typography>

                <div className={theme.experienceContent}>
                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">HTML</Typography>

                      <span className={theme.small}>Medium</span>
                    </div>
                  </div>

                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">CSS</Typography>

                      <span className={theme.small}>Medium</span>
                    </div>
                  </div>

                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">JavaScript</Typography>

                      <span className={theme.small}>Medium</span>
                    </div>
                  </div>

                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">React</Typography>

                      <span className={theme.small}>Beginner</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={theme.backend}>
                <Typography variant="h3">Backend Development</Typography>

                <div className={theme.experienceContent}>
                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">Node js</Typography>

                      <span className={theme.small}>Medium</span>
                    </div>
                  </div>

                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">Express js</Typography>

                      <span className={theme.small}>Medium</span>
                    </div>
                  </div>

                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">MySQL</Typography>

                      <span className={theme.small}>Medium</span>
                    </div>
                  </div>

                  <div className={theme.experienceDetails}>
                    <div className={theme.experienceIcon}>
                      <CheckCircle />
                    </div>

                    <div>
                      <Typography variant="h4">Sequelize</Typography>

                      <span className={theme.small}>Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="portfolio" className={theme.section}>
            <Typography variant="h5">My Recent Work</Typography>

            <Typography variant="h2">Portfolio</Typography>

            <div className={theme.portfolioContainer}>
              <div className={theme.portfolioItem}>
                <div className={theme.portfolioImage}>
                  <picture>
                    <img src="/img/quoteGenerator.gif" alt="/img/quoteGenerator.gif" />
                  </picture>
                </div>

                <Typography variant="h3">Quotes Generator</Typography>

                <div className={theme.portfolioCta}>
                  <a target="_blank" className={theme.btn} href="https://github.com/robrondon/Quote_Generator">
                    Github
                  </a>

                  <a target="_blank" className={theme.btnPrimary} href="https://robrondon.github.io/Quote_Generator/">
                    Live Demo
                  </a>
                </div>
              </div>

              <div className={theme.portfolioItem}>
                <div className={theme.portfolioImage}>
                  <picture>
                    <img src="/img/picInpic.gif" alt="/img/picInpic.gif" />
                  </picture>
                </div>

                <Typography variant="h3">Picture in Picture</Typography>

                <div className={theme.portfolioCta}>
                  <a target="_blank" className={theme.btn} href="https://github.com/robrondon/Picture_in_Picture">
                    Github
                  </a>

                  <a target="_blank" className={theme.btnPrimary} href="https://robrondon.github.io/Picture_in_Picture/">
                    Live Demo
                  </a>
                </div>
              </div>

              <div className={theme.portfolioItem}>
                <div className={theme.portfolioImage}>
                  <picture>
                    <img src="/img/jokeTeller.gif" alt="/img/jokeTeller.gif" />
                  </picture>
                </div>

                <Typography variant="h3">Joke Teller</Typography>

                <div className={theme.portfolioCta}>
                  <a target="_blank" className={theme.btn} href="https://github.com/robrondon/joke_teller">
                    Github
                  </a>

                  <a target="_blank" className={theme.btnPrimary} href="https://robrondon.github.io/joke_teller/">
                    Live Demo
                  </a>
                </div>
              </div>

              <div className={theme.portfolioItem}>
                <div className={theme.portfolioImage}>
                  <picture>
                    <img src="/img/infiniteScroll.gif" alt="/img/infiniteScroll.gif" />
                  </picture>
                </div>

                <Typography variant="h3">Infinite Scroll</Typography>

                <div className={theme.portfolioCta}>
                  <a target="_blank" className={theme.btn} href="https://github.com/robrondon/Infinite_Scroll">
                    Github
                  </a>

                  <a target="_blank" className={theme.btnPrimary} href="https://robrondon.github.io/Infinite_Scroll/">
                    Live Demo
                  </a>
                </div>
              </div>

              <div className={theme.portfolioItem}>
                <div className={theme.portfolioImage}>
                  <picture>
                    <img src="/img/rotatingNav.gif" alt="/img/rotatingNav.gif" />
                  </picture>
                </div>

                <Typography variant="h3">Rotating NavBar</Typography>

                <div className={theme.portfolioCta}>
                  <a target="_blank" className={theme.btn} href="https://github.com/robrondon/rotating_navigation_bar">
                    Github
                  </a>

                  <a target="_blank" className={theme.btnPrimary} href="https://robrondon.github.io/rotating_navigation_bar/">
                    Live Demo
                  </a>
                </div>
              </div>

              <div className={theme.portfolioItem}>
                <div className={theme.portfolioImage}>
                  <picture>
                    <img src="/img/simonGame.gif" alt="/img/simonGame.gif" />
                  </picture>
                </div>

                <Typography variant="h3">Simon Game</Typography>

                <div className={theme.portfolioCta}>
                  <a target="_blank" className={theme.btn} href="https://github.com/robrondon/Simon-Game">
                    Github
                  </a>

                  <a target="_blank" className={theme.btnPrimary} href="https://robrondon.github.io/Simon-Game/">
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className={theme.contactMe}>
            <Typography variant="h5">Get In Touch</Typography>

            <Typography variant="h2">Contact Me</Typography>

            <div className={theme.contactContainer}>
              <div className={theme.contactOptions}>
                <div className={theme.option}>
                  <div className={theme.icon}>
                    <LinkedIn />
                  </div>

                  <Typography variant="h4">LinkedIn</Typography>

                  <Typography variant="h5">robrondon</Typography>

                  <a target="_blank" href="https://www.linkedin.com/in/robrondon/">
                    My LinkedIn Profile
                  </a>
                </div>

                <div className={theme.option}>
                  <div className={theme.icon}>
                    <WhatsApp />
                  </div>

                  <Typography variant="h4">WhatsApp</Typography>

                  <Typography variant="h5">+5491124002852</Typography>

                  <a target="_blank" href="https://wa.me/5491124002852">
                    Send me a message
                  </a>
                </div>

                <div className={theme.option}>
                  <div className={theme.icon}>
                    <Email />
                  </div>

                  <Typography variant="h4">Email</Typography>

                  <Typography variant="h5">robrondon11@gmail.com</Typography>

                  <a target="_blank" href="mailto:robrondon11@gmail.com">
                    Send me an email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
