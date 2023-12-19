export const metadata = {
  title: "Tejas Calendar App",
  description: "Book your slot.",
};

async function getData() {
  const startTime = "2023-12-19T08:00:00.000Z";
  const endTime = "2023-12-19T12:00:00.000Z";
  const res = await fetch(
    `http://localhost:5001/api/display-events?startTime=${startTime}&endTime=${endTime}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data &&
        data.map((data, key) => (
          <ul key={key}>
            <li>
              {data && data.summary} {key}
            </li>
          </ul>
        ))}
    </main>
  );
}
