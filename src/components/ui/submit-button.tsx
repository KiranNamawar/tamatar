import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

function SubmitButton({
    title,
    pending,
    className,
}: {
    title: string;
    pending: boolean;
    className?: string;
}) {
    return (
        <Button disabled={pending} type="submit" className={className}>
            {pending ? <Loader className="animate-spin" /> : title}
        </Button>
    );
}

export { SubmitButton };