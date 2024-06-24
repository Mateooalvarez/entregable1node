import { Repairs } from "../../data"


enum RepairsStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class repairsService {

    constructor() {

    }

    async createRepair(repairData: any){
    const repair = new Repairs()


    repair.date = repairData.date;
    repair.status = RepairsStatus.PENDING;
    repair.user_id = repairData.usrrId;

        try {
        return await repair.save()

        } catch (error) {
            console.log(error)
        }
    }
}