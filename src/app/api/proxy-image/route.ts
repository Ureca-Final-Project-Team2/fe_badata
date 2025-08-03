import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 허용된 이미지 도메인 목록
const ALLOWED_DOMAINS = [
  'badatabucket.s3.ap-northeast-2.amazonaws.com',
  'img1.kakaocdn.net',
  'img2.kakaocdn.net',
  'img3.kakaocdn.net',
  'img4.kakaocdn.net',
  'img5.kakaocdn.net',
  't1.kakaocdn.net',
  't2.kakaocdn.net',
  't3.kakaocdn.net',
  't4.kakaocdn.net',
  't5.kakaocdn.net',
];

// 차단할 내부 IP 패턴
const BLOCKED_IP_PATTERNS = [
  /^localhost$/,
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^169\.254\./,
  /^::1$/,
  /^fc00:/,
  /^fe80:/,
];

// 이미지 파일 확장자 검증
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

// URL 검증 함수
function validateUrl(urlString: string): { isValid: boolean; error?: string } {
  try {
    const url = new URL(urlString);

    // 프로토콜 검증 (HTTPS만 허용)
    if (url.protocol !== 'https:') {
      return { isValid: false, error: 'Only HTTPS URLs are allowed' };
    }

    // 도메인 검증
    if (!ALLOWED_DOMAINS.includes(url.hostname)) {
      return { isValid: false, error: 'Domain not allowed' };
    }

    // 내부 IP 주소 차단
    for (const pattern of BLOCKED_IP_PATTERNS) {
      if (pattern.test(url.hostname)) {
        return { isValid: false, error: 'Internal IP not allowed' };
      }
    }

    // 파일 확장자 검증
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
      url.pathname.toLowerCase().endsWith(ext),
    );
    if (!hasValidExtension) {
      return { isValid: false, error: 'Invalid file extension' };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  // URL 검증
  const validation = validateUrl(imageUrl);
  if (!validation.isValid) {
    return NextResponse.json({ error: validation.error }, { status: 403 });
  }

  try {
    // 타임아웃과 함께 이미지 요청
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃

    const response = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'ImageProxy/1.0',
        Accept: 'image/*',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 404 });
    }

    // Content-Type 검증
    const contentType = response.headers.get('content-type');
    if (!contentType || !ALLOWED_CONTENT_TYPES.some((type) => contentType.startsWith(type))) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    // 파일 크기 제한 (10MB)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 });
    }

    const imageBuffer = await response.arrayBuffer();

    // 실제 파일 크기 검증
    if (imageBuffer.byteLength > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 });
    }

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=3600', // 1시간 캐시
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
    });
  } catch (error) {
    console.error('Proxy image error:', error);

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timeout' }, { status: 408 });
    }

    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
}
