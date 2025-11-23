"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Users, Briefcase, Shield, Star, CheckCircle, Phone, MapPin, Clock, Sparkles, Zap, Award, Heart, Play, ChevronDown, Menu, X, Search, Filter } from "lucide-react"
import LoginScreen from "../auth/login-screen"

interface LandingPageProps {
  onLogin: (state: any) => void
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: Users,
      title: "Verified Professionals",
      description: "Every worker undergoes rigorous background checks and skill verification for complete peace of mind",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-50/80 via-cyan-50/60 to-teal-50/80",
      stats: "15K+ Verified"
    },
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description: "AI-powered algorithm connects you with the perfect worker based on skills, location, and availability",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      bgGradient: "from-purple-50/80 via-pink-50/60 to-rose-50/80",
      stats: "98% Match Rate"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Bank-grade security with escrow payments, dispute resolution, and comprehensive insurance coverage",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      bgGradient: "from-green-50/80 via-emerald-50/60 to-teal-50/80",
      stats: "100% Secure"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get responses within minutes and complete projects efficiently with our streamlined workflow",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      bgGradient: "from-orange-50/80 via-red-50/60 to-pink-50/80",
      stats: "< 5min Response"
    }
  ]

  const stats = [
    { number: "15K+", label: "Verified Workers", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "8K+", label: "Jobs Completed", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    { number: "4.9", label: "Average Rating", icon: Star, color: "from-yellow-400 to-orange-500" },
    { number: "99%", label: "Success Rate", icon: Award, color: "from-purple-500 to-pink-500" }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Master Electrician",
      content: "ShramSaathi transformed my career completely. I now get premium jobs with fair pay. The platform's verification gives clients confidence in my work.",
      rating: 5,
      avatar: "RK",
      location: "Mumbai, Maharashtra",
      project: "Commercial Wiring"
    },
    {
      name: "Priya Sharma",
      role: "Home Owner",
      content: "Found an amazing carpenter who fixed our entire kitchen renovation. The quality was outstanding and the process was incredibly seamless.",
      rating: 5,
      avatar: "PS",
      location: "Delhi, NCR",
      project: "Kitchen Renovation"
    },
    {
      name: "Amit Patel",
      role: "Plumbing Expert",
      content: "Best platform for skilled workers. Direct client communication, fair rates, and steady work throughout the year. Highly recommended!",
      rating: 5,
      avatar: "AP",
      location: "Ahmedabad, Gujarat",
      project: "Emergency Repairs"
    }
  ]

  const steps = [
    {
      step: "01",
      title: "Create Account",
      description: "Sign up as a worker or employer in under 2 minutes with our streamlined onboarding process",
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02",
      title: "Get Matched",
      description: "Our advanced AI finds the perfect match for your requirements based on skills and availability",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "03",
      title: "Work & Earn",
      description: "Complete projects with confidence and get paid securely through our escrow system",
      icon: Heart,
      color: "from-green-500 to-emerald-500"
    }
  ]

  const categories = [
    { name: "Construction", count: "2.5K+", icon: "🏗️" },
    { name: "Electrical", count: "1.8K+", icon: "⚡" },
    { name: "Plumbing", count: "1.2K+", icon: "🔧" },
    { name: "Carpentry", count: "950+", icon: "🪚" },
    { name: "Painting", count: "780+", icon: "🎨" },
    { name: "Cleaning", count: "650+", icon: "🧹" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/30 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/25 via-blue-400/20 to-indigo-400/25 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '3s' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-400/20 via-teal-400/25 to-green-400/20 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-gradient-to-br from-orange-400/15 via-red-400/20 to-pink-400/15 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '9s' }}></div>
      </div>

      {/* Modern Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-gray-200/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
                  श्र
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">ShramSaathi</h1>
                <p className="text-xs text-gray-600 font-medium">India's Premier Blue-Collar Job Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  How it works
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </button>
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  For Workers
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </button>
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  For Employers
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </button>
              </div>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8 relative" ref={heroRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/30 rounded-full px-4 py-2 mb-8 shadow-lg shadow-blue-500/10">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                  <span className="text-sm font-semibold text-blue-700">Trusted by 15,000+ professionals</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent block">
                    Connect with
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block mt-2">
                    Skilled Workers
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  India's most trusted platform connecting verified blue-collar professionals with quality job opportunities.
                  From construction to electrical work, find reliable help instantly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-blue-500/40 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative flex items-center gap-3">
                      Start Hiring Today
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </button>
                  <button className="group relative text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Watch Demo</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Verified Workers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">Instant Matching</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="relative">
                {/* Main Dashboard Mockup */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/20 border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Available Workers</h3>
                          <p className="text-blue-100 text-sm font-medium">in your area</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">247</div>
                        <div className="text-blue-100 text-sm font-medium">online now</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Worker Cards */}
                      {[
                        { name: "Rajesh Kumar", skill: "Master Electrician", rating: 4.9, distance: "2.3 km", price: "₹500/hr", verified: true, response: "< 5min" },
                        { name: "Amit Singh", skill: "Expert Plumber", rating: 4.8, distance: "1.8 km", price: "₹450/hr", verified: true, response: "< 3min" },
                        { name: "Vikram Patel", skill: "Professional Carpenter", rating: 5.0, distance: "3.1 km", price: "₹550/hr", verified: true, response: "< 10min" }
                      ].map((worker, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 group">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                  {worker.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {worker.verified && (
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">{worker.name}</h4>
                                <p className="text-blue-600 font-semibold text-sm">{worker.skill}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span className="text-xs font-semibold text-gray-700">{worker.rating}</span>
                                  </div>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-green-600 font-medium">{worker.response}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600 text-lg">{worker.price}</div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="w-3 h-3" />
                                {worker.distance}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Success Elements */}
                <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-2xl flex items-center justify-center animate-float transform hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-xl flex items-center justify-center animate-float" style={{ animationDelay: '4s' }}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the growing community of verified professionals and satisfied employers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/25 group-hover:shadow-3xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">{stat.number}</div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/30 rounded-full px-4 py-2 mb-6 shadow-lg shadow-blue-500/10">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Why Choose Us</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
              Why Choose ShramSaathi?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              We combine cutting-edge technology with unwavering trust to create India's most reliable blue-collar job marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-gray-200/50 hover:shadow-3xl hover:shadow-blue-500/20 transition-all duration-700 hover:-translate-y-4 border border-white/50 overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${index * 150 + 300}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-lg group-hover:scale-125 transition-transform duration-500" style={{ animationDelay: '0.5s' }}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25 group-hover:shadow-3xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-gray-400 group-hover:text-blue-600 transition-colors duration-300">{feature.stats}</div>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-medium">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="mt-8 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-semibold">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/30 rounded-full px-4 py-2 mb-6 shadow-lg shadow-blue-500/10">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-sm font-semibold text-blue-700">Simple Process</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Get started in just 3 simple steps and transform your work experience with our streamlined platform
            </p>
          </div>

          <div className="relative">
            {/* Animated Connection Line */}
            <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-5xl">
              <div className="relative h-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
              {steps.map((step, index) => (
                <div key={index} className={`text-center relative ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: `${index * 200 + 500}ms`, transitionDuration: '800ms' }}>
                  <div className="relative mb-10">
                    {/* Main Icon */}
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-110 hover:rotate-3 group`}>
                      <step.icon className="w-12 h-12 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-2xl animate-bounceIn" style={{ animationDelay: `${index * 200 + 700}ms` }}>
                      {step.step}
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium max-w-sm mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find skilled professionals across all major blue-collar trades
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 text-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${index * 100 + 200}ms` }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                <p className="text-blue-600 font-semibold text-sm">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/30 rounded-full px-4 py-2 mb-6 shadow-lg shadow-blue-500/10">
              <Heart className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Success Stories</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Real stories from workers and employers who found success on ShramSaathi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-gray-200/50 hover:shadow-3xl hover:shadow-blue-500/20 transition-all duration-700 hover:-translate-y-4 border border-white/50 overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${index * 150 + 700}ms` }}
              >
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-200" style={{ transitionDelay: `${i * 50}ms` }} />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-10 italic text-xl leading-relaxed font-medium relative">
                    <span className="text-6xl text-blue-200 absolute -top-4 -left-2 font-serif leading-none">"</span>
                    {testimonial.content}
                    <span className="text-6xl text-blue-200 absolute -bottom-8 -right-2 font-serif leading-none">"</span>
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                        {testimonial.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">{testimonial.name}</div>
                      <div className="text-blue-600 font-semibold text-sm mb-1">{testimonial.role}</div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>

                  {/* Project Badge */}
                  <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 py-2 border border-blue-200/30">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">{testimonial.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-gradientShift"></div>

          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-6 lg:px-8 relative z-10">
          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8 shadow-2xl">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white font-semibold">Join the Revolution</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Your Work?
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Join 15,000+ professionals already building successful careers on ShramSaathi.
              Your next opportunity is just one click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button
                onClick={() => setShowLogin(true)}
                className="group relative bg-white text-blue-600 px-12 py-6 rounded-3xl font-black text-xl hover:bg-gray-50 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center gap-4">
                  Join ShramSaathi Today
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>

              <div className="text-center">
                <div className="text-blue-100 text-lg font-semibold mb-2">No commitments • No hidden fees</div>
                <div className="flex items-center justify-center gap-6 text-sm text-blue-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Free to join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span>Secure payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 text-blue-200">
              <div className="text-center">
                <div className="text-3xl font-black text-white">15K+</div>
                <div className="text-sm font-medium">Active Workers</div>
              </div>
              <div className="w-px h-12 bg-blue-300/30"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">8K+</div>
                <div className="text-sm font-medium">Jobs Completed</div>
              </div>
              <div className="w-px h-12 bg-blue-300/30"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">4.9</div>
                <div className="text-sm font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center font-black text-2xl text-white shadow-2xl shadow-blue-500/30">
                    श्र
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-gray-900 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">ShramSaathi</h3>
                  <p className="text-gray-400 font-medium">India's Premier Blue-Collar Job Platform</p>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-lg mb-8 max-w-md">
                Connecting skilled workers with quality job opportunities across India. Building trust, one job at a time.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <button key={social} className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                    <div className="w-5 h-5 bg-current rounded-sm"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Workers Links */}
            <div>
              <h4 className="font-bold text-white mb-8 text-lg">For Workers</h4>
              <ul className="space-y-4">
                {[
                  'Find Jobs',
                  'Build Profile',
                  'Get Verified',
                  'Skill Development',
                  'Success Stories'
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 font-medium relative group">
                      {item}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Employers Links */}
            <div>
              <h4 className="font-bold text-white mb-8 text-lg">For Employers</h4>
              <ul className="space-y-4">
                {[
                  'Post Jobs',
                  'Find Workers',
                  'Manage Projects',
                  'Bulk Hiring',
                  'Pricing'
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 font-medium relative group">
                      {item}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              'Help Center',
              'Contact Us',
              'Privacy Policy',
              'Terms of Service'
            ].map((item) => (
              <a key={item} href="#" className="text-gray-500 hover:text-gray-300 transition-colors duration-200 font-medium text-center md:text-left">
                {item}
              </a>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 font-medium">
                &copy; 2024 ShramSaathi. All rights reserved. Made with ❤️ in India.
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  All systems operational
                </span>
                <span>English | हिंदी</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <button
                  onClick={() => setShowLogin(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              <LoginScreen onLogin={(state) => {
                onLogin(state)
                setShowLogin(false)
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}