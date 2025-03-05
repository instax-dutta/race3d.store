"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronRight, Check, ArrowRight, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [orderType, setOrderType] = useState("")
  const [customDescription, setCustomDescription] = useState("")
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formResult, setFormResult] = useState("")
  const [isLoadingShowcase, setIsLoadingShowcase] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)
  const formRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section for scroll animations
      const scrollPosition = window.scrollY + window.innerHeight / 2

      if (heroRef.current && scrollPosition < heroRef.current.offsetTop + heroRef.current.offsetHeight) {
        setActiveSection("hero")
      } else if (
        featuresRef.current &&
        scrollPosition < featuresRef.current.offsetTop + featuresRef.current.offsetHeight
      ) {
        setActiveSection("features")
      } else if (ctaRef.current) {
        setActiveSection("cta")
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const handleOrderTypeChange = (value) => {
    setOrderType(value)
    if (value !== "custom") {
      setCustomDescription("")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormSubmitting(true)
    setFormResult("Sending...")

    const formData = new FormData(event.target)
    formData.append("access_key", "ff7146a1-3e2f-464d-8fcd-4b3230d6eeb8")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormResult("Form Submitted Successfully")
        setFormOpen(false)
        setSuccessModalOpen(true)
        event.target.reset()
        setOrderType("")
        setCustomDescription("")
      } else {
        console.log("Error", data)
        setFormResult(data.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormResult("An error occurred. Please try again.")
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleShowcaseClick = () => {
    setIsLoadingShowcase(true)
    setTimeout(() => {
      window.open("https://showcase.race3d.store", "_blank")
      setIsLoadingShowcase(false)
    }, 300)
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#333333] overflow-x-hidden">
      {/* Header - Modernized with animation */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
          scrolled ? "py-3 bg-[#FAFAFA]/80" : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <motion.span
              className="text-[#333333] text-lg font-medium tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Race3D
              <motion.span
                className="block h-0.5 w-0 bg-[#A7BED3] group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </motion.span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-transparent hover:bg-[#A7BED3]/10 text-[#A7BED3] border border-[#A7BED3] px-3 sm:px-4 py-1.5 rounded-md transition-colors text-xs sm:text-sm"
                onClick={handleShowcaseClick}
                disabled={isLoadingShowcase}
              >
                <span className="flex items-center font-medium">
                  {isLoadingShowcase ? "Loading..." : "Visit Showcase"}
                  {!isLoadingShowcase && <ExternalLink className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-[#D8B4A0] hover:bg-[#C89F9C] text-white px-3 sm:px-4 py-1.5 rounded-md transition-colors text-xs sm:text-sm"
                onClick={() => setFormOpen(true)}
              >
                <span className="flex items-center font-medium">
                  Get Started
                  <ArrowRight className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow pt-20">
        {/* Hero Section - Modernized with animations */}
        <section ref={heroRef} className="relative py-16 md:py-24 min-h-[80vh] flex items-center">
          {/* Subtle background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#FAFAFA]"></div>

            {/* Modern geometric background elements */}
            <motion.div
              className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#A7BED3]/5"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute bottom-20 left-[10%] w-40 h-40 rounded-full bg-[#D8B4A0]/5"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />

            <motion.div
              className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-[#E8D5C4]/10"
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 2,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center space-y-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeIn}
                className="inline-block px-4 py-1.5 rounded-full bg-[#F8F5F2] text-[#8E7F7F] text-xs font-medium mb-2 border border-[#E8D5C4]/30"
              >
                Premium 3D-Printed Merchandise
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#333333] leading-tight tracking-tight"
              >
                <span className="block mb-2">Crafted in Precision,</span>
                <span className="text-[#D8B4A0] relative">
                  Designed for Luxury.
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#D8B4A0]/30"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-[#666666] text-lg max-w-lg mx-auto font-light">
                Experience the future of 3D-printed goods—where innovation meets timeless elegance.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Button
                    className="bg-[#D8B4A0] hover:bg-[#C89F9C] text-white w-full sm:w-auto px-8 py-6 rounded-md transition-all duration-300"
                    onClick={() => setFormOpen(true)}
                  >
                    <span className="flex items-center justify-center font-medium">
                      Get Started
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Button
                    className="bg-transparent hover:bg-[#A7BED3]/10 text-[#A7BED3] border border-[#A7BED3] w-full sm:w-auto px-8 py-6 rounded-md transition-all duration-300"
                    onClick={handleShowcaseClick}
                    disabled={isLoadingShowcase}
                  >
                    <span className="flex items-center justify-center font-medium">
                      {isLoadingShowcase ? "Loading..." : "Visit Showcase"}
                      {!isLoadingShowcase && <ExternalLink className="ml-1.5 h-4 w-4" />}
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <ChevronDown className="h-6 w-6 text-[#A7BED3]" />
          </motion.div>
        </section>

        {/* Features Section - Modernized with animations */}
        <section ref={featuresRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-medium text-[#333333] mb-4">Why Choose Race3D</h2>
              <div className="w-16 h-1 bg-[#D8B4A0] mx-auto mb-6"></div>
              <p className="text-[#666666] max-w-2xl mx-auto font-light">
                Our premium 3D printing services combine cutting-edge technology with exceptional craftsmanship.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-[#FAFAFA] p-8 rounded-lg border border-[#F0F0F0] hover:border-[#E8D5C4]/30 transition-all duration-300"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="w-12 h-12 bg-[#E8D5C4]/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#D8B4A0]"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#333333] mb-3">Premium Materials</h3>
                <p className="text-[#666666] font-light">
                  We use only the highest quality materials for durability and aesthetic appeal.
                </p>
              </motion.div>

              <motion.div
                className="bg-[#FAFAFA] p-8 rounded-lg border border-[#F0F0F0] hover:border-[#E8D5C4]/30 transition-all duration-300"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="w-12 h-12 bg-[#A7BED3]/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#A7BED3]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#333333] mb-3">Fast Turnaround</h3>
                <p className="text-[#666666] font-light">
                  Quick production and delivery without compromising on quality.
                </p>
              </motion.div>

              <motion.div
                className="bg-[#FAFAFA] p-8 rounded-lg border border-[#F0F0F0] hover:border-[#E8D5C4]/30 transition-all duration-300"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="w-12 h-12 bg-[#E8D5C4]/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#D8B4A0]"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#333333] mb-3">Custom Designs</h3>
                <p className="text-[#666666] font-light">
                  Bring your ideas to life with our bespoke design and printing services.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Modernized with animations */}
        <section ref={ctaRef} className="py-20 bg-[#FAFAFA] relative overflow-hidden">
          {/* Modern geometric background elements */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E8D5C4]/5 -mr-48 -mt-48"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#A7BED3]/5 -ml-40 -mb-40"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-medium text-[#333333] mb-6">Ready to Start Your Project?</h2>
              <p className="text-[#666666] mb-10 font-light">
                Contact us today to discuss your custom 3D printing needs.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="bg-[#D8B4A0] hover:bg-[#C89F9C] text-white px-8 py-6 rounded-md transition-all duration-300"
                  onClick={() => setFormOpen(true)}
                >
                  <span className="flex items-center font-medium">
                    Get in Touch
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Form Dialog - Modernized */}
      <AnimatePresence>
        {formOpen && (
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogContent className="sm:max-w-[450px] bg-white text-[#333333] border-[#F0F0F0] rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-medium text-[#333333] flex items-center">
                  <div className="mr-3 h-6 w-1 bg-[#D8B4A0]"></div>
                  Get Started with Race3D
                </DialogTitle>
                <DialogDescription className="text-[#666666] text-sm font-light">
                  Fill out the form below to begin your custom 3D printing journey.
                </DialogDescription>
              </DialogHeader>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 py-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[#333333] text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="bg-[#FAFAFA] border-[#F0F0F0] text-[#333333] focus:border-[#D8B4A0] focus:ring-[#D8B4A0] rounded-md h-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-[#333333] text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    className="bg-[#FAFAFA] border-[#F0F0F0] text-[#333333] focus:border-[#D8B4A0] focus:ring-[#D8B4A0] rounded-md h-10"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-[#333333] text-sm font-medium">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    className="bg-[#FAFAFA] border-[#F0F0F0] text-[#333333] focus:border-[#D8B4A0] focus:ring-[#D8B4A0] min-h-[60px] rounded-md"
                    placeholder="Enter your full address"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[#333333] text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="bg-[#FAFAFA] border-[#F0F0F0] text-[#333333] focus:border-[#D8B4A0] focus:ring-[#D8B4A0] rounded-md h-10"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="orderType" className="text-[#333333] text-sm font-medium">
                    What would you like?
                  </Label>
                  <Select name="orderType" onValueChange={handleOrderTypeChange} value={orderType} required>
                    <SelectTrigger className="bg-[#FAFAFA] border-[#F0F0F0] text-[#333333] focus:border-[#D8B4A0] focus:ring-[#D8B4A0] rounded-md h-10">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#F0F0F0] text-[#333333]">
                      <SelectItem value="custom">Want to order something custom</SelectItem>
                      <SelectItem value="brochure">Want to browse brochure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional text area for custom description */}
                <AnimatePresence>
                  {orderType === "custom" && (
                    <motion.div
                      className="space-y-1.5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="customDescription" className="text-[#333333] text-sm font-medium">
                        Custom Print Description
                      </Label>
                      <Textarea
                        id="customDescription"
                        name="customDescription"
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        className="bg-[#FAFAFA] border-[#F0F0F0] text-[#333333] focus:border-[#D8B4A0] focus:ring-[#D8B4A0] min-h-[80px] rounded-md"
                        placeholder="Describe your custom print idea in detail..."
                        required={orderType === "custom"}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <input type="hidden" name="form_type" value={orderType} />

                <DialogFooter>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      type="submit"
                      className="bg-[#D8B4A0] hover:bg-[#C89F9C] text-white w-full rounded-md py-2.5"
                      disabled={formSubmitting}
                    >
                      <span className="font-medium">{formSubmitting ? "Submitting..." : "Submit"}</span>
                    </Button>
                  </motion.div>
                </DialogFooter>

                {formResult && formResult !== "Sending..." && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-sm ${formResult.includes("Error") ? "text-[#C89F9C]" : "text-[#A7BED3]"}`}
                  >
                    {formResult}
                  </motion.p>
                )}
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Success Modal - Modernized */}
      <AnimatePresence>
        {successModalOpen && (
          <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
            <DialogContent className="sm:max-w-[450px] bg-white text-[#333333] border-[#F0F0F0] rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-medium text-[#333333] flex items-center">
                  <motion.div
                    className="bg-[#A7BED3]/20 p-1.5 rounded-full mr-3 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="h-5 w-5 text-[#A7BED3]" />
                  </motion.div>
                  Thank You!
                </DialogTitle>
                <DialogDescription className="text-[#666666] text-sm font-light">
                  {orderType === "custom" ? (
                    <>
                      <p className="mb-2">Your custom order request has been submitted successfully!</p>
                      <p>Our design team will review your request and contact you within 24-48 hours.</p>
                    </>
                  ) : (
                    <>
                      <p className="mb-2">Thank you for your interest in our brochure!</p>
                      <p>We'll send our latest catalog to your email shortly.</p>
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <Button
                    className="bg-[#D8B4A0] hover:bg-[#C89F9C] text-white w-full rounded-md py-2.5"
                    onClick={() => setSuccessModalOpen(false)}
                  >
                    <span className="font-medium">Close</span>
                  </Button>
                </motion.div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Footer - Modernized */}
      <footer className="bg-white py-10 border-t border-[#F0F0F0]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#666666] text-xs font-light">
                © {new Date().getFullYear()} Race3D. All rights reserved.
              </span>
            </motion.div>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="#" className="text-[#8E7F7F] hover:text-[#D8B4A0] transition-colors text-xs">
                Privacy
              </Link>
              <Link href="#" className="text-[#8E7F7F] hover:text-[#D8B4A0] transition-colors text-xs">
                Terms
              </Link>
              <Link href="#" className="text-[#8E7F7F] hover:text-[#D8B4A0] transition-colors text-xs">
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}

