"use client";

import React, { useState } from "react";
import { Input, Select, Checkbox } from "@/components/ui/form";
import { Mail, Lock, User, Phone, Calendar, DollarSign } from "lucide-react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    date: "",
    amount: "",
    category: "option1",
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Lakukan proses submit form di sini
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Form Example</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          value={formData.name}
          onChange={handleChange}
          prefixElement={<User size={18} />}
          validate="required"
        />
        
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={handleChange}
          prefixElement={<Mail size={18} />}
          validate="email"
        />
        
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Masukkan password"
          value={formData.password}
          onChange={handleChange}
          prefixElement={<Lock size={18} />}
          validate="password"
        />
        
        <Input
          name="phone"
          label="Nomor Telepon"
          placeholder="0812-3456-7890"
          value={formData.phone}
          onChange={handleChange}
          prefixElement={<Phone size={18} />}
          format="phone"
        />
        
        {/* Input tanggal dengan format */}
        <Input
          name="date"
          label="Tanggal Lahir"
          placeholder="DD/MM/YYYY"
          value={formData.date}
          onChange={handleChange}
          prefixElement={<Calendar size={18} />}
          format="date"
        />
        
        {/* Input mata uang dengan format */}
        <Input
          name="amount"
          label="Jumlah"
          placeholder="Masukkan jumlah"
          value={formData.amount}
          onChange={handleChange}
          prefixElement={<DollarSign size={18} />}
          format="currency"
          currencySymbol="Rp"
        />
        
        {/* Select dropdown */}
        <Select
          name="category"
          label="Kategori"
          options={[
            { value: "option1", label: "Opsi 1" },
            { value: "option2", label: "Opsi 2" },
            { value: "option3", label: "Opsi 3" }
          ]}
          value={formData.category}
          onChange={handleChange}
          validate="required"
        />
        
        <Checkbox
          name="agreeToTerms"
          label="Saya setuju dengan syarat dan ketentuan"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          validate="required"
        />
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}