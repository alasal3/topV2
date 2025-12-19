import { getBuildings, getBuildingById } from "@/lib/api";

export default async function DebugPage() {
    const allBuildings = await getBuildings();
    const building1 = await getBuildingById("42");

    return (
        <div className="p-10 bg-white text-black font-mono">
            <h1 className="text-2xl font-bold mb-4">Debug Database</h1>

            <div className="mb-8">
                <h2 className="text-xl font-bold">Building ID='1'</h2>
                <pre className="bg-gray-100 p-4 rounded mt-2 border">
                    {JSON.stringify(building1, null, 2)}
                </pre>
            </div>

            <div>
                <h2 className="text-xl font-bold">All Buildings ({allBuildings.length})</h2>
                <pre className="bg-gray-100 p-4 rounded mt-2 border">
                    {JSON.stringify(allBuildings, null, 2)}
                </pre>
            </div>
        </div>
    );
}
