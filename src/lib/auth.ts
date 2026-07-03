import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret'; // Normally this would be in process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(userId: string) {
  const expires = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10 hours
  const session = await encrypt({ user: { id: userId }, expires });

  const c = await cookies();
  c.set('session', session, { expires, httpOnly: true, path: '/' });
}

export async function logout() {
  const c = await cookies();
  c.set('session', '', { expires: new Date(0), path: '/' });
}

export async function getSession() {
  const c = await cookies();
  const session = c.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
    path: '/',
  });
  return res;
}
