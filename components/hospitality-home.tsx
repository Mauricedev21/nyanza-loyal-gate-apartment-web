'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BedDouble, Check, ChevronDown, Menu, Sparkles, X } from 'lucide-react'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { openWhatsApp, whatsappContact, whatsappLink, whatsappMessages } from '@/lib/whatsapp'

const flyer = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-09%20225037-cn583FuA4BbcHcc04ABsnsnFydiRyZ.png'

const navLinks = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Accommodation', '#stay'],
  ['Experiences', '#celebrations'],
  ['Gallery', '#gallery'],
  ['Contact', '#contact'],
]

const galleryItems = [
  { title: 'A considered place to stay', label: 'A QUIET, COMFORTABLE ARRIVAL', position: '50% 8%', className: 'gallery-item--large' },
  { title: 'Dining, thoughtfully prepared', label: 'GATHER AROUND THE TABLE', position: '100% 0%' },
  { title: 'Spaces made for meaningful moments', label: 'CELEBRATE TOGETHER', position: '100% 100%' },
  { title: 'Room to focus and connect', label: 'MEET WITH PURPOSE', position: '0% 100%' },
  { title: 'A moment to slow down', label: 'MAKE SPACE FOR YOURSELF', position: '60% 100%' },
]

const bookingSteps = [
  { number: '01', title: 'Choose your experience', text: 'Tell us whether you are planning a stay, a meal, a celebration or a moment of wellness.' },
  { number: '02', title: 'Share the details', text: 'Add your preferred date, guest count and anything else that will help shape your visit.' },
  { number: '03', title: 'Send your enquiry', text: 'Review your details, then send them straight to the team on WhatsApp.' },
]

const experiences = [
  { title: 'A considered stay', label: 'ACCOMMODATION', copy: 'Unwind in a beautifully appointed room, with thoughtful details that make every arrival feel like coming home.', position: '50% 10%', icon: BedDouble },
  { title: 'Gather around the table', label: 'DINING & CATERING', copy: 'From intimate dinners to generous celebrations, our catering brings people together over food made to be shared.', position: '100% 0%', icon: Sparkles },
  { title: 'A moment to yourself', label: 'WELLNESS', copy: 'Slow down, settle in and make space for a little restoration during your time with us.', position: '62% 100%', icon: Sparkles },
]

const celebrationItems = [
  { title: 'Weddings & receptions', text: 'A graceful setting for the moments you will remember. Bring your people together with thoughtful catering and a beautiful celebration space.', position: '100% 100%' },
  { title: 'Proposals & private occasions', text: 'Mark a meaningful moment with a personal gathering, a romantic table or a celebration shaped around your plans.', position: '100% 0%' },
  { title: 'Meetings & conferences', text: 'Host a focused gathering in a polished environment, with attentive hospitality and catering for your guests.', position: '0% 100%' },
]

const questions = [
  { q: 'What can I arrange at Nyanza Loyal Gate Apartment?', a: 'The property brings together accommodation, catering, dining, wellness and event-focused hospitality. Share what you have in mind and the team can guide you to the right experience.' },
  { q: 'Can I enquire about a wedding or private celebration?', a: 'Yes. Use the booking enquiry below to outline your occasion, preferred date and the experience you are planning.' },
  { q: 'How do I make a booking enquiry?', a: 'Choose your visit type and preferred date in the enquiry form, then send the prefilled message straight to the team on WhatsApp. You can also reach us any time using the WhatsApp button.' },
]

function ImageCrop({ position, className = '', label = 'Nyanza Loyal Gate Apartment hospitality and service imagery' }: { position: string; className?: string; label?: string }) {
  return <div className={`image-crop ${className}`} style={{ backgroundImage: `url("${flyer}")`, backgroundPosition: position }} role="img" aria-label={label} />
}

export function HospitalityHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [requestReady, setRequestReady] = useState(false)
  const [enquiryDraft, setEnquiryDraft] = useState('')
  const [whatsappHref, setWhatsappHref] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1150)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('.intro-section, .experience-section, .statement-band, .celebrations, .gallery-section, .benefits-section, .booking-process, .booking-section, .faq-section')
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    sections.forEach((section) => {
      section.classList.add('reveal-on-scroll')
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const heroImage = document.querySelector<HTMLElement>('.hero-image')
    if (!heroImage) return
    let frame = 0
    const update = () => {
      frame = 0
      const offset = Math.min(window.scrollY, window.innerHeight) * 0.06
      heroImage.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    const sections = ['home', 'about', 'stay', 'celebrations', 'gallery', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.3, 0.6] })
    sections.forEach((section) => observer.observe(section))
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [lightboxIndex])

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  function prepareRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const details = [
      `Visit type: ${form.get('visit')}`,
      `Preferred date: ${form.get('date') || 'Flexible'}`,
      `Guests: ${form.get('guests') || 'To be confirmed'}`,
      `Name: ${form.get('name')}`,
      `Contact: ${form.get('contact')}`,
      `Notes: ${form.get('notes') || 'None'}`,
    ].join('\n')
    const message = `Subject: Booking enquiry — Nyanza Loyal Gate Apartment\n\nHello, I would like to enquire about a booking.\n\n${details}`
    setEnquiryDraft(message)
    setWhatsappHref(whatsappLink(message))
    setRequestReady(true)
    void navigator.clipboard?.writeText(message).catch(() => undefined)
    openWhatsApp(message)
  }

  return (
    <>
      <div className={`intro-loader ${loading ? '' : 'intro-loader--hidden'}`} aria-hidden={!loading}>
        <div className="loader-mark">N<span>LG</span></div>
        <div className="loader-rule"><i /></div>
        <p>NYANZA LOYAL GATE APARTMENT</p>
      </div>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <a className="brand" href="#home" aria-label="Nyanza Loyal Gate Apartment home">
          <span className="brand-seal">N<span>LG</span></span>
          <span className="brand-name">NYANZA LOYAL GATE<small>APARTMENT · CATERING</small></span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([label, href]) => {
            const sectionId = href.slice(1)
            return <a key={href} className={activeSection === sectionId ? 'is-active' : ''} href={href} aria-current={activeSection === sectionId ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
          })}
          <a className="nav-book" href="#booking" onClick={() => setMenuOpen(false)}>Book now <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-image" />
          <div className="hero-grain" />
          <div className="hero-content">
            <p className="eyebrow"><span /> A PLACE TO ARRIVE, A PLACE TO BELONG</p>
            <h1 id="hero-title">Stay a little<br /><em>closer</em> to what<br />matters.</h1>
            <p className="hero-copy">A welcoming stay, memorable dining and meaningful celebrations — thoughtfully brought together at Nyanza Loyal Gate Apartment.</p>
            <div className="hero-actions"><a className="button button-light" href="#booking">Book your stay <ArrowRight size={16} /></a><a className="text-link" href="#stay">Discover the experience <ArrowDown size={15} /></a></div>
          </div>
          <div className="hero-caption"><span>01 / 04</span><i /><span>HOSPITALITY, WITH HEART</span></div>
          <div className="hero-side-note">STAY · DINE · CELEBRATE</div>
          <a href="#intro" className="scroll-cue" aria-label="Scroll to discover"><span>SCROLL TO DISCOVER</span><i /></a>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="section-kicker">01 <span>—</span> A WARM WELCOME</div>
          <div className="intro-grid reveal-stagger">
            <h2>Hospitality that<br /><em>feels like yours.</em></h2>
            <div className="intro-copy"><p className="lead">At Nyanza Loyal Gate Apartment, the best stays are about more than a room. They are about how you feel when you arrive — and the moments you take with you when you leave.</p><p>Settle into comfortable accommodation, enjoy thoughtful catering, restore your sense of calm or gather the people who matter. Here, every experience is an invitation to feel at ease.</p><div className="intro-image"><ImageCrop position="50% 10%" label="Apartment room prepared for a welcoming stay" /></div><a className="under-link" href="#stay">Explore what we offer <ArrowRight size={15} /></a></div>
          </div>
        </section>

        <section className="experience-section section-pad" id="stay">
          <div className="section-heading"><div><div className="section-kicker">02 <span>—</span> THE EXPERIENCE</div><h2>One address.<br /><em>So many ways to stay.</em></h2></div><p>Whether you are here to rest, reconnect or celebrate, discover a stay shaped around the way you want to feel.</p></div>
          <div className="experience-grid reveal-stagger" id="experiences">
            {experiences.map((item, index) => <article className="experience-card" key={item.title}><div className="card-image-wrap"><ImageCrop position={item.position} className="card-image"/><span className="card-index">0{index + 1}</span><span className="card-icon"><item.icon size={17} /></span></div><p className="card-label">{item.label}</p><h3>{item.title}</h3><p className="card-copy">{item.copy}</p><a href="#booking" className="card-link" aria-label={`Enquire about ${item.title}`}><ArrowUpRight size={17} /></a></article>)}
          </div>
        </section>

        <section className="statement-band" id="approach"><div className="statement-image"><ImageCrop position="50% 10%" /></div><div className="statement-content"><div className="section-kicker">A THOUGHTFUL KIND OF WELCOME</div><h2>Small details.<br /><em>Lasting memories.</em></h2><p>From a considered room to a beautifully set table, we believe the little things make a stay feel exceptional. Our approach is simple: warm service, inviting spaces and room for the moments that matter.</p><a className="button button-outline" href="#booking">Plan your visit <ArrowRight size={16} /></a><div className="statement-signature">NLG <span>— NYANZA LOYAL GATE</span></div></div></section>

        <section className="celebrations section-pad" id="celebrations"><div className="section-heading celebrations-heading"><div><div className="section-kicker">03 <span>—</span> GATHER BEAUTIFULLY</div><h2>Make room for<br /><em>the moment.</em></h2></div><p>Some occasions deserve more than an ordinary setting. Bring your people together with hospitality that makes it feel personal.</p></div><div className="celebration-grid reveal-stagger">{celebrationItems.map((item, index) => <article className="celebration-card" key={item.title}><ImageCrop position={item.position} className="celebration-image"/><div className="celebration-overlay"/><div className="celebration-info"><span>0{index + 1} / OCCASIONS</span><h3>{item.title}</h3><p>{item.text}</p><a href="#booking" aria-label={`Enquire about ${item.title}`}><ArrowUpRight size={17}/></a></div></article>)}</div></section>

        <section className="gallery-section section-pad" id="gallery" aria-labelledby="gallery-title">
          <div className="section-heading"><div><div className="section-kicker">04 <span>—</span> A CLOSER LOOK</div><h2 id="gallery-title">A sense of place.<br /><em>Made to be shared.</em></h2></div><p>Take a glimpse at the stay, dining and occasions that make every visit feel personal.</p></div>
          <div className="gallery-grid reveal-stagger">
            {galleryItems.map((item, index) => <button className={`gallery-item ${item.className ?? ''}`} type="button" key={item.title} onClick={() => setLightboxIndex(index)} aria-label={`View photo: ${item.title}`}><ImageCrop position={item.position} className="gallery-image" label={item.title} /><span className="gallery-caption"><small>{item.label}</small><strong>{item.title}</strong></span><span className="gallery-expand" aria-hidden="true"><ArrowUpRight size={17} /></span></button>)}
          </div>
        </section>

        <section className="benefits-section section-pad"><div className="benefit-header"><div className="section-kicker">05 <span>—</span> THE NYANZA DIFFERENCE</div><h2>A stay that brings<br /><em>more together.</em></h2></div><div className="benefit-grid reveal-stagger"><div className="benefit-item"><span>01</span><div><h3>More than a place to sleep</h3><p>Accommodation and experiences come together under one welcoming roof.</p></div></div><div className="benefit-item"><span>02</span><div><h3>Made for moments big & small</h3><p>From a restful getaway to a gathering worth remembering, find room for your reason to visit.</p></div></div><div className="benefit-item"><span>03</span><div><h3>Hospitality with a personal touch</h3><p>Thoughtful surroundings and attentive service set the tone for a more comfortable stay.</p></div></div><div className="benefit-item"><span>04</span><div><h3>One place, many possibilities</h3><p>Stay, dine, celebrate or take a moment to yourself — make the experience your own.</p></div></div></div></section>

        <section className="booking-process section-pad" id="how-to-book" aria-labelledby="booking-process-title">
          <div className="section-kicker">06 <span>—</span> A FEW EASY STEPS</div>
          <div className="booking-process-heading"><h2 id="booking-process-title">Make a plan.<br /><em>We’ll take it from there.</em></h2><p>Start with a simple enquiry. The property team can help you explore what is possible for your dates and occasion.</p></div>
          <div className="booking-steps reveal-stagger">{bookingSteps.map((step) => <article className="booking-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </section>

        <section className="booking-section section-pad" id="booking"><div className="booking-intro"><div className="section-kicker">07 <span>—</span> YOUR NEXT CHAPTER</div><h2>It starts with<br /><em>a simple hello.</em></h2><p>Tell us a little about your plans. Prepare an enquiry for a stay, a celebration or something entirely your own.</p><div className="booking-note"><span className="note-mark">N</span><p>Add your contact details to the enquiry and send it straight to the team on WhatsApp. We&apos;ll get back to you as soon as we can.</p></div></div><form className="booking-form" onSubmit={prepareRequest}><div className="form-topline"><span>BOOKING ENQUIRY</span><span>01 — 06</span></div><label>Your name<input name="name" placeholder="How should we address you?" required autoComplete="name" /></label><div className="form-row"><label>Visit type<select name="visit" defaultValue=""><option value="" disabled>Select an experience</option><option>Accommodation</option><option>Dining & catering</option><option>Wedding or reception</option><option>Proposal or private occasion</option><option>Meeting or conference</option><option>Wellness</option></select><ChevronDown className="select-chevron" size={15}/></label><label>Preferred date<input name="date" type="date" /></label></div><div className="form-row"><label>Number of guests<input name="guests" type="number" min="1" placeholder="To be confirmed" /></label><label>Your contact<input name="contact" placeholder="Email or phone number" required autoComplete="email" /></label></div><label>Tell us more<textarea name="notes" placeholder="Share any details that will help us understand your plans." rows={3}/></label><button className="button button-light form-submit" type="submit">Send on WhatsApp <ArrowRight size={16}/></button>{requestReady && <div className="form-result" role="status"><p className="form-feedback"><Check size={16}/> WhatsApp has opened with your details ready to send. Press send in the chat to reach the team.</p><a className="form-whatsapp-link" href={whatsappHref} target="_blank" rel="noopener noreferrer">Open WhatsApp chat <ArrowUpRight size={14}/></a><textarea aria-label="Prepared booking enquiry" readOnly value={enquiryDraft} rows={5}/></div>}<p className="form-disclaimer">Your enquiry opens in WhatsApp with the details pre-filled. Nothing is sent until you press send. Prefer another way? Copy the message above and share it however suits you.</p></form></section>

        <section className="faq-section section-pad"><div className="faq-intro"><div className="section-kicker">08 <span>—</span> A FEW GOOD THINGS TO KNOW</div><h2>Before you<br /><em>arrive.</em></h2><p>Have a question about your visit? Here are a few helpful details.</p></div><div className="faq-list reveal-stagger">{questions.map((item, index) => <div className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`} key={item.q}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{item.q}</span><span className="faq-toggle">{openFaq === index ? '−' : '+'}</span></button>{openFaq === index && <p>{item.a}</p>}</div>)}</div></section>

        <section className="final-cta"><ImageCrop position="50% 10%" className="final-cta-image"/><div className="final-cta-overlay"/><div className="final-cta-content"><div className="section-kicker">THE GOOD PART STARTS HERE</div><h2>Come as you are.<br /><em>Leave with more.</em></h2><a className="button button-light" href="#booking">Make an enquiry <ArrowRight size={16}/></a></div></section>
      </main>

      <WhatsAppFab ready={!loading} />

      {lightboxIndex !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${galleryItems[lightboxIndex].title} photograph`} onClick={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null) }}><button className="lightbox-close" type="button" aria-label="Close photograph" onClick={() => setLightboxIndex(null)}><X size={20} /></button><div className="lightbox-image-wrap"><ImageCrop position={galleryItems[lightboxIndex].position} className="lightbox-image" label={galleryItems[lightboxIndex].title} /><p>{galleryItems[lightboxIndex].title}</p></div></div>}

      <footer className="site-footer" id="contact"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-seal">N<span>LG</span></span><span className="brand-name">NYANZA LOYAL GATE<small>APARTMENT · CATERING</small></span></a><p>A welcoming place to stay, dine and celebrate.</p></div><div className="footer-col"><span>DISCOVER</span><a href="#stay">The stay</a><a href="#celebrations">Experiences</a><a href="#gallery">Gallery</a><a href="#approach">Our approach</a></div><div className="footer-col"><span>PLAN YOUR VISIT</span><a href="#booking">Booking enquiry</a><a href="#booking">Accommodation</a><a href="#booking">Events & catering</a><a href="#booking">Wellness</a></div><div className="footer-contact"><span>LET&apos;S BEGIN</span><p>Share your plans with us and we&apos;ll help shape the right experience.</p><a className="footer-cta" href="#booking">Start an enquiry <ArrowUpRight size={15}/></a><a className="footer-cta footer-cta--whatsapp" href={whatsappLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" aria-label={`Chat on WhatsApp: ${whatsappContact.display}`}>Chat on WhatsApp <ArrowUpRight size={15}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NYANZA LOYAL GATE APARTMENT</span><span>HOSPITALITY, WITH HEART.</span><a href="#home">BACK TO TOP ↑</a></div><div className="designer-credit"><span>DESIGNED &amp; DEVELOPED BY</span><a href="https://julesdev.vercel.app" target="_blank" rel="noreferrer">MAURICE</a><span className="designer-separator">/</span><a href="https://github.com/Mauricedev21" target="_blank" rel="noreferrer">GITHUB</a></div></footer>
    </>
  )
}
