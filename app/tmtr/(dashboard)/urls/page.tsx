import TmtrUrlsList from "@/components/tmtr/urls-list";
import { getProfileId } from "@/utils/auth/credentials";
import { getUrlsByProfileId } from "@/utils/tmtr/url";
import Link from "next/link";

export default async function TmtrUrlsPage() {
    // Fetch the profile ID from the session
    const profileId = await getProfileId();
    if (!profileId.ok) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
                <Link href="/login" className="text-blue-400 underline">Please log in to view your URLs.</Link>
            </div>
        );
    }
    // Fetch URLs associated with the profile ID
    const urls = await getUrlsByProfileId(profileId.data);
    if (!urls.ok) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Error fetching URLs</h1>
                <p>{urls.message}</p>
            </div>
        );
    }
    if (urls.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">No URLs found</h1>
                <p>You have not created any URLs yet.</p>
                <Link href="/tmtr/urls/create" className="text-blue-400 m-2 btn-soft btn">Create your first URL</Link>
            </div>
        );
    }
    // Render the URLs list component here
    return (
        <div>
            <TmtrUrlsList urls={urls.data} />
        </div>
    );
}