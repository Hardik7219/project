import AuthProvider from "@/components/session/provider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
        <AuthProvider>
          {children}     
        </AuthProvider>
    </>
  );
}
