export default function DynamicTable({
    table,
  }: {
    table: any;
  }) {
    const dummyData: any[] = [
      {
        name: "Rahul",
        email: "rahul@gmail.com",
        city: "Mumbai",
        age: 25,
      },
      {
        name: "Priya",
        email: "priya@gmail.com",
        city: "Pune",
        age: 22,
      },
    ];
  
    return (
      <div className="border rounded-lg p-6 bg-white shadow mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {table.label} Table
        </h2>
  
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                {table.fields.map((field: any) => (
                  <th
                    key={field.name}
                    className="border p-3 bg-gray-100 text-left"
                  >
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
  
            <tbody>
              {dummyData.map((row: any, index: number) => (
                <tr key={index}>
                  {table.fields.map((field: any) => (
                    <td
                      key={field.name}
                      className="border p-3"
                    >
                      {row[field.name] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  