type Params = {
  params: Promise<{
    moduleId: string;
  }>;
};

export default async function ModulePage({ params }: Params) {
  const { moduleId } = await params;

  return (
    <div>
      <h2 className="font-medium text-2xl tracking-tight">Module {moduleId}</h2>
    </div>
  );
}
