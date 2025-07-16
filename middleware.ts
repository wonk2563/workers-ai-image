// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  // 獲取客戶端的國家代碼
  const country = request.headers.get('cf-ipcountry') || '';
  
  // 檢查是否來自台灣 (TW)
  if (country !== 'TW') {
    // 可以返回 403 禁止訪問
    return new NextResponse(
      JSON.stringify({
        error: 'Access denied',
        message: '此服務僅限台灣地區使用 / This service is only available in Taiwan',
        country: country
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    
    // 或者重定向到封鎖頁面
    // return NextResponse.redirect(new URL('/blocked', request.url))
  }

  // 台灣用戶可以正常訪問
  return NextResponse.next()
}

// 配置 middleware 適用的路徑
export const config = {
  matcher: [
    /*
     * 匹配所有路徑除了:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - blocked (封鎖頁面)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|blocked).*)',
  ],
}