import { FormEvent } from "react";

export type SegmentProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export type FormSubmit = (
    event: FormEvent<Element>,
    value: HTMLInputElement["value"]
) => void;