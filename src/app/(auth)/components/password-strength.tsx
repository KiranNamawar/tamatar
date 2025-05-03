import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    ShieldCheck,
    ShieldClose,
    ShieldQuestion,
    ShieldAlert,
    Info,
} from 'lucide-react';

export default function PasswordStrength({ strength }: { strength: number }) {
    const getStrengthText = ((strengthNumber) => {
        switch (strengthNumber) {
            case 1:
                return (
                    <span className="flex items-center space-x-1 text-red-500">
                        <ShieldClose className="h-4 w-4" />
                        <span>Very Weak</span>
                    </span>
                );
            case 2:
                return (
                    <span className="flex items-center space-x-1 text-yellow-500">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Weak</span>
                    </span>
                );
            case 3:
                return (
                    <span className="flex items-center space-x-1 text-blue-500">
                        <ShieldQuestion className="h-4 w-4" />
                        <span>Moderate</span>
                    </span>
                );
            case 4:
                return (
                    <span className="flex items-center space-x-1 text-green-500">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Strong</span>
                    </span>
                );
            case 5:
                return (
                    <span className="flex items-center space-x-1 text-purple-500">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Very Strong</span>
                    </span>
                );
            default:
                return (
                    <span className="flex items-center space-x-1 text-red-500">
                        <ShieldClose className="h-4 w-4" />
                        <span>Very Weak</span>
                    </span>
                );
        }
    })(strength);

    return (
        <span className="flex items-center space-x-2">
            {getStrengthText}
            <Popover>
                <PopoverTrigger>
                    <Info className="h-4 w-4" />
                </PopoverTrigger>
                <PopoverContent>
                    <p className="mb-1 text-sm font-semibold">Password must contains at least: </p>
                    <ul className="list-disc space-y-1 pl-4 text-sm dark:text-gray-300">
                        <li>8 characters</li>
                        <li>one uppercase letter</li>
                        <li>one lowercase letter</li>
                        <li>one number</li>
                        <li>one special character</li>
                    </ul>
                </PopoverContent>
            </Popover>
        </span>
    );
}
