# Toko Kita

## Deskripsi  
Aplikasi frontend ini dibangun menggunakan **Next.js** dengan **TypeScript**, backend menggunakan **Supabase**.  
Testing menggunakan framework **Vitest** untuk unit dan integration test.  
Form handling memakai **React Hook Form** dan validasi menggunakan **Zod**. Styling menggunakan **Tailwind CSS**.

---

## Prasyarat  
- Node.js versi 16 atau lebih baru  
- Menggunakan npm

---

## Setup & Instalasi  

1. Clone repo:  
   ```bash
   git clone <url-repository>
   cd <nama-folder-proyek>
   ```
2. Create & update env file (URL, Anon Key)
   for NEXT_PUBLIC_SUPABASE_URL: https://pevicrgnxjhfefmtnltr.supabase.co
   for NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBldmljcmdueGpoZmVmbXRubHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDgzNDksImV4cCI6MjA2MzU4NDM0OX0.k9BqR0fxlQqtRLcWq0lh-wfnw1mUQxatgwwUTVlB5uM

3. Run npm install to install all dependencies

4. For running this app using npm dev

5. For testing using npm run test
   If you want to specific test, you can type npm run test (name file). It's inside test folder.

## Storage and Sub Service

### Storage  
This system using **Supabase**. Supabase is chosen because it integrates easily with Next.js, offers a scalable relational database, and supports real-time updates. 

### Sub Service  
Sub Service here refers to the main features of the application, such as:  
- Adding items  
- Purchase processing  
- Sales processing using FIFO method  
- Profit calculation based on HPP with sales