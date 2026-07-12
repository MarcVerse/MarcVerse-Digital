import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  Copy, 
  Check,
  ChevronDown,
  Sparkles,
  Calendar,
  ShieldCheck,
  HeartHandshake,
  X,
  Phone
} from 'lucide-react';
import Section from './Section';

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  
  // Validation and UI states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  // WhatsApp Modal States
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppName, setWhatsAppName] = useState('');
  const [whatsAppService, setWhatsAppService] = useState('');
  const [whatsAppError, setWhatsAppError] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Field validation
  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.service) tempErrors.service = 'Please select a service';
    if (!formData.message.trim()) tempErrors.message = 'Message content is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Copy contact info helpers
  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate premium backend delay (1.2 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  // Reset form to send another message
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      service: '',
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  // WhatsApp redirect handler
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsAppName.trim()) {
      setWhatsAppError('Please enter your name');
      return;
    }
    if (!whatsAppService) {
      setWhatsAppError('Please select a service');
      return;
    }
    setWhatsAppError('');
    
    const formattedMessage = `Hello MarcVerse,

My name is ${whatsAppName.trim()}.

I'm interested in your *${whatsAppService}* and would like to make an enquiry.

Here are a few details about my project:

[The customer can continue typing here.]

I look forward to your response.

Thank you.`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/2348136056864?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Close modal and reset fields
    setIsWhatsAppModalOpen(false);
    setWhatsAppName('');
    setWhatsAppService('');
  };

  // Prevent body scroll and close on ESC
  React.useEffect(() => {
    if (isWhatsAppModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsWhatsAppModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWhatsAppModalOpen]);

  // Listen to external custom events to open the WhatsApp modal
  React.useEffect(() => {
    const handleOpenModal = () => {
      setIsWhatsAppModalOpen(true);
    };
    window.addEventListener('open-whatsapp-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-whatsapp-modal', handleOpenModal);
    };
  }, []);

  return (
    <Section
      id="contact"
      className="bg-slate-50 dark:bg-zinc-950"
      backgrounds={
        <>
          {/* Ambient lighting glows for premium feeling */}
          <div className="absolute top-1/4 left-10 w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-[35%] h-[35%] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
        </>
      }
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 flex flex-col items-center gap-4">
        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/15"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact Us</span>
        </div>
        
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
        >
          Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 font-bold">Great Together</span>
        </h2>
        
        <p
          className="font-sans text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl"
        >
          Whether you need a professional website, branding, graphic design or digital support, we're ready to help bring your ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Contact Cards Stack */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="relative rounded-3xl p-8 md:p-10 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/20 dark:shadow-none overflow-hidden"
          >
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />
            
            <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-950 dark:text-white mb-2">
              Contact Information
            </h3>
            <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
              Reach out to us directly. We're here to answer any questions and assist with your project needs.
            </p>

            {/* Contact Details List */}
            <div className="space-y-6">
              {/* Email Info */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-sans text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Email Address
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <a 
                      href="mailto:imacdigitas@outlook.com" 
                      className="font-sans text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-150 truncate focus:outline-none focus:underline"
                    >
                      imacdigitas@outlook.com
                    </a>
                    <button
                      onClick={() => handleCopy('imacdigitas@outlook.com', 'email')}
                      className="p-1 rounded-md text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer flex items-center justify-center focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      title="Copy Email"
                      aria-label="Copy Email address"
                    >
                      {copiedField === 'email' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Call Us Info */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-sans text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Call Us
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <a 
                      href="tel:08136056864"
                      className="font-sans text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-150 cursor-pointer flex items-center gap-1 focus:outline-none focus:underline"
                    >
                      08136056864
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleCopy('08136056864', 'phone')}
                      className="p-1 rounded-md text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer flex items-center justify-center focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      title="Copy Phone Number"
                      aria-label="Copy Phone Number"
                    >
                      {copiedField === 'phone' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                </div>
              </div>

              {/* Location Info */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-sans text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Our Location
                  </p>
                  <p className="font-sans text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 mt-1 leading-normal">
                    Ikorodu, Lagos, Nigeria
                  </p>
                </div>
              </div>

              {/* Hours Info */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-sans text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Business Hours
                  </p>
                  <div className="font-sans text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 mt-1 space-y-0.5 leading-normal">
                    <p>Monday to Friday</p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-medium">9:00 AM to 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Trust Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="rounded-3xl p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/20 dark:shadow-none relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-teal-500/5 blur-xl pointer-events-none" />
            
            <h4 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span>Why Contact Us?</span>
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Free Consultation
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Clear Timelines
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Transparent Pricing
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mt-0.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Ongoing Support
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-7 w-full"
        >
          <div className="rounded-3xl p-8 md:p-10 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/20 dark:shadow-none relative h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label 
                        htmlFor="name" 
                        className="block font-sans text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        Full Name <span className="text-emerald-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        required
                        className={`w-full px-4 py-3.5 rounded-xl border bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 outline-none ${
                          errors.name 
                            ? 'border-red-500/80 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                            : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 dark:focus:ring-emerald-400/10'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="font-sans text-xs font-semibold text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label 
                        htmlFor="email" 
                        className="block font-sans text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        Email Address <span className="text-emerald-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        disabled={isSubmitting}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        required
                        className={`w-full px-4 py-3.5 rounded-xl border bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 outline-none ${
                          errors.email 
                            ? 'border-red-500/80 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                            : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 dark:focus:ring-emerald-400/10'
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" className="font-sans text-xs font-semibold text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Required */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="service" 
                      className="block font-sans text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Service Required <span className="text-emerald-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? "service-error" : undefined}
                        required
                        className={`w-full px-4 py-3.5 rounded-xl border bg-white dark:bg-zinc-900/50 appearance-none transition-all duration-200 outline-none cursor-pointer ${
                          formData.service === '' ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'
                        } ${
                          errors.service 
                            ? 'border-red-500/80 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                            : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 dark:focus:ring-emerald-400/10'
                        }`}
                      >
                        <option value="" disabled className="text-zinc-400 dark:text-zinc-600">Select a service</option>
                        <option value="Website Design">Website Design</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Branding">Branding</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Virtual Assistant">Virtual Assistant</option>
                        <option value="Research & Academic Support">Research & Academic Support</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                    {errors.service && (
                      <p id="service-error" className="font-sans text-xs font-semibold text-red-500 mt-1">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="message" 
                      className="block font-sans text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Message <span className="text-emerald-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, or questions..."
                      disabled={isSubmitting}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      required
                      className={`w-full px-4 py-3.5 rounded-xl border bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 outline-none resize-none ${
                        errors.message 
                          ? 'border-red-500/80 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                          : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 dark:focus:ring-emerald-400/10'
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="font-sans text-xs font-semibold text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button & Reassurance */}
                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-sans text-sm font-semibold tracking-wide text-white bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-[0_6px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 outline-none"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {/* Reassurance Message */}
                    <p className="flex items-center justify-center gap-1.5 font-sans text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
                      <span>We usually respond within 24 hours.</span>
                    </p>
                  </div>
                </motion.form>
              ) : (
                /* Success State UI */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                  className="text-center py-8 px-4 flex flex-col items-center justify-center min-h-[420px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 150, damping: 10 }}
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 mb-6"
                  >
                    <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold text-zinc-950 dark:text-white mb-3">
                    Message Sent Successfully!
                  </h3>
                  
                  <p className="font-sans text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed text-sm sm:text-base">
                    Thank you, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formData.name}</span>. 
                    We've received your request regarding <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formData.service}</span>. 
                    Our team will review your message and contact you within 24 hours.
                  </p>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-sans text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-zinc-300 outline-none"
                  >
                    Send Another Message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* WhatsApp Modern Modal */}
      <AnimatePresence>
        {isWhatsAppModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWhatsAppModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Modal dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="whatsapp-modal-title"
            >
              {/* Top ambient color stripe to indicate WhatsApp action */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

              {/* Close button */}
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              {/* WhatsApp Icon Circle */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.709 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 id="whatsapp-modal-title" className="font-display text-lg font-bold text-zinc-950 dark:text-white">
                    Chat on WhatsApp
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
                    Connect directly with the MarcVerse team
                  </p>
                </div>
              </div>

              <h4 className="font-display text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                What service are you interested in?
              </h4>
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Tell us your name and select a service to instantly generate your enquiry message.
              </p>

              {/* Form inside modal */}
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                {/* Visitor Name Field */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="whatsapp-name" 
                    className="block font-sans text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Your Name <span className="text-emerald-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="whatsapp-name"
                    value={whatsAppName}
                    onChange={(e) => {
                      setWhatsAppName(e.target.value);
                      if (whatsAppError) setWhatsAppError('');
                    }}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 dark:focus:ring-emerald-400/10 outline-none transition-all duration-200"
                  />
                </div>

                {/* Service Selection Dropdown */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="whatsapp-service" 
                    className="block font-sans text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Service Required <span className="text-emerald-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="whatsapp-service"
                      value={whatsAppService}
                      onChange={(e) => {
                        setWhatsAppService(e.target.value);
                        if (whatsAppError) setWhatsAppError('');
                      }}
                      required
                      className={`w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 appearance-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 dark:focus:ring-emerald-400/10 outline-none transition-all duration-200 cursor-pointer ${
                        whatsAppService === '' ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'
                      }`}
                    >
                      <option value="" disabled className="text-zinc-400 dark:text-zinc-600">Select a service</option>
                      <option value="Website Design">Website Design</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Branding">Branding</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Virtual Assistant Services">Virtual Assistant Services</option>
                      <option value="Research & Academic Support">Research & Academic Support</option>
                      <option value="Business Documentation">Business Documentation</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {whatsAppError && (
                  <p className="font-sans text-xs font-semibold text-red-500">
                    {whatsAppError}
                  </p>
                )}

                {/* Submit Action Button */}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans text-sm font-semibold text-white bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 outline-none"
                  >
                    <span>Continue to WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsWhatsAppModalOpen(false)}
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-sans text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all duration-200 cursor-pointer focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
