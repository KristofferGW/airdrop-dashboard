type BridgeCardProps = {
    from: number | null;
    to: number | null;
    bridges: { name: string; url: string }[];
};

const BridgeCards = ({ from, to, bridges }: BridgeCardProps) => {
    return (
        <div className="mt-6 w-full max-w-2xl flex flex-col gap-4">
            {bridges.map((bridge) => (
                <div
                    key={bridge.name}
                    className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg"
                >
                    <h2 className="text-xl font-semibold mb-2">{bridge.name}</h2>
                    <p className="text-sm mb-2">
                        From <strong>{from}</strong> to <strong>{to}</strong>
                    </p>
                    <a
                        href={bridge.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Go to Bridge
                    </a>
                </div>
            ))}
        </div>
    );
};

export default BridgeCards;