import { SupportHeader, SupportContent, SupportForm } from "./_components";

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <SupportHeader />
      <SupportForm />
      <SupportContent />
    </div>
  );
}
