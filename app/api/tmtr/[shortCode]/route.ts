import { createResponse } from "@/utils/response";
import { createUrlVisit, getUrlByShortCode } from "@/utils/tmtr/url";
import { getUserAgent } from "@/utils/uaparser";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }:
    { params: Promise<{ shortCode: string }> }) {

    const userAgent = await getUserAgent(request);
    if (!userAgent.ok) {
        console.error('Failed to parse user agent');
        return createResponse({ error: 'User agent parsing failed' }, 400, 'Bad Request');
    }
    console.log('User-Agent:', userAgent);

    const { shortCode } = await params;
    console.log('Received shortCode:', shortCode);

    const url = await getUrlByShortCode(shortCode);
    if (!url.ok) {
        console.error('Error fetching URL:', url.error);
        return createResponse(url, 404, 'URL not found');
    }
    console.log('Fetched URL:', url.data);

    const urlVisit = await createUrlVisit(url.data.id, userAgent.data);
    if (!urlVisit.ok) {
        console.error('Error creating URL visit:', urlVisit.error);
        return createResponse(urlVisit, 500, 'Internal Server Error');
    }
    console.log('Created URL visit:', urlVisit.data);
    
    redirect(url.data.originalUrl);
}