import ResumeEditor from "../../../../../components/dashboard/ResumeEditor";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ResumeEditPage({ params }: Props) {
  const { id } = await params;

  // id is awaited above — pass to client component
  return <ResumeEditor id={id} />;
}
