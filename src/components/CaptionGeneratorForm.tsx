import Button from "./Buttons/Button";
import { ImageTitleInput } from "./ImageTitleInput";

interface CaptionGeneratorFormProps {
  title: string;
  onTitleChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function CaptionGeneratorForm({
  title,
  onTitleChange,
  onGenerate,
  isGenerating,
}: CaptionGeneratorFormProps) {
  return (
    <div className="flex items-center flex-col">
      <ImageTitleInput
        value={title}
        onChange={onTitleChange}
        onKeyDown={onGenerate}
      />
      <Button width={92} onClick={onGenerate} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate caption"}
      </Button>
    </div>
  );
}
