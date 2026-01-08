import AuthProvider from "@/components/session/provider";
import Navbar from "./navbar/page";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <>
    <Navbar></Navbar>
        <AuthProvider>
          {children}     
        </AuthProvider>
    </>
  );
}
