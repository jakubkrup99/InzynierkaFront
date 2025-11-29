interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mt-6 flex justify-center">
      <label className="block text-sm text-red-600 mb-2">{message}</label>
    </div>
  );
}
