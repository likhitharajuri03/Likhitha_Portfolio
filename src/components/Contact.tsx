"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";
import confetti from "canvas-confetti";

export default function Contact() {
  const { setCursorType } = useApp();
  
  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Optional: Place a free Web3Forms access key here to forward messages directly to your email.
  // Otherwise, the form will seamlessly open a pre-filled WhatsApp chat with the sender's message.
  const WEB3FORMS_KEY = ""; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    if (WEB3FORMS_KEY) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Message from ${formData.name}`,
          }),
        });
        
        const result = await response.json();
        if (result.success) {
          setStatus("success");
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#6366f1", "#10b981", "#a855f7"]
          });
          setFormData({ name: "", email: "", message: "" });
        } else {
          throw new Error(result.message || "Failed to submit");
        }
      } catch (err) {
        console.warn("Email API failed, falling back to WhatsApp redirect:", err);
        triggerWhatsAppFallback();
      }
    } else {
      triggerWhatsAppFallback();
    }
  };

  const triggerWhatsAppFallback = () => {
    const whatsappText = `Hello Rajuri,\n\nMy name is *${formData.name}* (${formData.email}).\n\n*Message:*\n${formData.message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918247042357&text=${encodeURIComponent(whatsappText)}`;
    
    window.open(whatsappUrl, "_blank");

    setStatus("success");
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#6366f1", "#10b981", "#a855f7"]
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-zinc-950 text-white dark:bg-zinc-950 light:bg-zinc-50 light:text-zinc-900 overflow-hidden border-b border-zinc-900/60 light:border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">Get In Touch</h2>
          <div className="h-[2px] w-20 bg-indigo-500 rounded-full" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold font-display text-indigo-400 mb-2">Let's build something intelligent.</h3>
            <p className="text-xs text-zinc-400 light:text-zinc-600 font-sans leading-relaxed max-w-sm mb-6">
              I am open to software engineering internships, research collaborations, and open-source project opportunities. Reach out and I will reply within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "Shoot an email",
                  value: "likhitha.rajuri.03@gmail.com",
                  href: "mailto:likhitha.rajuri.03@gmail.com",
                  icon: <Mail className="w-4 h-4 text-indigo-400" />
                },
                {
                  label: "Connect on LinkedIn",
                  value: "linkedin.com/in/rajuri-likhitha",
                  href: "https://linkedin.com/in/rajuri-likhitha",
                  icon: <Linkedin className="w-4 h-4 text-blue-400" />
                },
                {
                  label: "Explore GitHub code",
                  value: "github.com/likhitharajuri03",
                  href: "https://github.com/likhitharajuri03",
                  icon: <Github className="w-4 h-4 text-zinc-300 light:text-zinc-700" />
                },
                {
                  label: "Direct Phone / WhatsApp",
                  value: "+91 8247042357",
                  href: "tel:+918247042357",
                  icon: <Phone className="w-4 h-4 text-emerald-400" />
                },
                {
                  label: "Current Base Location",
                  value: "Bengaluru, Karnataka, India",
                  icon: <MapPin className="w-4 h-4 text-rose-400" />
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => card.href && setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="glass rounded-xl p-4 border border-zinc-800/80 light:border-zinc-200 flex items-center gap-4 hover:border-zinc-700/80 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 light:bg-zinc-100 light:border-zinc-200">
                    {card.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-display font-semibold">
                      {card.label}
                    </span>
                    {card.href ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold font-display text-white light:text-zinc-950 cursor-none hover:underline flex items-center gap-1 mt-0.5"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <span className="text-xs font-bold font-display text-white light:text-zinc-950 mt-0.5">
                        {card.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass rounded-xl p-8 border border-zinc-800/80 light:border-zinc-200 relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold font-display text-white light:text-zinc-950">Message Transmitted!</h4>
                      <p className="text-xs text-zinc-400 light:text-zinc-500 font-sans max-w-xs">
                        Thank you for reaching out, Likhitha. Your message has been sent successfully. I will get back to you shortly!
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="rounded-full bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 px-5 py-2 text-xs font-display font-semibold tracking-wider text-zinc-300 cursor-none transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-display tracking-widest text-zinc-400 light:text-zinc-500 font-semibold">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-xs outline-none focus:border-indigo-500 dark:bg-zinc-950 dark:border-zinc-850 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-800 light:focus:border-indigo-600 transition-colors"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <span className="text-[10px] text-rose-400 font-sans flex items-center gap-1.5 mt-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-display tracking-widest text-zinc-400 light:text-zinc-500 font-semibold">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-xs outline-none focus:border-indigo-500 dark:bg-zinc-950 dark:border-zinc-850 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-800 light:focus:border-indigo-600 transition-colors"
                          placeholder="johndoe@example.com"
                        />
                        {errors.email && (
                          <span className="text-[10px] text-rose-400 font-sans flex items-center gap-1.5 mt-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-display tracking-widest text-zinc-400 light:text-zinc-500 font-semibold">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-xs outline-none focus:border-indigo-500 dark:bg-zinc-950 dark:border-zinc-850 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-800 light:focus:border-indigo-600 transition-colors resize-none"
                        placeholder="Describe your project requirements or details..."
                      />
                      {errors.message && (
                        <span className="text-[10px] text-rose-400 font-sans flex items-center gap-1.5 mt-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="flex items-center justify-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold font-display text-xs tracking-wider uppercase px-6 py-3 cursor-none disabled:opacity-50 transition-all duration-300 w-full sm:w-auto"
                    >
                      {status === "submitting" ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
