export class UpdateRepairDto {
    constructor(
        public readonly status: string
    ) { }

    static update(object: { [key: string]: any }): [string?, UpdateRepairDto?] {
        const { status } = object;

        if (!status) return ["The name is missing, please add it", undefined];
        if (status !== "COMPLETED") return ["The value must be COMPLETED", undefined];

        return [undefined, new UpdateRepairDto(status)]
    }
}

//! deje la clase en la hora 09:26
