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
        <div className="flex flex-col gap-2">
            <Label htmlFor={name} className="pl-1 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                {label}
            </Label>
            <ShadcnInput
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all px-4"
            />
            {error[name] && error[name] !== "" && (
                <p className="pl-1 text-red-500 text-xs mt-1">
                    {error[name]}
                </p>
            )}
        </div>
    );
};
