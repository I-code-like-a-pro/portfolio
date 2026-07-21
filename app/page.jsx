'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail,
  FiArrowDown, FiArrowUp, FiMapPin, FiPhone, FiExternalLink, FiDownload,
} from 'react-icons/fi'
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript,
  SiTypescript, SiNodedotjs, SiExpress, SiGit, SiPython, SiFlask,
} from 'react-icons/si'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: 'Home',     href: '#home' },
  { name: 'About',    href: '#about' },
  { name: 'Skills',   href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact',  href: '#contact' },
]

const SKILLS = [
  { name: 'React',       icon: SiReact,      color: '#61DAFB', level: 90 },
  { name: 'Next.js',     icon: SiNextdotjs,  color: '#000000', level: 90 },
  { name: 'Tailwind CSS',icon: SiTailwindcss,color: '#06B6D4', level: 100 },
  { name: 'JavaScript',  icon: SiJavascript, color: '#F7DF1E', level: 70 },
  { name: 'TypeScript',  icon: SiTypescript, color: '#3178C6', level: 70 },
  { name: 'Node.js',     icon: SiNodedotjs,  color: '#339933', level: 70 },
  { name: 'Express',     icon: SiExpress,    color: '#000000', level: 70 },
  { name: 'Git',         icon: SiGit,        color: '#F05032', level: 70 },
  { name: 'Python',      icon: SiPython,     color: '#339933', level: 70 },
  { name: 'Flask',       icon: SiFlask,      color: '#888888', level: 100 },
]

const PROJECTS = [
  {
    title: 'ArtistSphere',
    description:
      'A modern music portfolio platform for artists to showcase their discography, share albums, and connect with fans.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    github: 'https://github.com/I-code-like-a-pro/Artisitsphere',
    live: 'https://artisitsphere.vercel.app/',
  },
  {
    title: 'Chat Bot',
    description:
      'An intelligent conversational AI assistant capable of natural language processing, interactive games, and providing helpful information to users.',
    tags: ['JavaScript', 'React', 'CSS'],
    github: 'https://github.com/I-code-like-a-pro/chatbot',
    live: 'https://my-chatbot-wtg7.vercel.app/',
  },
  {
    title: 'EventFlow',
    description:
      'A comprehensive event management platform that enables users to create, view, and delete events, manage attendee lists, and share events with others. Features include user authentication, password recovery, and intuitive event organization.',
    tags: ['Python', 'HTML', 'CSS', 'Flask', 'SQLite'],
    github: 'https://github.com/I-code-like-a-pro/temp_repo_storage',
    live: 'https://temp-repo-storage-7avj.vercel.app/',
  },
  {
    title:'SME-AI',
    description:"SME AI is an AI-powered financial assistant designed for small traders and micro-business owners who operate outside the formal banking system. It monitors real-time market prices, tracks sales, and proactively alerts traders when they are selling at a loss — all through a simple conversational interface that requires no financial literacy to use",
    tags:["Next.js", "Express", "Supabase"],
    github:'https://github.com/I-code-like-a-pro/SME-AI',
    live:"https://sme-ai-psi.vercel.app/"
  }
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [isMenuOpen, setIsMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled]         = useState(false)
  const [scrollDirection, setScrollDirection] = useState('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      // Navbar background
      setScrolled(currentY > 50)

      // Scroll direction
      setScrollDirection(currentY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentY

      // Active section highlight
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = currentY + 100

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">

      {/* ── Navigation ── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-primary"
            >
              EC
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary'
                      : 'text-dark hover:text-primary'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-dark hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary bg-primary/5'
                      : 'text-dark hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-secondary p-1"
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">EC</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-5xl font-bold text-dark mb-4 text-center"
            >
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Emaediong Chrysanthus
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-6"
            >
              Web Developer &amp; Problem Solver
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            >
              I create beautiful, responsive web applications that help businesses
              grow and succeed in the digital world.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a
                href="#contact"
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="border-2 border-transparent text-primary px-8 py-3 rounded-lg font-medium hover:border-primary transition-colors duration-300"
              >
                View Projects
              </a>
              <a
                href="/Emaediong--CV.docx"
                download="Emaediong_Chrysanthus_Resume.docx"
                className="border-2 border-gray-300 text-gray-600 px-8 py-3 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FiDownload /> Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex justify-center space-x-6"
            >
              <a
                href="https://github.com/I-code-like-a-pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="mailto:chrysolodivine@gmail.com"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                <FiMail size={24} />
              </a>
            </motion.div>

            {/* Scroll arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <a
                href={scrollDirection === 'up' ? '#home' : '#about'}
                className="animate-bounce inline-block"
              >
                {scrollDirection === 'up'
                  ? <FiArrowUp size={24} className="text-gray-400" />
                  : <FiArrowDown size={24} className="text-gray-400" />
                }
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-600">
                I&apos;m a passionate web developer with over 3 years of experience creating
                stunning digital experiences. My journey in web development started with
                a curiosity for how things work on the internet, and it has evolved into
                a full-fledged career doing what I love.
              </p>
              <p className="text-lg text-gray-600">
                I specialize in building responsive web applications using modern
                technologies like React, Next.js, and Node.js. I believe in writing
                clean, maintainable code and creating intuitive user interfaces that
                provide exceptional user experiences.
              </p>
              <p className="text-lg text-gray-600">
                When I&apos;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge with the
                developer community through blog posts and mentoring.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl"
            >
              <div className="grid grid-cols-1 gap-6">
                {[
                  { value: '3+',  label: 'Years Experience' },
                  { value: '20+', label: 'Happy Clients' },
                  { value: '5+',  label: 'Technologies' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{value}</div>
                    <div className="text-gray-600">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-primary" />
                  <span className="text-gray-600">Port Harcourt, Nigeria</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-primary" />
                  <span className="text-gray-600">chrysolodivine@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-primary" />
                  <span className="text-gray-600">+234 812 793 0629</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">My Skills</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <skill.icon size={48} style={{ color: skill.color }} className="mb-3" />
                  <h3 className="font-semibold text-dark mb-2">{skill.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-primary h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/30">{project.title[0]}</span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300"
                    >
                      <FiGithub /> Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={(e) => {
                e.preventDefault()
                alert('Message sent! (Demo)')
              }}
              className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#home" className="text-2xl font-bold text-primary">EC</a>
              <p className="text-gray-400 mt-2">Creating digital experiences that matter.</p>
            </div>

            <div className="flex space-x-6">
              <a href="https://github.com/I-code-like-a-pro/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiLinkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
              <a href="mailto:chrysolodivine@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiMail size={20} />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Emaediong Chrysanthus. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}