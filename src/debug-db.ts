
// Load env vars
// Loaded env vars manually below
// If dotenv is not installed, we might need to manually set process.env or rely on nextjs loading it if we run via next.
// But npx tsx might not load .env.local automatically. 
// Let's hardcode the keys for this specific debug script to be sure, or attempt to load them.
// Safest is to hardcode them here since I know them from the user prompt, to rule out env issues.
// But I should try to use the module first.

process.env.NEXT_PUBLIC_SUPABASE_URL = "https://gkepkqimbktyzfcflrrr.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "sb_publishable_b9tTkeJ2hpN1CkOUrqn3vw_QtFApVmM";

// Imports removed from top


async function main() {
    // Dynamic import to ensure env vars are set first
    const { getEvents } = await import('./lib/api');

    // 1. Fetch Events
    console.log("Fetching events...");
    try {
        const events = await getEvents();
        console.log(`Found ${events.length} events.`);
        if (events.length > 0) {
            console.log("Sample event:", events[0].title);
        }
    } catch (e) {
        console.error("CRITICAL ERROR fetching events:", e);
    }

    console.log("--- DEBUG END ---");
}

main();
