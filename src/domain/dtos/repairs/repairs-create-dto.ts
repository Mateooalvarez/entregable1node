
export class CreateRepairsDto {

    private constructor(
        public readonly userId: number,
        public readonly date: string
    ){}
    static createRepairs(obj: {[key: string]: any }): [string?, CreateRepairsDto?]{
        const {userId, date} = obj;
        if (!date) return ['el date es necesario', undefined ]
        if( typeof (userId) !== 'number' ) return ['userId must be a number']
        if (!userId) return ['el Id es necesario', undefined ]
        return [undefined, new CreateRepairsDto (userId, date)]
    }
}