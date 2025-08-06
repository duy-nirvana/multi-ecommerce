import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div>
          <Button variant="elevated">Hello world</Button>
        </div>
        <div>
          <Input placeholder="I am an input" />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea placeholder="I am a textarea 1" />
        </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
