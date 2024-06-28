


export class createRepairsDto {

    private constructor(
        public readonly userId: number,
        public readonly date: string
    ){}
    static createRepairs(obj: {[key: string]: any }): [string?, createRepairsDto?]{
        const {userId, date} = obj;
        if (!date) return ['el date es necesario', undefined ]
        if (+userId) return ['el Id es necesario', undefined ]
        return [undefined, new createRepairsDto (userId, date)]

            
        
    }
}