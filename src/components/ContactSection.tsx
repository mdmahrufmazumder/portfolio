import { useState, type FormEvent } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  SlidersHorizontal
} from 'lucide-react';
import type { PersonalInfo, SocialLinks } from '../types/portfolio';

interface ContactSectionProps {
  personal: PersonalInfo;
  social: SocialLinks;
  onOpenEditor: (tab?: string) => void;
}

export function ContactSection({ personal, social, onOpenEditor }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard restricted
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name.trim() || !senderEmail.trim() || !message.trim()) {
      setFeedback({
        type: 'error',
        text: 'Please complete your name, email address, and message before submitting.'
      });
      return;
    }

    const endpoint = personal.contactFormEndpoint.trim();

    if (endpoint) {
      setSubmitting(true);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: name.trim(),
            email: senderEmail.trim(),
            subject: subject.trim() || 'Academic Portfolio Inquiry',
            message: message.trim()
          })
        });
        if (!res.ok) {
          throw new Error('Endpoint returned an error');
        }
        setFeedback({
          type: 'success',
          text: 'Your message has been delivered successfully.'
        });
        setName('');
        setSenderEmail('');
        setSubject('');
        setMessage('');
      } catch {
        setFeedback({
          type: 'error',
          text: 'Could not reach the configured form endpoint. You can send directly via the Email button.'
        });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Static-hosting safe workflow: open user's mail client with structured message + copy fallback
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${name.trim()}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${name.trim()}\nReply-To: ${senderEmail.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${personal.email}?subject=${mailSubject}&body=${mailBody}`;

    setFeedback({
      type: 'success',
      text: `Email draft prepared for ${personal.email}. To enable direct browser submission on static hosts, add a Formspree/Web3Forms endpoint in Edit Portfolio.`
    });
  };

  const profileLinks = [
    { label: 'ORCID', value: personal.orcidId, url: social.orcid, icon: BookOpen },
    { label: 'LinkedIn', value: social.linkedin ? 'Connected' : 'Not linked yet', url: social.linkedin, icon: Linkedin },
    { label: 'GitHub', value: social.github ? 'Connected' : 'Not linked yet', url: social.github, icon: Github },
    { label: 'Google Scholar', value: social.googleScholar ? 'Connected' : 'Not linked yet', url: social.googleScholar, icon: BookOpen }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
            <Mail className="h-4 w-4" />
            <span>Academic Correspondence</span>
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Contact &amp; Profiles
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Open to research mentorship, academic collaborations, student leadership exchange, and scholarship or graduate inquiry correspondence.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Direct Contact Details & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="mt-0.5 block truncate text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    {personal.email}
                  </a>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${personal.email}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-cyan-400 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Send Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-slate-200/80 dark:border-slate-800/80 pt-5">
                <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</p>
                  <a
                    href={`tel:${personal.phone}`}
                    className="mt-0.5 block font-mono text-sm sm:text-base tabular-nums font-medium text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-slate-200/80 dark:border-slate-800/80 pt-5">
                <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</p>
                  <p className="mt-0.5 text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">
                    {personal.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic & Social Profiles */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Academic &amp; Social Profiles
                </h3>
                <button
                  type="button"
                  onClick={() => onOpenEditor('social')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Edit Links</span>
                </button>
              </div>

              <div className="mt-4 divide-y divide-slate-200/80 dark:divide-slate-800/80">
                {profileLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                        <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span>{item.label}</span>
                      </div>

                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-cyan-700 dark:text-cyan-400 hover:underline"
                        >
                          {item.label === 'ORCID' ? item.value : 'Open Profile'}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenEditor('social')}
                          className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer"
                        >
                          Configure URL
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Functional Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6 sm:p-8 space-y-5"
            >
              <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Send a Message
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {personal.contactFormEndpoint
                    ? 'Direct HTTPS form submission is active.'
                    : 'Opens a formatted email draft to mdmahrufmazumder@gmail.com (or configure a Formspree endpoint in Edit Portfolio).'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Prof. / Dr. / Colleague Name"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@institution.edu"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Research collaboration, academic inquiry, or event invitation"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {feedback && (
                <div
                  role="status"
                  className={`rounded-lg border px-4 py-3 text-xs sm:text-sm ${
                    feedback.type === 'success'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 disabled:opacity-60 transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
