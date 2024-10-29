import { News, Transaction, connectDB } from "@/components/backend/mongodb";
import locations from '../../data/locations.json';

export const revalidate = 10; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'; // Required for revalidation to work properly


export const GET = async () => {
    await connectDB();

    const transactions = await Transaction.countDocuments();
    const news = await News.findOne().sort({ _id: -1 });
    const places = locations.slice(0, Math.floor((transactions / 100) + 1))

    return new Response(JSON.stringify({
        transactions,
        places,
        news,
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};