/**
 * API Route: Analytics Data
 * Provides comprehensive analytics and metrics data
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/analytics-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    const hours = parseInt(searchParams.get('hours') || '24');
    
    switch (type) {
      case 'overview':
        const analytics = analyticsService.getAnalytics();
        return NextResponse.json(analytics);
      
      case 'timeseries':
        const timeSeriesData = analyticsService.getTimeSeriesData(hours);
        return NextResponse.json({ data: timeSeriesData });
      
      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json();
    
    switch (action) {
      case 'track':
        analyticsService.trackCompression(data);
        return NextResponse.json({ success: true });
      
      case 'trackSymbol':
        analyticsService.trackSymbolUsage(data.symbol, data.concept);
        return NextResponse.json({ success: true });
      
      case 'reset':
        analyticsService.reset();
        return NextResponse.json({ success: true, message: 'Analytics data reset' });
      
      case 'generateMock':
        const count = data?.count || 500;
        analyticsService.generateMockData(count);
        return NextResponse.json({ 
          success: true, 
          message: `Generated ${count} mock data points` 
        });
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process analytics action',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
