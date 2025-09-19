import prisma from "db/client";

export default async function Home() {
  const users = await prisma.user.findMany();

  return <div>{JSON.stringify(users)}</div>;
}

// export const revalidate = 30;
// or
// export const dynamic = "force-dynamic";