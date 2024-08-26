import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { createPost } from '../../../../lib/data';
import { SessionData } from '../../../../lib/types';

export async function POST(req: NextRequest) {
  const session: SessionData = await getIronSession(cookies(), {
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieName: 'iron-session/',
  });

  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, body } = await req.json();

  try {
    const newPost = await createPost(session.userId, title, body);
    console.log('newPost', newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 },
    );
  }
}
