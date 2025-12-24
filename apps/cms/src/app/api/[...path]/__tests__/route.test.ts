/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from 'next/server';
import { GET, POST, PUT, PATCH, DELETE } from '../route';

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

// Helper to create a mock NextRequest
function createMockRequest(url: string, options: RequestInit = {}): NextRequest {
  return new NextRequest(url, options);
}

describe('API Proxy Route', () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9090';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('GET', () => {
    it('proxies GET requests to the backend', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts');
      const params = Promise.resolve({ path: ['posts'] });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        })
      );
      expect(data).toEqual(mockResponse);
      expect(response.status).toBe(200);
    });

    it('forwards query parameters', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts?page=1&limit=10');
      const params = Promise.resolve({ path: ['posts'] });

      await GET(request, { params });

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts?page=1&limit=10`,
        expect.any(Object)
      );
    });

    it('handles nested paths', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts/123/comments');
      const params = Promise.resolve({ path: ['posts', '123', 'comments'] });

      await GET(request, { params });

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts/123/comments`,
        expect.any(Object)
      );
    });

    it('forwards Authorization header when present', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts', {
        headers: {
          Authorization: 'Bearer token123',
        },
      });
      const params = Promise.resolve({ path: ['posts'] });

      await GET(request, { params });

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const headers = fetchCall[1].headers as Headers;
      expect(headers.get('Authorization')).toBe('Bearer token123');
    });
  });

  describe('POST', () => {
    it('proxies POST requests with body', async () => {
      const mockResponse = { id: 1, title: 'New Post' };
      const requestBody = { title: 'New Post', content: 'Content' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 201,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      const params = Promise.resolve({ path: ['posts'] });

      const response = await POST(request, { params });
      const data = await response.json();

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
      );
      expect(data).toEqual(mockResponse);
      expect(response.status).toBe(201);
    });

    it('handles POST requests without body', async () => {
      const mockResponse = { success: true };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts/sync', {
        method: 'POST',
      });
      const params = Promise.resolve({ path: ['posts', 'sync'] });

      await POST(request, { params });

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts/sync`,
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it('handles multipart/form-data file uploads', async () => {
      const mockResponse = { id: 1, fileUrl: 'https://cdn.example.com/image.jpg' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 201,
        json: async () => mockResponse,
      });

      // Create a mock file and FormData
      const fileContent = new Uint8Array([0x89, 0x50, 0x4E, 0x47]); // PNG magic bytes
      const file = new File([fileContent], 'test-image.png', { type: 'image/png' });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', 'Test image');

      const request = new NextRequest('http://localhost:3001/api/v1/media/upload', {
        method: 'POST',
        body: formData,
      });
      const params = Promise.resolve({ path: ['v1', 'media', 'upload'] });

      const response = await POST(request, { params });
      const data = await response.json();

      // Verify fetch was called with FormData body (not text)
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/v1/media/upload`,
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        })
      );
      expect(data).toEqual(mockResponse);
      expect(response.status).toBe(201);
    });
  });

  describe('PUT', () => {
    it('proxies PUT requests with body', async () => {
      const mockResponse = { id: 1, title: 'Updated Post' };
      const requestBody = { title: 'Updated Post' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts/1', {
        method: 'PUT',
        body: JSON.stringify(requestBody),
      });
      const params = Promise.resolve({ path: ['posts', '1'] });

      const response = await PUT(request, { params });
      const data = await response.json();

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts/1`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(requestBody),
        })
      );
      expect(data).toEqual(mockResponse);
    });
  });

  describe('PATCH', () => {
    it('proxies PATCH requests with body', async () => {
      const mockResponse = { id: 1, featured: true };
      const requestBody = { featured: true };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts/1', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
      });
      const params = Promise.resolve({ path: ['posts', '1'] });

      const response = await PATCH(request, { params });
      const data = await response.json();

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts/1`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(requestBody),
        })
      );
      expect(data).toEqual(mockResponse);
    });
  });

  describe('DELETE', () => {
    it('proxies DELETE requests', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 204,
      });

      const request = createMockRequest('http://localhost:3001/api/posts/1', {
        method: 'DELETE',
      });
      const params = Promise.resolve({ path: ['posts', '1'] });

      const response = await DELETE(request, { params });

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/api/posts/1`,
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(response.status).toBe(204);
    });

    it('handles 204 no-content responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 204,
      });

      const request = createMockRequest('http://localhost:3001/api/posts/1', {
        method: 'DELETE',
      });
      const params = Promise.resolve({ path: ['posts', '1'] });

      const response = await DELETE(request, { params });

      expect(response.status).toBe(204);
      // Should not have a body
      const text = await response.text();
      expect(text).toBe('');
    });
  });

  describe('Error Handling', () => {
    it('handles fetch errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const request = createMockRequest('http://localhost:3001/api/posts');
      const params = Promise.resolve({ path: ['posts'] });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(502);
      expect(data).toEqual({ error: 'Failed to proxy request to backend' });
      expect(mockConsoleError).toHaveBeenCalledWith(
        '[API Proxy] Error:',
        expect.any(Error)
      );
    });

    it('handles invalid JSON responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const request = createMockRequest('http://localhost:3001/api/posts');
      const params = Promise.resolve({ path: ['posts'] });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toBeNull();
    });

    it('handles backend error responses', async () => {
      const errorResponse = { error: 'Not found' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 404,
        json: async () => errorResponse,
      });

      const request = createMockRequest('http://localhost:3001/api/posts/999');
      const params = Promise.resolve({ path: ['posts', '999'] });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual(errorResponse);
    });
  });

  describe('Logging', () => {
    it('logs proxy requests', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: 'test' }),
      });

      const request = createMockRequest('http://localhost:3001/api/posts');
      const params = Promise.resolve({ path: ['posts'] });

      await GET(request, { params });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[API Proxy] GET')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('/api/posts')
      );
    });
  });
});

