import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ name: string }>;
};

// Backward compat: /trips/{id}/{name} → /trips/{name}
export default async function Page({ params }: Props) {
  const { name } = await params;
  redirect(`/trips/${name}`);
}
