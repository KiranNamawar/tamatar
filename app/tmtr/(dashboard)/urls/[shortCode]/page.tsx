import { getUrlByShortCode, getUrlVisits } from '@/utils/tmtr/url';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';

export default async function TmtrShortCodePage({
    params,
}: {
    params: Promise<{ shortCode: string }>;
}) {
    const { shortCode } = await params;

    const url = await getUrlByShortCode(shortCode);
    if (!url.ok) {
        return <div>{url.message}</div>;
    }

    const urlVisits = await getUrlVisits(url.data.id);
    if (!urlVisits.ok) {
        return <div>{urlVisits.message}</div>;
    }

    return (
        <div>
            <h2>Url Visits</h2>
            <div className="flex flex-col gap-4">
                <p>Short Code: {url.data.shortCode} {<Link href={`https://tmtr.xyz/${url.data.shortCode}`}>{<IconExternalLink />}</Link>}</p>
                <p>Original URL: {url.data.originalUrl}</p>
                <p>
                    Created At: {new Date(url.data.createdAt).toLocaleString()}
                </p>
            </div>
            <div className="flex flex-col gap-4">
                {urlVisits.data.map((visit) => (
                    <div
                        key={visit.id}
                        className="flex flex-col gap-2 rounded-2xl border p-4"
                    >
                        <p>{`${visit.browser} ${visit.browserVersion}`}</p>
                        <p>{`${visit.os} ${visit.osVersion}`}</p>
                        <p>
                            Created At:{' '}
                            {new Date(visit.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
                {urlVisits.data.length === 0 && <p>No visits yet.</p>}
            </div>
        </div>
    );
}
