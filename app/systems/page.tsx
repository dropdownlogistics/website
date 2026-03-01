'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function SystemsRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/registry'); }, [router]);
  return <div style={{minHeight:'100vh',background:'#141F33',display:'flex',alignItems:'center',justifyContent:'center',color:'#8A8E94',fontFamily:'sans-serif'}}>Redirecting to Registry...</div>;
}
