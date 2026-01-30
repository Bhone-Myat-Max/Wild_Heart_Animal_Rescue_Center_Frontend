'use client'
import React, { useState } from 'react';
import { DonationFormData, FormErrors, DonationPurpose } from '@/api/donations/type';

const DonationForm: React.FC = () => {
  const [formData, setFormData] = useState<DonationFormData>({
    name: '',
    amount: '',
    email: '',
    phone: '',
    purpose: '',
    image: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Please enter a valid amount';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.purpose) newErrors.purpose = 'Please select a donation purpose';
    if (!formData.image) newErrors.image = 'Proof of transaction image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAmountClick = (val: number) => {
    setFormData(prev => ({ ...prev, amount: val }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      email: '',
      phone: '',
      purpose: '',
      image: null,
    });
    setPreviewUrl(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-6">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 text-4xl animate-bounce">
          <i className="fas fa-check"></i>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You, {formData.name}!</h3>
        <p className="text-gray-600 max-w-sm mb-10 text-lg">
          Your contribution of <span className="font-bold text-emerald-600">${formData.amount}</span> towards {formData.purpose} has been received. Our team will verify the transaction shortly.
        </p>
        <button 
          onClick={resetForm}
          className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Amount Selection */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">1. Choose Donation Amount</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[20, 50, 100, 200].map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => handleAmountClick(amt)}
                className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                  Number(formData.amount) === amt 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 scale-[1.02]' 
                  : 'border-gray-100 text-gray-500 hover:border-emerald-200'
                }`}
              >
                ${amt}
              </button>
            ))}
            <div className="relative col-span-2 sm:col-span-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
              <input
                type="number"
                placeholder="Other"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className={`w-full pl-8 pr-3 py-3 border-2 rounded-xl font-bold outline-none transition-all ${
                  errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-emerald-400 focus:bg-white'
                }`}
              />
            </div>
          </div>
          {errors.amount && <p className="text-xs text-red-500 font-medium flex items-center gap-1">
            <i className="fas fa-exclamation-circle"></i> {errors.amount}
          </p>}
        </div>

        {/* Details Grid */}
        <div className="space-y-6">
          <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">2. Your Details</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                className={`w-full px-5 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${
                  errors.name ? 'ring-2 ring-red-200 bg-red-50' : 'focus:bg-white focus:ring-emerald-500/10'
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 font-medium ml-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
                className={`w-full px-5 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${
                  errors.email ? 'ring-2 ring-red-200 bg-red-50' : 'focus:bg-white focus:ring-emerald-500/10'
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 000-0000"
                className={`w-full px-5 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${
                  errors.phone ? 'ring-2 ring-red-200 bg-red-50' : 'focus:bg-white focus:ring-emerald-500/10'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-500 font-medium ml-1">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">Donation Purpose</label>
              <div className="relative">
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                  className={`w-full px-5 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none cursor-pointer ${
                    errors.purpose ? 'ring-2 ring-red-200 bg-red-50' : 'focus:bg-white focus:ring-emerald-500/10'
                  }`}
                >
                  <option value="">Choose where to help...</option>
                  {Object.values(DonationPurpose).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
              </div>
              {errors.purpose && <p className="text-xs text-red-500 font-medium ml-1">{errors.purpose}</p>}
            </div>
          </div>
        </div>

        {/* Transaction Proof Upload */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">3. Proof of Transaction</label>
          <div 
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
              errors.image ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50/50 hover:border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <input
              type="file"
              id="receipt-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="receipt-upload" className="cursor-pointer">
              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <img src={previewUrl} alt="Receipt preview" className="h-48 object-contain rounded-xl mb-4 shadow-xl ring-4 ring-white" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Change Image</span>
                    </div>
                  </div>
                  <span className="text-emerald-600 text-sm font-bold bg-emerald-100 px-4 py-1.5 rounded-full">File Selected</span>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                    <i className="fas fa-cloud-upload-alt text-2xl text-emerald-500"></i>
                  </div>
                  <p className="text-gray-900 font-bold">Upload Transaction Screenshot</p>
                  <p className="text-gray-500 text-sm mt-1">Select PNG or JPG image of your receipt</p>
                  <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest font-bold bg-white px-3 py-1 rounded-full shadow-sm">Max 5MB</p>
                </div>
              )}
            </label>
          </div>
          {errors.image && <p className="text-xs text-red-500 font-medium flex items-center gap-1">
             <i className="fas fa-exclamation-circle"></i> {errors.image}
          </p>}
        </div>

        {/* Submit Action */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold text-xl hover:bg-emerald-700 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-500/20"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <i className="fas fa-spinner animate-spin"></i> Processing Donation...
              </span>
            ) : (
              `Donate $${formData.amount || '0'} Now`
            )}
          </button>
          <p className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
            <i className="fas fa-lock text-xs"></i> 256-bit Secure Transaction Processing
          </p>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
