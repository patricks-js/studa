import { getModuleByIdAction } from "@/actions/actions";

type Params = {
  params: Promise<{
    moduleId: string;
  }>;
};

export default async function ModulePage({ params }: Params) {
  const { moduleId } = await params;
  const mod = await getModuleByIdAction(moduleId);

  return (
    <div>
      <h2 className="font-medium text-2xl tracking-tight">{mod.title}</h2>
    </div>
  );
}
