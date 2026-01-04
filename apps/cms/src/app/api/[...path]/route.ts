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
    
    // Forward auth header if present
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.set('Authorization', authHeader);
    }

    // Get the original content type to detect multipart/form-data uploads
    const contentType = request.headers.get('Content-Type');
    const isMultipart = contentType?.includes('multipart/form-data');

    // For non-multipart requests, set JSON content type
    // For multipart, let fetch set it automatically with the boundary
    if (!isMultipart && contentType) {
      headers.set('Content-Type', contentType);
    } else if (!isMultipart) {
      headers.set('Content-Type', 'application/json');
    }

    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
    };

    // Include body for POST, PUT, PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      if (isMultipart) {
        // For file uploads, forward the FormData directly
        // This preserves the binary data and boundary
        const formData = await request.formData();
        fetchOptions.body = formData;
      } else {
        const body = await request.text();
        if (body) {
          fetchOptions.body = body;
        }
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

