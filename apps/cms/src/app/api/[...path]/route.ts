import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9090';

/**
 * Proxy API route that forwards all requests to the backend.
 * This bypasses CORS issues since requests are made server-side.
 */
async function proxyRequest(request: NextRequest, params: { path: string[] }) {
  const path = params.path.join('/');
  const url = new URL(request.url);
  const targetUrl = `${API_URL}/api/${path}${url.search}`;

  console.log(`[API Proxy] ${request.method} ${targetUrl}`);

  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    // Forward auth header if present
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.set('Authorization', authHeader);
    }

    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
    };

    // Include body for POST, PUT, PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      const body = await request.text();
      if (body) {
        fetchOptions.body = body;
      }
    }

    const response = await fetch(targetUrl, fetchOptions);

    // Handle no-content responses (204)
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json().catch(() => null);

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[API Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to backend' },
      { status: 502 }
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

