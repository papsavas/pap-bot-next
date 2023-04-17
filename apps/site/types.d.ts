type SegmentProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

type FormSubmit = (
    event: FormEvent<Element>,
    value: HTMLInputElement["value"]
) => void;