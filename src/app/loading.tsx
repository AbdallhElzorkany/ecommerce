import { Spinner } from "@/components/ui/spinner";


export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-65px)]">
            <Spinner className="size-10" />
        </div>
    );
}