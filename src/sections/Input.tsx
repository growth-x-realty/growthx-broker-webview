import { Label } from "@/components/ui/label";
import { Input as ShadcnInput } from "@/components/ui/input";

interface InputFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    error?: Record<string, string>;
}

export const InputField = ({
    name,
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    error = {},
}: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={name} className="pl-1 text-gray-800 text-xs font-semibold">
                {label}
            </Label>
            <ShadcnInput
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error[name] && error[name] !== "" && (
                <Label className="pl-1 text-red-800 text-xs">
                    {error[name]}
                </Label>
            )}
        </div>
    );
};
