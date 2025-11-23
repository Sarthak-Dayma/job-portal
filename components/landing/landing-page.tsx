"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Users, Briefcase, Shield, Star, CheckCircle, Phone, MapPin, Clock, Sparkles, Zap, Award, Heart, Play } from "lucide-react"
import LoginScreen from "../auth/login-screen"

interface LandingPageProps {
  onLogin: (state: any) => void
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Users,
      title: "Verified Professionals",
      description: "Every worker undergoes rigorous background checks and skill verification",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description: "AI-powered algorithm connects you with the perfect worker based on skills",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Bank-grade security with escrow payments and comprehensive insurance",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get responses within minutes with our streamlined workflow",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100"
    }
  ]

  const stats = [
    { number: "15K+", label: "Verified Workers", icon: Users },
    { number: "8K+", label: "Jobs Completed", icon: CheckCircle },
    { number: "4.9", label: "Average Rating", icon: Star },
    { number: "99%", label: "Success Rate", icon: Award }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Master Electrician",
      content: "ShramSaathi transformed my career completely. I now get premium jobs with fair pay and the platform's verification gives clients confidence.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Priya Sharma",
      role: "Home Owner",
      content: "Found an amazing carpenter who fixed our entire kitchen renovation. The quality was outstanding and the process was seamless.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Amit Patel",
      role: "Plumbing Expert",
      content: "Best platform for skilled workers. Direct communication, fair rates, and steady work throughout the year.",
      rating: 5,
      avatar: "AP"
    }
  ]

  const steps = [
    {
      step: "01",
      title: "Create Account",
      description: "Sign up as a worker or employer in under 2 minutes",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02",
      title: "Get Matched",
      description: "Our AI finds the perfect match for your requirements",
      icon: Sparkles,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "03",
      title: "Work & Earn",
      description: "Complete projects with confidence and get paid securely",
      icon: Heart,
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-lg">
                श्र
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ShramSaathi</h1>
                <p className="text-xs text-gray-600">India's Premier Job Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                How it works
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                For Workers
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                For Employers
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">Trusted by 15,000+ professionals</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                  Connect with
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Skilled Workers
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl">
                  India's most trusted platform connecting verified blue-collar professionals with quality job opportunities.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    Start Hiring Today
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="text-gray-700 px-8 py-4 rounded-xl font-bold text-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-12 text-sm text-gray-600">
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
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Available Workers</h3>
                        <p className="text-blue-100 text-sm">in your area</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-white">247</div>
                      <div className="text-blue-100 text-sm">online now</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {[
                    { name: "Rajesh Kumar", skill: "Master Electrician", rating: 4.9, price: "₹500/hr" },
                    { name: "Amit Singh", skill: "Expert Plumber", rating: 4.8, price: "₹450/hr" },
                    { name: "Vikram Patel", skill: "Professional Carpenter", rating: 5.0, price: "₹550/hr" }
                  ].map((worker, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                            {worker.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{worker.name}</h4>
                            <p className="text-blue-600 font-semibold text-sm">{worker.skill}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-semibold text-gray-700">{worker.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{worker.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the growing community of verified professionals and satisfied employers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShramSaathi?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with unwavering trust to create India's most reliable job marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in just 3 simple steps and transform your work experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from workers and employers who found success on ShramSaathi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-8 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-blue-600 font-semibold text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-5xl mx-auto text-center px-8">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Work?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 15,000+ professionals already building successful careers on ShramSaathi.
            Your next opportunity is just one click away.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl inline-flex items-center gap-4"
          >
            Join ShramSaathi Today
            <ArrowRight className="w-6 h-6" />
          </button>
          <div className="mt-8 flex items-center justify-center gap-8 text-blue-200">
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
      </section>

      {/* Clean Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-white">
                  श्र
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">ShramSaathi</h3>
                  <p className="text-gray-400">India's Premier Job Platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Connecting skilled workers with quality job opportunities across India. Building trust, one job at a time.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">For Workers</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find Jobs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Build Profile</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Get Verified</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">For Employers</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Post Jobs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find Workers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Manage Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; 2024 ShramSaathi. All rights reserved. Made with ❤️ in India.
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
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