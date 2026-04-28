import { config } from "../lib/helpers";
import { componentRegistry } from "../lib/registry";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold mb-10">
        {config.appName}
      </h1>

      {config.ui.map((component, index) => {
        const Component =
          componentRegistry[
            component.type as keyof typeof componentRegistry
          ];

        const table = config.tables.find(
          (t) => t.name === component.table
        );

        if (!Component || !table) {
          return (
            <div
              key={index}
              className="text-red-500"
            >
              Invalid component
            </div>
          );
        }

        return (
          <Component
            key={index}
            table={table}
          />
        );
      })}
    </main>
  );
}
