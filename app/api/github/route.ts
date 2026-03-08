import { NextResponse } from 'next/server';

const REPO = 'dropdownlogistics/website';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    const [repoRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`, { headers, next: { revalidate: 300 } }),
      fetch(`https://api.github.com/repos/${REPO}/commits?per_page=100`, { headers, next: { revalidate: 300 } }),
    ]);

    const [repo, commits] = await Promise.all([repoRes.json(), commitsRes.json()]);

    if (repo.message) throw new Error(repo.message);
    if (!Array.isArray(commits)) throw new Error(commits.message || 'Failed to fetch commits');

    return NextResponse.json({ repo, commits });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
