"use client";

import { Input, Checkbox, Select } from "@/components/ui/form";

export default function Home() {
  return (
    <div className="w-[400px] h-auto p-4 border rounded-lg shadow-md">
      <Input label="Nama" type="text" placeholder="Masukkan nama" />
      <Input label="Email" type="email" placeholder="Masukkan email" />
      <Select
        label="Pilih Kota"
        options={[
          { value: "jakarta", label: "Jakarta" },
          { value: "bandung", label: "Bandung" },
          { value: "surabaya", label: "Surabaya" },
        ]}
      />
      <Checkbox label="Saya setuju dengan syarat & ketentuan" />
    </div>
  );
}
