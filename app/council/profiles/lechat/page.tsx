'use client';

import { councilMembers } from '../councilData';
import ProfileDetail from '../ProfileDetail';

export default function Page() {
  const idx = councilMembers.findIndex(m => m.slug === 'lechat');
  const member = councilMembers[idx];
  const prev = idx > 0 ? councilMembers[idx - 1] : undefined;
  const next = idx < councilMembers.length - 1 ? councilMembers[idx + 1] : undefined;

  if (!member) return <div style={{ padding: '100px 24px 32px', color: '#F5F1EB' }}>Profile not found.</div>;

  return <ProfileDetail member={member} prevMember={prev} nextMember={next} />;
}
