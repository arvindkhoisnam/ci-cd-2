import { client } from "@repo/db/client";
export default async function Home() {
  const user = await client.user.findFirst();
  return (
    <div>
      <h1>NextJS Home Page</h1>
      <p>{user?.username}</p>
      <p>{user?.password}</p>
    </div>
  );
}
