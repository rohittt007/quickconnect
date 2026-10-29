import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Phone, User, Shield, Compass, Clock, MapPin, CheckCircle2, ChevronRight, ArrowLeft, Upload, FileText, Camera } from 'lucide-react';

export const AuthPages = ({ type }) => {
    const { setPanelAndPage, addProvider, addLog, loginUser, registerUser, authError } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Ahmedabad');
    const [agreed, setAgreed] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Provider Multi-step States
    const [providerStep, setProviderStep] = useState(1);
    const [pCategory, setPCategory] = useState('Home Cleaning');
    const [pGender, setPGender] = useState('Male');
    const [pDoB, setPDoB] = useState('1995-05-15');
    const [pExperience, setPExperience] = useState('5+ Years');
    const [pLanguages, setPLanguages] = useState('English, Hindi, Gujarati');
    const [pAbout, setPAbout] = useState('');
    const [pAddress, setPAddress] = useState('');
    const [idType, setIdType] = useState('Aadhaar');
    const [idFile, setIdFile] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage('');

        // Admin shortcut
        if (email.trim().toLowerCase() === 'admin') {
            setIsSubmitting(false);
            setStatusMessage('Welcome, Administrator!');
            setPanelAndPage('admin', 'dashboard');
            return;
        }

        // Provider shortcut
        if (email.trim().toLowerCase() === 'provider') {
            setIsSubmitting(false);
            setStatusMessage('Welcome, Service Provider!');
            setPanelAndPage('provider', 'dashboard');
            return;
        }

        // Normal customer login
        try {
            await loginUser({ email, password });
            setStatusMessage('Signed in successfully.');
        } catch (error) {
            setStatusMessage(error.message || 'Unable to sign in.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();
        const trimmedPassword = password.trim();
        if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedPassword) {
            setStatusMessage('Please fill in all required fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setStatusMessage('Please enter a valid email address.');
            return;
        }
        if (trimmedPassword.length < 6) {
            setStatusMessage('Password must be at least 6 characters long.');
            return;
        }
        if (!agreed) {
            setStatusMessage('Please accept the terms to continue.');
            return;
        }
        setIsSubmitting(true);
        setStatusMessage('');
        try {
            await registerUser({ name: trimmedName, email: trimmedEmail, phone: trimmedPhone, password: trimmedPassword });
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setStatusMessage('Account created successfully. Please log in.');
            setPanelAndPage('customer', 'login');
        } catch (error) {
            setStatusMessage(error.message || 'Unable to create account.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProviderNext = () => {
        if (providerStep < 4) {
            setProviderStep((p) => p + 1);
        } else {
            const newProvider = {
                id: `p-custom-${Date.now()}`,
                name: name || 'Custom Service Provider',
                category: pCategory,
                rating: 5.0,
                experience: pExperience,
                reviewsCount: 0,
                image: photoFile || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
                status: 'Pending',
                startingPrice: 299,
                completedJobs: 0,
                availableTimings: 'Mon - Sun (24/7)',
                languages: pLanguages.split(', '),
                areas: [city],
                servicesOffered: [pCategory, `${pCategory} Repair`, `${pCategory} Setup`],
                whyChooseUs: ['Prompt Service', 'Certified Skills', 'Background Checked'],
                about: pAbout || 'Local verified professional providing top quality service in your area.'
            };
            addProvider(newProvider);
            setPanelAndPage('provider', 'dashboard');
        }
    };

    return (_jsxs("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 fade-in", children: [
        type === 'login' && (_jsxs("div", { className: "grid lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden", children: [
            _jsxs("div", { className: "lg:col-span-6 bg-slate-50/50 p-8 md:p-12 h-full flex flex-col justify-between border-r border-slate-100", children: [
                _jsxs("div", { children: [
                    _jsx("span", { className: "inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-primary-indigo uppercase mb-3", children: "Welcome Back" }),
                    _jsx("h2", { className: "font-display text-2xl font-extrabold text-slate-800 leading-tight mb-2", children: "Glad to See You Again \uD83D\uDC4B" }),
                    _jsx("p", { className: "text-xs text-slate-400 max-w-sm mb-8", children: "Login to your account and continue exploring amazing services & opportunities near you." }),
                    _jsx("div", { className: "space-y-4", children: [
                        { icon: Compass, title: 'Personalized Experience', desc: 'Get services and recommendations tailored just for you.' },
                        { icon: Shield, title: 'Secure & Trusted', desc: 'Your data is protected with top-level security and privacy.' },
                        { icon: Clock, title: 'Save Time', desc: 'Access your history, bookings, and notifications in one place.' },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (_jsxs("div", { className: "flex space-x-3 items-start", children: [
                            _jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-primary-indigo shrink-0", children: _jsx(Icon, { className: "h-4 w-4" }) }),
                            _jsxs("div", { children: [
                                _jsx("h4", { className: "text-xs font-bold text-slate-800", children: item.title }),
                                _jsx("p", { className: "text-[10px] text-slate-400", children: item.desc }),
                            ] }),
                        ] }, i));
                    }) }),
                ] }),
                _jsxs("div", { className: "mt-8 border-t border-slate-100 pt-6 flex justify-between text-[10px] text-slate-400 font-bold", children: [
                    _jsx("span", { children: "Trusted Platform" }),
                    _jsx("span", { children: "24/7 Support" }),
                ] }),
            ] }),
            _jsxs("div", { className: "lg:col-span-6 p-8 md:p-12", children: [
                _jsx("h3", { className: "font-display text-lg font-bold text-slate-800 mb-1", children: "Login to Your Account" }),
                _jsx("p", { className: "text-xs text-slate-400 mb-6", children: "Enter your details to access your account" }),
                _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
                    _jsxs("div", { children: [
                        _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Email or Phone Number" }),
                        _jsxs("div", { className: "relative", children: [
                            _jsx(Mail, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
                            _jsx("input", { type: "text", required: true, placeholder: "Enter your email or phone number", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo focus:bg-white transition" }),
                        ] }),
                        _jsx("p", { className: "text-[10px] text-slate-400 mt-1", children: "Hint: Type \"admin\" to enter Admin Panel, \"provider\" for Provider Dashboard." }),
                    ] }),
                    _jsxs("div", { children: [
                        _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Password" }),
                        _jsxs("div", { className: "relative", children: [
                            _jsx(Lock, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
                            _jsx("input", { type: "password", required: true, placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo focus:bg-white transition" }),
                        ] }),
                    ] }),
                    _jsxs("div", { className: "flex items-center justify-between text-xs font-semibold", children: [
                        _jsxs("label", { className: "flex items-center space-x-2 text-slate-600 cursor-pointer", children: [
                            _jsx("input", { type: "checkbox", defaultChecked: true, className: "rounded border-slate-300 text-primary-indigo focus:ring-primary-indigo" }),
                            _jsx("span", { children: "Remember Me" }),
                        ] }),
                        _jsx("button", { type: "button", className: "text-primary-indigo hover:underline", children: "Forgot Password?" }),
                    ] }),
                    statusMessage && _jsx("p", { className: `text-xs font-semibold text-center mt-1 ${statusMessage.toLowerCase().includes('success') || statusMessage.toLowerCase().includes('welcome') ? 'text-emerald-600' : 'text-red-500'}`, children: statusMessage }),
                    _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full py-2.5 rounded-xl text-xs font-bold text-white btn-premium shadow-md disabled:opacity-60", children: isSubmitting ? 'Signing in\u2026' : 'Login' }),
                ] }),
                _jsxs("p", { className: "text-center text-xs text-slate-400 mt-6 font-medium", children: [
                    "Don't have an account?", ' ',
                    _jsx("button", { onClick: () => setPanelAndPage('customer', 'signup'), className: "text-primary-indigo font-bold hover:underline", children: "Sign Up" }),
                ] }),
            ] }),
        ] })),

        type === 'signup' && (_jsxs("div", { className: "grid lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden", children: [
            _jsxs("div", { className: "lg:col-span-6 bg-slate-50/50 p-8 md:p-12 h-full flex flex-col justify-between border-r border-slate-100", children: [
                _jsxs("div", { children: [
                    _jsx("span", { className: "inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-primary-indigo uppercase mb-3", children: "Create Your Account" }),
                    _jsx("h2", { className: "font-display text-2xl font-extrabold text-slate-800 leading-tight mb-2", children: "Join QuickConnect \uD83D\uDE80" }),
                    _jsx("p", { className: "text-xs text-slate-400 max-w-sm mb-8", children: "Sign up and unlock a world of trusted services, local support, and endless possibilities." }),
                    _jsxs("div", { className: "space-y-4", children: [
                        _jsxs("div", { className: "flex space-x-3 items-center", children: [
                            _jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold", children: "\u2713" }),
                            _jsx("span", { className: "text-xs text-slate-700 font-semibold", children: "Verified & Trusted Professionals" }),
                        ] }),
                        _jsxs("div", { className: "flex space-x-3 items-center", children: [
                            _jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold", children: "\u2713" }),
                            _jsx("span", { className: "text-xs text-slate-700 font-semibold", children: "Quick & Easy Access bookings" }),
                        ] }),
                        _jsxs("div", { className: "flex space-x-3 items-center", children: [
                            _jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold", children: "\u2713" }),
                            _jsx("span", { className: "text-xs text-slate-700 font-semibold", children: "24/7 dedicated local support desk" }),
                        ] }),
                    ] }),
                ] }),
                _jsxs("div", { className: "mt-8 border-t border-slate-100 pt-6", children: [
                    _jsx("p", { className: "text-[10px] text-slate-400 leading-normal max-w-xs", children: "\"QuickConnect made it so easy to find reliable painters in my area. Highly recommended!\"" }),
                    _jsx("p", { className: "text-[10px] font-bold text-slate-700 mt-1", children: "- Rajesh Patel, Verified Customer" }),
                ] }),
            ] }),
            _jsxs("div", { className: "lg:col-span-6 p-8 md:p-12", children: [
                _jsx("h3", { className: "font-display text-lg font-bold text-slate-800 mb-1", children: "Sign Up & Get Started" }),
                _jsx("p", { className: "text-xs text-slate-400 mb-6", children: "Let's create your account" }),
                _jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [
                    _jsxs("div", { children: [
                        _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Full Name" }),
                        _jsxs("div", { className: "relative", children: [
                            _jsx(User, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
                            _jsx("input", { type: "text", required: true, placeholder: "Enter your full name", value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo focus:bg-white transition" }),
                        ] }),
                    ] }),
                    _jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Email Address" }),
                            _jsxs("div", { className: "relative", children: [
                                _jsx(Mail, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
                                _jsx("input", { type: "email", required: true, placeholder: "Enter email address", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo focus:bg-white transition" }),
                            ] }),
                        ] }),
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Mobile Number" }),
                            _jsxs("div", { className: "relative", children: [
                                _jsx(Phone, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
                                _jsx("input", { type: "tel", required: true, placeholder: "Enter mobile number", value: phone, onChange: (e) => setPhone(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo focus:bg-white transition" }),
                            ] }),
                        ] }),
                    ] }),
                    _jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Create Password" }),
                            _jsxs("div", { className: "relative", children: [
                                _jsx(Lock, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
                                _jsx("input", { type: "password", required: true, placeholder: "Create a password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo focus:bg-white transition" }),
                            ] }),
                        ] }),
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Select Your City" }),
                            _jsxs("div", { className: "relative", children: [
                                _jsx(MapPin, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
                                _jsxs("select", { value: city, onChange: (e) => setCity(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo focus:bg-white transition appearance-none", children: [
                                    _jsx("option", { value: "Ahmedabad", children: "Ahmedabad" }),
                                    _jsx("option", { value: "Gandhinagar", children: "Gandhinagar" }),
                                    _jsx("option", { value: "Surat", children: "Surat" }),
                                    _jsx("option", { value: "Mumbai", children: "Mumbai" }),
                                ] }),
                            ] }),
                        ] }),
                    ] }),
                    _jsxs("label", { className: "flex items-start space-x-2.5 text-xs text-slate-500 font-medium cursor-pointer", children: [
                        _jsx("input", { type: "checkbox", checked: agreed, onChange: (e) => setAgreed(e.target.checked), className: "rounded mt-0.5 border-slate-300 text-primary-indigo focus:ring-primary-indigo" }),
                        _jsxs("span", { children: [
                            "I agree to the ",
                            _jsx("span", { className: "text-primary-indigo font-bold hover:underline", children: "Terms of Service" }),
                            " and ",
                            _jsx("span", { className: "text-primary-indigo font-bold hover:underline", children: "Privacy Policy" }),
                            ".",
                        ] }),
                    ] }),
                    statusMessage && _jsx("p", { className: `text-xs font-semibold text-center mt-1 ${statusMessage.toLowerCase().includes('success') ? 'text-emerald-600' : 'text-red-500'}`, children: statusMessage }),
                    _jsx("button", { type: "submit", disabled: !agreed || isSubmitting, className: "w-full py-2.5 rounded-xl text-xs font-bold text-white btn-premium disabled:opacity-50 shadow-md", children: isSubmitting ? 'Creating Account\u2026' : 'Create Account' }),
                ] }),
                _jsxs("p", { className: "text-center text-xs text-slate-400 mt-6 font-medium", children: [
                    "Already have an account?", ' ',
                    _jsx("button", { onClick: () => setPanelAndPage('customer', 'login'), className: "text-primary-indigo font-bold hover:underline", children: "Login" }),
                ] }),
            ] }),
        ] })),

        type === 'join-provider' && (_jsxs("div", { className: "bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden", children: [
            _jsxs("div", { className: "border-b border-slate-50 bg-slate-50/50 p-6 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
                _jsxs("div", { children: [
                    _jsx("span", { className: "rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-primary-indigo uppercase", children: "Service Provider Program" }),
                    _jsx("h2", { className: "font-display text-lg font-extrabold text-slate-800 mt-1", children: "Join as a Service Provider" }),
                    _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Start earning more and grow your business with QuickConnect." }),
                ] }),
                _jsx("div", { className: "flex items-center space-x-2 md:space-x-4", children: [
                    { step: 1, label: 'Basic Info' },
                    { step: 2, label: 'Worker Info' },
                    { step: 3, label: 'Verification' },
                    { step: 4, label: 'Complete' },
                ].map((s) => (_jsxs("div", { className: "flex items-center", children: [
                    _jsx("div", { className: `flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition ${providerStep >= s.step ? 'bg-primary-indigo text-white shadow-sm' : 'bg-slate-100 text-slate-400'}`, children: providerStep > s.step ? '✓' : s.step }),
                    _jsx("span", { className: `text-[10px] font-bold ml-1.5 hidden sm:inline ${providerStep >= s.step ? 'text-slate-700' : 'text-slate-400'}`, children: s.label }),
                    s.step < 4 && _jsx(ChevronRight, { className: "h-3 w-3 text-slate-300 ml-2.5 hidden sm:block" }),
                ] }, s.step))) }),
            ] }),
            _jsxs("div", { className: "grid lg:grid-cols-12 gap-8 p-6 md:p-10 items-start", children: [
                _jsxs("div", { className: "lg:col-span-8 space-y-6", children: [
                    providerStep === 1 && (_jsxs("div", { className: "space-y-6 fade-in", children: [
                        _jsxs("div", { className: "grid md:grid-cols-2 gap-6 items-center", children: [
                            _jsxs("div", { children: [
                                _jsx("h3", { className: "font-display text-base font-bold text-slate-800 mb-2", children: "Grow Your Business with QuickConnect" }),
                                _jsx("p", { className: "text-xs text-slate-500 leading-relaxed mb-4", children: "Join thousands of skilled professionals and service companies getting verified customers daily. Complete registration under 2 minutes." }),
                                _jsxs("div", { className: "space-y-3 mb-6", children: [
                                    _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-emerald-500 shrink-0" }), _jsx("span", { className: "text-xs text-slate-600 font-semibold", children: "Zero upfront signup fees" })] }),
                                    _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-emerald-500 shrink-0" }), _jsx("span", { className: "text-xs text-slate-600 font-semibold", children: "Receive direct customer booking requests" })] }),
                                    _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-emerald-500 shrink-0" }), _jsx("span", { className: "text-xs text-slate-600 font-semibold", children: "Automatic payout processing" })] }),
                                ] }),
                            ] }),
                            _jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm p-4 bg-slate-50 text-center", children: [
                                _jsx("div", { className: "mx-auto h-20 w-20 overflow-hidden rounded-full mb-3 ring-4 ring-indigo-50", children: _jsx("img", { src: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=150", alt: "Worker profile placeholder", className: "h-full w-full object-cover" }) }),
                                _jsx("p", { className: "text-xs font-bold text-slate-800", children: "Become a Partner" }),
                                _jsx("p", { className: "text-[10px] text-primary-indigo font-semibold", children: "Average partner monthly earnings: \u20B945,000+" }),
                            ] }),
                        ] }),
                        _jsxs("div", { className: "space-y-4 pt-4 border-t border-slate-100", children: [
                            _jsx("h4", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "Select Your Core Category" }),
                            _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: ['Home Cleaning', 'Painter', 'AC Repair', 'Carpenter', 'Electrician', 'Plumber'].map((cat) => (_jsx("button", { type: "button", onClick: () => setPCategory(cat), className: `rounded-xl border p-3.5 text-center text-xs font-bold transition ${pCategory === cat ? 'border-primary-indigo bg-indigo-50/50 text-primary-indigo shadow-sm' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`, children: cat }, cat))) }),
                        ] }),
                    ] })),

                    providerStep === 2 && (_jsxs("div", { className: "space-y-4 fade-in", children: [
                        _jsx("h3", { className: "font-display text-base font-bold text-slate-800", children: "Your Personal & Professional Details" }),
                        _jsx("p", { className: "text-xs text-slate-400", children: "Please provide accurate info to help customers find and contact you easily." }),
                        _jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Full Name *" }),
                                _jsx("input", { type: "text", required: true, placeholder: "Enter your full name", value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo focus:bg-white transition" }),
                            ] }),
                            _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                                _jsxs("div", { children: [
                                    _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Date of Birth *" }),
                                    _jsx("input", { type: "date", required: true, value: pDoB, onChange: (e) => setPDoB(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo" }),
                                ] }),
                                _jsxs("div", { children: [
                                    _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Gender *" }),
                                    _jsxs("select", { value: pGender, onChange: (e) => setPGender(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo appearance-none", children: [
                                        _jsx("option", { children: "Male" }),
                                        _jsx("option", { children: "Female" }),
                                        _jsx("option", { children: "Other" }),
                                    ] }),
                                ] }),
                            ] }),
                        ] }),
                        _jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Mobile Number *" }),
                                _jsx("input", { type: "tel", required: true, placeholder: "Enter mobile number", value: phone, onChange: (e) => setPhone(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo" }),
                            ] }),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Email Address" }),
                                _jsx("input", { type: "email", placeholder: "Enter email address", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo" }),
                            ] }),
                        ] }),
                        _jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Years of Experience *" }),
                                _jsxs("select", { value: pExperience, onChange: (e) => setPExperience(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo", children: [
                                    _jsx("option", { children: "1-3 Years" }),
                                    _jsx("option", { children: "3-5 Years" }),
                                    _jsx("option", { children: "5+ Years" }),
                                    _jsx("option", { children: "8+ Years" }),
                                    _jsx("option", { children: "12+ Years" }),
                                ] }),
                            ] }),
                            _jsxs("div", { children: [
                                _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Languages Spoken *" }),
                                _jsx("input", { type: "text", placeholder: "English, Hindi, Gujarati", value: pLanguages, onChange: (e) => setPLanguages(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo" }),
                            ] }),
                        ] }),
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Service Address *" }),
                            _jsx("input", { type: "text", required: true, placeholder: "Enter your shop or home address", value: pAddress, onChange: (e) => setPAddress(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo" }),
                        ] }),
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block text-[11px] font-bold text-slate-600 uppercase mb-1.5", children: "Work Description (Optional)" }),
                            _jsx("textarea", { rows: 3, placeholder: "Write a brief bio about your specialty, services, and commitment...", value: pAbout, onChange: (e) => setPAbout(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-primary-indigo" }),
                        ] }),
                    ] })),

                    providerStep === 3 && (_jsxs("div", { className: "space-y-6 fade-in", children: [
                        _jsx("h3", { className: "font-display text-base font-bold text-slate-800", children: "Verification & Identity Proof" }),
                        _jsx("p", { className: "text-xs text-slate-400", children: "Upload official documents to build trust and activate full platform booking capabilities." }),
                        _jsx("div", { className: "grid sm:grid-cols-4 gap-3", children: [
                            { id: 'Aadhaar', label: 'Aadhaar Card' },
                            { id: 'PAN', label: 'PAN Card' },
                            { id: 'License', label: 'Driving License' },
                            { id: 'Voter', label: 'Voter ID' },
                        ].map((doc) => (_jsx("button", { type: "button", onClick: () => setIdType(doc.id), className: `rounded-xl border p-3.5 text-center text-xs font-bold transition ${idType === doc.id ? 'border-primary-indigo bg-indigo-50/20 text-primary-indigo' : 'border-slate-100 text-slate-500'}`, children: doc.label }, doc.id))) }),
                        _jsxs("div", { className: "border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-6 text-center cursor-pointer hover:bg-slate-100/50 transition", children: [
                            _jsx("input", { type: "file", id: "doc-upload", className: "hidden", onChange: () => setIdFile('uploaded_identity_document.pdf') }),
                            _jsxs("label", { htmlFor: "doc-upload", className: "cursor-pointer", children: [
                                _jsx(Upload, { className: "mx-auto h-8 w-8 text-slate-400 mb-2" }),
                                _jsx("p", { className: "text-xs font-bold text-slate-700", children: "Click to upload or drag & drop" }),
                                _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "PNG, JPG or PDF (Max. 5MB)" }),
                                idFile && (_jsxs("div", { className: "mt-3 inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-600", children: [
                                    _jsx(FileText, { className: "h-3.5 w-3.5" }),
                                    _jsx("span", { children: idFile }),
                                ] })),
                            ] }),
                        ] }),
                        _jsxs("div", { className: "space-y-4", children: [
                            _jsx("h4", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "Professional Photo" }),
                            _jsxs("div", { className: "grid sm:grid-cols-2 gap-4 items-center", children: [
                                _jsxs("div", { className: "border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-6 text-center cursor-pointer hover:bg-slate-100/50 transition", children: [
                                    _jsx("input", { type: "file", id: "photo-upload", className: "hidden", onChange: () => setPhotoFile('https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200') }),
                                    _jsxs("label", { htmlFor: "photo-upload", className: "cursor-pointer", children: [
                                        _jsx(Camera, { className: "mx-auto h-8 w-8 text-slate-400 mb-2" }),
                                        _jsx("p", { className: "text-xs font-bold text-slate-700", children: "Upload Your Photo" }),
                                        _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "PNG, JPG or JPEG (Max. 5MB)" }),
                                    ] }),
                                ] }),
                                _jsxs("div", { className: "rounded-xl border border-slate-100 bg-slate-50/50 p-4", children: [
                                    _jsx("h5", { className: "text-[11px] font-bold text-slate-700 uppercase mb-2", children: "Photo Guidelines" }),
                                    _jsxs("ul", { className: "text-[10px] text-slate-500 space-y-1", children: [
                                        _jsx("li", { children: "\u2022 Clear front-facing portrait shot" }),
                                        _jsx("li", { children: "\u2022 Background should be solid/plain" }),
                                        _jsx("li", { children: "\u2022 Remove sunglasses or heavy headwear" }),
                                        _jsx("li", { children: "\u2022 Must be recent (taken within last 6 months)" }),
                                    ] }),
                                ] }),
                            ] }),
                        ] }),
                    ] })),
                    providerStep === 4 && (_jsxs("div", { className: "text-center space-y-6 py-6 fade-in", children: [
                        _jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 animate-bounce", children: _jsx(CheckCircle2, { className: "h-10 w-10" }) }),
                        _jsxs("div", { children: [
                            _jsx("h3", { className: "font-display text-xl font-extrabold text-slate-800", children: "Congratulations! \uD83C\uDF89" }),
                            _jsx("p", { className: "text-xs font-semibold text-primary-purple mt-1", children: "You're Now a Verified Service Provider" }),
                            _jsx("p", { className: "text-xs text-slate-400 max-w-sm mx-auto mt-2", children: "Your profile has been created and verified. You can now access your dashboard and manage customer bookings." }),
                        ] }),
                        _jsxs("div", { className: "max-w-md mx-auto grid grid-cols-2 gap-4 border-t border-slate-100 pt-6", children: [
                            _jsxs("div", { className: "text-left rounded-xl bg-slate-50 p-4", children: [
                                _jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wide", children: "Next Step" }),
                                _jsx("p", { className: "text-xs font-bold text-slate-700 mt-1", children: "Set Availability" }),
                                _jsx("p", { className: "text-[10px] text-slate-400", children: "Configure active work hours in your calendar." }),
                            ] }),
                            _jsxs("div", { className: "text-left rounded-xl bg-slate-50 p-4", children: [
                                _jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wide", children: "Earning" }),
                                _jsx("p", { className: "text-xs font-bold text-slate-700 mt-1", children: "Accept Bookings" }),
                                _jsx("p", { className: "text-[10px] text-slate-400", children: "Get notification requests on your dashboard." }),
                            ] }),
                        ] }),
                    ] })),
                    _jsxs("div", { className: "flex items-center justify-between border-t border-slate-100 pt-6", children: [
                        _jsxs("button", { type: "button", onClick: () => providerStep > 1 ? setProviderStep((s) => s - 1) : setPanelAndPage('public', 'home'), className: "rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition flex items-center space-x-1", children: [
                            _jsx(ArrowLeft, { className: "h-4 w-4" }),
                            _jsx("span", { children: providerStep === 1 ? 'Cancel' : 'Back' }),
                        ] }),
                        _jsxs("button", { type: "button", onClick: handleProviderNext, className: "rounded-xl bg-primary-indigo px-6 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700 flex items-center space-x-1", children: [
                            _jsx("span", { children: providerStep === 4 ? 'Access Dashboard' : 'Continue' }),
                            _jsx(ChevronRight, { className: "h-4 w-4" }),
                        ] }),
                    ] }),
                ] }),
                _jsxs("div", { className: "lg:col-span-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 space-y-4", children: [
                    _jsx("h4", { className: "font-display text-xs font-bold text-slate-800", children: "Why Verification Matters" }),
                    _jsx("p", { className: "text-[10px] text-slate-500 leading-relaxed", children: "Verification builds trust with customers, unlocks premium payouts, grants higher visibility in search listings, and ensures safety across our platform." }),
                    _jsxs("div", { className: "border-t border-slate-100 pt-3 space-y-2", children: [
                        _jsx("h5", { className: "text-[10px] font-bold text-slate-700 uppercase", children: "Documents Required" }),
                        _jsxs("ul", { className: "text-[10px] text-slate-500 space-y-1", children: [
                            _jsx("li", { children: "\u2022 National ID Proof (Aadhaar or PAN)" }),
                            _jsx("li", { children: "\u2022 Mobile Number Verification" }),
                            _jsx("li", { children: "\u2022 Professional Certification (Optional)" }),
                            _jsx("li", { children: "\u2022 Proof of Registered Address" }),
                        ] }),
                    ] }),
                    _jsx("div", { className: "border-t border-slate-100 pt-3 text-center", children: _jsx("p", { className: "text-[9px] text-slate-400", children: "Your information is secure with 256-bit encryption. We never sell your personal data." }) }),
                ] }),
            ] }),
        ] })),
    ] }));
};
